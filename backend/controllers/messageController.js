const Message = require('../models/Message');
const Chat = require('../models/Chat');

exports.sendMessage = async (req, res) => {
  const { chatId, text } = req.body;
  const message = new Message({
    chatId,
    text,
    sender: req.userId
  });
  await message.save();

  await Chat.findByIdAndUpdate(chatId, { latestMessage: message._id });

  res.json(message);
};

exports.getMessages = async (req, res) => {
  const { chatId } = req.params;
  const messages = await Message.find({ chatId }).populate('sender', 'username');
  res.json(messages);
};