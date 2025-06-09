const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { authenticateToken } = require('../middleware/auth');

// Get chat history
router.get('/:chatId/:chatType', authenticateToken, async (req, res) => {
  try {
    const { chatId, chatType } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    let query = {};
    
    if (chatType === 'direct') {
      query = {
        chatType: 'direct',
        $or: [
          { sender: req.user.userId, recipients: chatId },
          { sender: chatId, recipients: req.user.userId }
        ]
      };
    } else if (chatType === 'group') {
      query = {
        chatType: 'group',
        groupId: chatId,
        recipients: req.user.userId
      };
    }

    const messages = await Message.find(query)
      .populate('sender', 'username avatar')
      .sort({ timestamp: -1 })
      .limit(limit)
      .skip(skip);

    res.json(messages.reverse());
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;