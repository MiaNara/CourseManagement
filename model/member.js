const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: false
    },
}, { timestamps: true })

module.exports = mongoose.model("Member", memberSchema)