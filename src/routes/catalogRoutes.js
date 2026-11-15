const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/catalogController');

router.get('/categories', ctrl.getCategories);
router.get('/brands', ctrl.getBrands);
router.get('/colors', ctrl.getColors);
router.get('/collections', ctrl.getCollections);
router.get('/sections', ctrl.getSections);

module.exports = router;