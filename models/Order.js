const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: String,
    userId: String,
    phone: String,
    address: String,
    date: String,
    message: String,
    package: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    },
}, { timestamps: true });

const Order = model('Order', orderSchema);
module.exports = Order;