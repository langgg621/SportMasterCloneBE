const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/productController');
const auth = require('../middlewares/auth');

router.get('/', ctrl.list);
router.get('/flag/:flag', ctrl.getByFlag);
router.get('/:id', ctrl.getDetail);
router.get('/:id/related', ctrl.getRelated);
router.get('/:id/frequently-bought', ctrl.getFrequentlyBought);
router.get('/:id/sections', ctrl.getSections);
router.get('/:id/specs', ctrl.getSpecs);

// Ghi nhận view cần đăng nhập (hoặc không, tùy bạn)
router.post('/:id/view', auth, ctrl.recordView);

module.exports = router;