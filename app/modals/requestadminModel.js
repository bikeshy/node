const mongoose = require("mongoose")
//schema
var requestadminSchema = mongoose.Schema({

    requesstid: {
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

const Requestadmin = mongoose.model('requestadmin', requestadminSchema);

module.exports = Requestadmin;