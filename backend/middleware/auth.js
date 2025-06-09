const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const socketAuth = (socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('Authentication error'));
  }

  jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret', (err, decoded) => {
    if (err) {
      return next(new Error('Authentication error'));
    }
    socket.userId = decoded.userId;
    socket.username = decoded.username;
    next();
  });
};

module.exports = { authenticateToken, socketAuth };