const chatRepository = require('../repositories/chatRepository');

exports.getUnreadCount = async (req, res, next) => {
  try {
    const count = await chatRepository.getUnreadCount(req.user.id);
    res.json({ success: true, data: count });
  } catch (err) { next(err); }
};

exports.getMessages = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 50;
    const messages = await chatRepository.getMessages(req.user.id, { limit });
    res.json({ success: true, data: messages });
  } catch (err) { next(err); }
};

exports.sendMessage = async (req, res, next) => {
  try {
    const { body } = req.body;
    if (!body || !body.trim()) {
      return res.status(400).json({ success: false, message: 'Сообщение не может быть пустым' });
    }

    const msg = await chatRepository.sendMessage(req.user.id, { sender: 'user', body });
    res.json({ success: true, data: msg });
  } catch (err) { next(err); }
};