const mongoose = require("mongoose")
//schema
var orderSchema = mongoose.Schema({

    addressId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },productName: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    gstAmount:{
        type: String,
        required: true
    },
    totalPrice:{
        type: String,
        required: true
    },
    totalQuantity:{
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    update_at: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('order', orderSchema);

module.exports = Order;