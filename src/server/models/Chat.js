const mongoose = require("mongoose");

var ChatSchema = new mongoose.Schema({
    Aduser: {
        type: String,
        default: ''
    },
    AduserId: {
        type: String,
        default: ''
    },
    currentUser: {
        type: String,
        default: ''
    },
    currentUserId: {
        type: String,
        default: ''
    },
    messages: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model("Chat", ChatSchema);
