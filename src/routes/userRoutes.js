const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/userController');
const auth = require('../middlewares/auth');

router.post('/register', ctrl.register);
router.post('/login', ctrl.login);

// Các route bên dưới bắt buộc đăng nhập
router.use(auth);
router.get('/me', ctrl.getMe);
router.put('/me', ctrl.updateProfile);
router.put('/change-password', ctrl.changePassword);

module.exports = router;