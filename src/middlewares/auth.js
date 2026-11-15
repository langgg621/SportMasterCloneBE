const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');

module.exports = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    
    // Yêu cầu format: "Bearer <token>"
    if (!header.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Вы не авторизованы (Отсутствует токен)' });
    }

    const token = header.slice(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded chứa { userId: '...' } do lúc login mình sign như vậy
    if (!decoded.userId) {
      return res.status(401).json({ success: false, message: 'Недействительный токен' });
    }

    // Lấy thông tin user mới nhất từ DB (đảm bảo user chưa bị xóa)
    const user = await userRepository.getById(decoded.userId);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Аккаунт не существует' });
    }

    // Gắn user vào request để các controller phía sau sử dụng
    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Сессия истекла' });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: 'Недействительный токен' });
    }
    // Các lỗi khác (vd: DB sập khi check user) -> chuyển cho errorHandler
    next(err);
  }
};