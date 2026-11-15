const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/bannerController');

router.get('/', ctrl.getByType);
router.get('/single', ctrl.getSingle);
router.get('/daily-deals', ctrl.getDailyDeals);

module.exports = router;