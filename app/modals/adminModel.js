const mongoose = require("mongoose")
//schema
var adminSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status:{
        type:String,
        require:true
    },
    isActive:{
        type:String,
        require:true
    },
    isActivelogin:{
        type:String,
        require:true
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

const Admin = mongoose.model('admin', adminSchema);

module.exports = Admin;