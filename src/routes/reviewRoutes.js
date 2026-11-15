const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/reviewController');
const auth = require('../middlewares/auth');

// Public
router.get('/product/:productId', ctrl.list);

// Yêu cầu đăng nhập
router.use(auth);
router.post('/product/:productId', ctrl.upsert);
router.delete('/:id', ctrl.remove);

module.exports = router;