const User = require('../models/User');
const Message = require('../models/Message');
const Group = require('../models/Group');
const { socketAuth } = require('../middleware/auth');

// Store online users
const onlineUsers = new Map();

const getOnlineUsers = () => {
  return Array.from(onlineUsers.values()).map(user => ({
    userId: user.userId,
    username: user.username
  }));
};

const initializeSocket = (io) => {
  io.use(socketAuth);

  io.on('connection', async (socket) => {
    console.log(`User ${socket.username} connected`);
    
    // Add user to online users
    onlineUsers.set(socket.userId, {
      socketId: socket.id,
      username: socket.username,
      userId: socket.userId
    });

    // Update user online status in database
    await User.findByIdAndUpdate(socket.userId, { 
      isOnline: true,
      lastSeen: new Date()
    });

    // Broadcast online users list
    const onlineUsersList = getOnlineUsers();
    io.emit('online_users_updated', onlineUsersList);

    // Join user to their personal room
    socket.join(`user_${socket.userId}`);

    // Join user to all their group rooms
    try {
      const userGroups = await Group.find({ members: socket.userId });
      userGroups.forEach(group => {
        socket.join(`group_${group._id}`);
      });
    } catch (error) {
      console.error('Error joining group rooms:', error);
    }

    // Handle direct message
    socket.on('send_direct_message', async (data) => {
      try {
        const { recipientId, content } = data;
        
        const message = new Message({
          sender: socket.userId,
          content,
          chatType: 'direct',
          recipients: [recipientId]
        });

        const savedMessage = await message.save();
        await savedMessage.populate('sender', 'username avatar');

        // Send to recipient if online
        const recipient = onlineUsers.get(recipientId);
        if (recipient) {
          io.to(recipient.socketId).emit('new_message', {
            ...savedMessage.toObject(),
            chatId: socket.userId
          });
        }

        // Send confirmation back to sender
        socket.emit('message_sent', {
          ...savedMessage.toObject(),
          chatId: recipientId
        });

      } catch (error) {
        console.error('Error sending direct message:', error);
        socket.emit('message_error', { error: 'Failed to send message' });
      }
    });

    // Handle group message
    socket.on('send_group_message', async (data) => {
      try {
        const { groupId, content } = data;
        
        // Verify user is member of the group
        const group = await Group.findById(groupId);
        if (!group || !group.members.includes(socket.userId)) {
          socket.emit('message_error', { error: 'Access denied' });
          return;
        }

        const message = new Message({
          sender: socket.userId,
          content,
          chatType: 'group',
          groupId,
          recipients: group.members
        });

        const savedMessage = await message.save();
        await savedMessage.populate('sender', 'username avatar');

        // Send to all group members
        io.to(`group_${groupId}`).emit('new_message', {
          ...savedMessage.toObject(),
          chatId: groupId
        });

      } catch (error) {
        console.error('Error sending group message:', error);
        socket.emit('message_error', { error: 'Failed to send message' });
      }
    });

    // Handle typing indicator
    socket.on('typing_start', (data) => {
      if (data.chatType === 'direct') {
        const recipient = onlineUsers.get(data.recipientId);
        if (recipient) {
          io.to(recipient.socketId).emit('user_typing', {
            userId: socket.userId,
            username: socket.username,
            chatId: socket.userId
          });
        }
      } else if (data.chatType === 'group') {
        socket.to(`group_${data.groupId}`).emit('user_typing', {
          userId: socket.userId,
          username: socket.username,
          chatId: data.groupId
        });
      }
    });

    socket.on('typing_stop', (data) => {
      if (data.chatType === 'direct') {
        const recipient = onlineUsers.get(data.recipientId);
        if (recipient) {
          io.to(recipient.socketId).emit('user_stopped_typing', {
            userId: socket.userId,
            chatId: socket.userId
          });
        }
      } else if (data.chatType === 'group') {
        socket.to(`group_${data.groupId}`).emit('user_stopped_typing', {
          userId: socket.userId,
          chatId: data.groupId
        });
      }
    });

    // Handle disconnect
    socket.on('disconnect', async () => {
      console.log(`User ${socket.username} disconnected`);
      
      // Remove from online users
      onlineUsers.delete(socket.userId);
      
      // Update user offline status in database
      await User.findByIdAndUpdate(socket.userId, { 
        isOnline: false,
        lastSeen: new Date()
      });

      // Broadcast updated online users list
      const onlineUsersList = getOnlineUsers();
      io.emit('online_users_updated', onlineUsersList);
    });
  });
};

module.exports = { initializeSocket, getOnlineUsers };