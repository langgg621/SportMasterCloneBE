const express = require('express');
const router = express.Router();

router.use('/users', require('./userRoutes'));
router.use('/products', require('./productRoutes'));
router.use('/orders', require('./orderRoutes'));
router.use('/cart', require('./cartRoutes'));
router.use('/reviews', require('./reviewRoutes'));
router.use('/catalog', require('./catalogRoutes'));
router.use('/banners', require('./bannerRoutes'));
router.use('/pickup-points', require('./pickupPointRoutes'));
router.use('/chat', require('./chatRoutes'));
router.use('/profile', require('./profileRoutes'));
router.use('/system-keys', require('./systemKeyRoutes'));

module.exports = router;