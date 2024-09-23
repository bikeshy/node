const mongoose = require("mongoose")
//schema
var addressSchema = mongoose.Schema({
    addressId:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    landmark: {
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

const Address = mongoose.model('address', addressSchema);

module.exports = Address;