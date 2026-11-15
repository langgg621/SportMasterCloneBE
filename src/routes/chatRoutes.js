const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/chatController');
const auth = require('../middlewares/auth');

router.use(auth);

router.get('/unread-count', ctrl.getUnreadCount);
router.get('/', ctrl.getMessages);
router.post('/', ctrl.sendMessage);

module.exports = router;