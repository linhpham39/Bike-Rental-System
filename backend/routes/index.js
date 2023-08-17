const express = require('express');
const customerRoutes = require('./customer');
const authRoutes = require('./auth');
const bikeRoutes = require('./bike');
const ratingRoutes = require('./rating');
const orderRoutes = require('./order');
const couponRoutes = require('./coupon');

const router = express.Router();

router.get('/status', (req, res) => res.send('Server is up'));

router.use('/auth', authRoutes);
router.use('/customers', customerRoutes);
router.use('/bikes', bikeRoutes);
router.use('/ratings', ratingRoutes);
router.use('/orders', orderRoutes);
router.use('/coupons', couponRoutes);

router.use((req, res) => {
    res.status(404).json({ message: 'Page not found' });
});

module.exports = router;
