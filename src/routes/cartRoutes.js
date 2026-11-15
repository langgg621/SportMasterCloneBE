const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/cartController');
const auth = require('../middlewares/auth');

router.use(auth); // Tất cả yêu cầu đăng nhập

router.get('/', ctrl.getCart);
router.get('/count', ctrl.getCount);
router.post('/', ctrl.add);
router.put('/:id', ctrl.updateQuantity);
router.delete('/:id', ctrl.remove);
router.delete('/', ctrl.clear);

module.exports = router;