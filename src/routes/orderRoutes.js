const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/orderController');
const auth = require('../middlewares/auth');

// Tất cả order đều yêu cầu auth
router.use(auth);

router.post('/', ctrl.create);
router.get('/', ctrl.list);
router.get('/:id', ctrl.getDetail);
router.get('/:id/confirmation', ctrl.getConfirmation);
router.put('/:id/cancel', ctrl.cancel);

module.exports = router;