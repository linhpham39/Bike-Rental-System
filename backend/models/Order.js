const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  bikes: [
    {
      bikeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bike',
        required: true
      },
      rentHour: {
        type: Number,
        required: true
      }
    }
  ],
  coupon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coupon'
  },
  totalPrice: {
    type: Number,
    required: true
  },
  //admin xác nhận đơn hàng
  status: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
