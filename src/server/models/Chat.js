const mongoose = require("mongoose");

var ChatSchema = new mongoose.Schema({
    username: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model("Chat", ChatSchema);
