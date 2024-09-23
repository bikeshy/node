const mongoose = require("mongoose")
//schema
var categorySchema = mongoose.Schema({
    categoryid: {
        type: String,
        required: true
    },
    categoryName: {
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

const Category = mongoose.model('category', categorySchema);

module.exports = Category;