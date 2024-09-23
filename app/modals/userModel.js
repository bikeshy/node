const mongoose = require("mongoose")
//schema
var userSchema = mongoose.Schema({

    name: {
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
    created_at: {
        type: Date,
        default: Date.now
    },
    update_at: {
        type: Date,
        default: Date.now
    },
    // role: {
    //     type: String,
    //     enum: ['Admin', 'Student', 'Visitor']
    // }
});

const User = mongoose.model('user', userSchema);

module.exports = User;