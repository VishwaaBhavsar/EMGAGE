let io;

function initSocket(server) {
  io = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinChat', (chatId) => {
      socket.join(chatId);
    });

    socket.on('sendMessage', ({ chatId, message }) => {
      socket.to(chatId).emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
}

module.exports = { initSocket };