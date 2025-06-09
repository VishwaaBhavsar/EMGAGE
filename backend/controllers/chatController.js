const Chat = require('../models/Chat');

exports.createChat = async (req, res) => {
  const { name, members, isGroup } = req.body;
  const chat = new Chat({ name, members, isGroup });
  await chat.save();
  res.json(chat);
};

exports.getUserChats = async (req, res) => {
  const chats = await Chat.find({ members: req.userId })
    .populate('members', 'username')
    .populate('latestMessage')
    .exec();
  res.json(chats);
};