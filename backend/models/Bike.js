const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    dock: {
        type: String,
        required: true
    },
    imageUrls: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        value: {
            type: Number,
            default: 0
        },
        unit: {
            type: String,
            default: ''
        }
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    ratings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rating'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Bike = mongoose.model('Bike', bikeSchema);

module.exports = Bike;
