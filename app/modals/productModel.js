const mongoose = require("mongoose")
//schema
var productSchema = mongoose.Schema({

    productName: {
        type: String,
        required: true
    },
    productid:{
        type: String,
        required: true
    },
    catId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    mrp: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
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

const Product = mongoose.model('product', productSchema);

module.exports = Product;