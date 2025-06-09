const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  chatType: { type: String, enum: ['direct', 'group'], required: true },
  recipients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  timestamp: { type: Date, default: Date.now },
  readBy: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    readAt: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model('Message', messageSchema);