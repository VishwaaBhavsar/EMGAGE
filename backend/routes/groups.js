const express = require('express');
const router = express.Router();
const Group = require('../models/Group');
const { authenticateToken } = require('../middleware/auth');

// Create group
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, description, members } = req.body;
    
    const group = new Group({
      name,
      description,
      members: [...members, req.user.userId], // Include creator in members
      admin: req.user.userId
    });

    await group.save();
    await group.populate('members', 'username avatar');

    res.status(201).json(group);
  } catch (error) {
    console.error('Error creating group:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's groups
router.get('/', authenticateToken, async (req, res) => {
  try {
    const groups = await Group.find({ members: req.user.userId })
      .populate('members', 'username avatar')
      .populate('admin', 'username avatar')
      .sort({ createdAt: -1 });
    
    res.json(groups);
  } catch (error) {
    console.error('Error fetching groups:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;