const mongoose = require("mongoose")
//schema
var cardSchema = mongoose.Schema({

    productId: {
        type: String,
        required: true
    },
    addressId: {
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
    created_at: {
        type: Date,
        default: Date.now
    },
    update_at: {
        type: Date,
        default: Date.now
    }
});

const Card = mongoose.model('card', cardSchema);

module.exports = Card;