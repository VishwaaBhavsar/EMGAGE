const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');

// Get all users (for chat list)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.userId } })
      .select('username avatar isOnline lastSeen')
      .sort({ username: 1 });
    
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get online users
router.get('/online', authenticateToken, (req, res) => {
  const { getOnlineUsers } = require('../socket/socketHandlers');
  const onlineUsersList = getOnlineUsers();
  res.json(onlineUsersList);
});

module.exports = router;