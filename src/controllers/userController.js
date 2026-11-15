const userRepository = require('../repositories/userRepository');
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.register = async (req, res, next) => {
  try {
    const errors = User.validateRegister(req.body);
    if (errors.length) {
      return res.status(400).json({ success: false, errors });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    const user = await userRepository.register({
      ...req.body,
      password: hashedPassword,
    });

    const token = signToken(user.id);
    res.status(201).json({ success: true, token, data: user });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const rawUser = await userRepository.findForLogin(email);
    if (!rawUser) {
      return res.status(401).json({ success: false, message: 'Неверный email или пароль' });
    }

    const isMatch = await bcrypt.compare(password, rawUser.Password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Неверный email или пароль' });
    }

    const token = signToken(rawUser.UserID);
    const user = User.fromRow(rawUser);
    res.json({ success: true, token, data: user });
  } catch (err) {
    next(err);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await userRepository.getById(req.user.id);
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const user = await userRepository.updateProfile(req.user.id, req.body);
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'Пароль должен состоять минимум из 6 символов' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userRepository.changePassword(req.user.id, hashedPassword);
    
    res.json({ success: true, message: 'Пароль успешно изменен' });
  } catch (err) {
    next(err);
  }
};