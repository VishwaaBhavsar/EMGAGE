
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/chatapp';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
});

// MongoDB Schemas
const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastSeen: {
    type: Date,
    default: Date.now
  }
});

const messageSchema = new mongoose.Schema({
  senderId: {
    type: String,
    required: true
  },
  receiverId: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  senderName: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Create indexes for better performance
messageSchema.index({ senderId: 1, receiverId: 1 });
messageSchema.index({ timestamp: 1 });

const User = mongoose.model('User', userSchema);
const Message = mongoose.model('Message', messageSchema);

// Store online users and their socket IDs (in memory)
const onlineUsers = new Map();
const userSockets = new Map();

// Helper functions for database operations
const saveUser = async (userId, username) => {
  try {
    const user = await User.findOneAndUpdate(
      { userId },
      { 
        username, 
        lastSeen: new Date() 
      },
      { 
        upsert: true, 
        new: true 
      }
    );
    return user;
  } catch (error) {
    console.error('Error saving user:', error);
    throw error;
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find({}).sort({ lastSeen: -1 });
    return users;
  } catch (error) {
    console.error('Error getting users:', error);
    throw error;
  }
};

const saveMessage = async (senderId, receiverId, message, senderName, timestamp) => {
  try {
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
      senderName,
      timestamp: timestamp || new Date()
    });
    
    const savedMessage = await newMessage.save();
    
    return {
      id: savedMessage._id,
      senderId: savedMessage.senderId,
      receiverId: savedMessage.receiverId,
      message: savedMessage.message,
      senderName: savedMessage.senderName,
      timestamp: savedMessage.timestamp
    };
  } catch (error) {
    console.error('Error saving message:', error);
    throw error;
  }
};

const getMessages = async (userId1, userId2) => {
  try {
    const messages = await Message.find({
      $or: [
        { senderId: userId1, receiverId: userId2 },
        { senderId: userId2, receiverId: userId1 }
      ]
    }).sort({ timestamp: 1 });
    
    return messages.map(msg => ({
      id: msg._id,
      senderId: msg.senderId,
      receiverId: msg.receiverId,
      message: msg.message,
      senderName: msg.senderName,
      timestamp: msg.timestamp
    }));
  } catch (error) {
    console.error('Error getting messages:', error);
    throw error;
  }
};

const updateUserLastSeen = async (userId) => {
  try {
    await User.updateOne(
      { userId },
      { lastSeen: new Date() }
    );
  } catch (error) {
    console.error('Error updating last seen:', error);
    throw error;
  }
};

const getUserById = async (userId) => {
  try {
    const user = await User.findOne({ userId });
    return user;
  } catch (error) {
    console.error('Error getting user by ID:', error);
    throw error;
  }
};

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle user joining
  socket.on('user_join', async (userData) => {
    try {
      const { userId, username } = userData;
      
      // Save user to database
      await saveUser(userId, username);
      
      // Store user info in online users
      onlineUsers.set(userId, {
        id: userId,
        username: username,
        socketId: socket.id,
        status: 'online'
      });
      
      userSockets.set(socket.id, userId);
      
      console.log(`${username} (${userId}) joined`);
      
      // Get all users from database and create contacts list
      const allUsers = await getAllUsers();
      const contacts = allUsers.map(user => ({
        id: user.userId,
        name: user.username,
        status: onlineUsers.has(user.userId) ? 'online' : 'offline'
      }));
      
      // Broadcast updated user list to all clients
      io.emit('users_update', {
        onlineUsers: Array.from(onlineUsers.values()),
        contacts: contacts
      });
      
    } catch (error) {
      console.error('Error handling user join:', error);
      socket.emit('error', { message: 'Failed to join chat' });
    }
  });

  // Handle sending messages
  socket.on('send_message', async (messageData) => {
    try {
      const { senderId, receiverId, message, senderName, timestamp } = messageData;
      
      // Save message to database
      const savedMessage = await saveMessage(
        senderId, 
        receiverId, 
        message, 
        senderName, 
        timestamp || new Date().toISOString()
      );
      
      console.log(`Message from ${senderName} to ${receiverId}: ${message}`);
      
      // Send to receiver if online
      const receiver = onlineUsers.get(receiverId);
      if (receiver) {
        console.log(`Sending message to ${receiverId} at socket ${receiver.socketId}`);
        io.to(receiver.socketId).emit('receive_message', savedMessage);
      } else {
        console.log(`Receiver ${receiverId} is not online`);
      }
      
      // Send back to sender for confirmation
      socket.emit('message_sent', savedMessage);
      
    } catch (error) {
      console.error('Error handling send message:', error);
      socket.emit('error', { message: 'Failed to send message' });
    }
  });

  // Handle getting messages for a specific chat
  socket.on('get_messages', async ({ userId1, userId2 }) => {
    try {
      const chatMessages = await getMessages(userId1, userId2);
      socket.emit('chat_messages', chatMessages);
    } catch (error) {
      console.error('Error getting messages:', error);
      socket.emit('error', { message: 'Failed to load messages' });
    }
  });

  // Handle disconnect
  socket.on('disconnect', async () => {
    const userId = userSockets.get(socket.id);
    
    if (userId) {
      try {
        const user = onlineUsers.get(userId);
        if (user) {
          console.log(`${user.username} (${userId}) disconnected`);
          
          // Update last seen in database
          await updateUserLastSeen(userId);
        }
        
        // Remove user from online users
        onlineUsers.delete(userId);
        userSockets.delete(socket.id);
        
        // Get all users from database and create contacts list
        const allUsers = await getAllUsers();
        const contacts = allUsers.map(user => ({
          id: user.userId,
          name: user.username,
          status: onlineUsers.has(user.userId) ? 'online' : 'offline'
        }));
        
        // Broadcast updated user list
        io.emit('users_update', {
          onlineUsers: Array.from(onlineUsers.values()),
          contacts: contacts
        });
        
      } catch (error) {
        console.error('Error handling disconnect:', error);
      }
    }
    
    console.log('User disconnected:', socket.id);
  });
});

const authRoutes = require('./routes/auth'); // Adjust path if needed
app.use('/api/auth', authRoutes);
// API Routes
app.get('/api/contacts', async (req, res) => {
  try {
    const allUsers = await getAllUsers();
    const contacts = allUsers.map(user => ({
      id: user.userId,
      name: user.username,
      status: onlineUsers.has(user.userId) ? 'online' : 'offline'
    }));
    res.json(contacts);
  } catch (error) {
    console.error('Error getting contacts:', error);
    res.status(500).json({ error: 'Failed to get contacts' });
  }
});

app.get('/api/messages/:userId1/:userId2', async (req, res) => {
  try {
    const { userId1, userId2 } = req.params;
    const chatMessages = await getMessages(userId1, userId2);
    res.json(chatMessages);
  } catch (error) {
    console.error('Error getting messages:', error);
    res.status(500).json({ error: 'Failed to get messages' });
  }
});

// Check if user exists
app.get('/api/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await getUserById(userId);
    res.json({ 
      exists: !!user, 
      user: user ? {
        id: user.userId,
        username: user.username,
        lastSeen: user.lastSeen
      } : null 
    });
  } catch (error) {
    console.error('Error checking user:', error);
    res.status(500).json({ error: 'Failed to check user' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...');
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
  process.exit(0);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Socket.io server ready for connections`);
  console.log(`MongoDB URI: ${MONGODB_URI}`);
});


















