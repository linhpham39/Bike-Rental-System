const mongoose = require('mongoose');

//coupon is used for Ecopark residents only
const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true
  }
});

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
