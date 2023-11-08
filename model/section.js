const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
    sectionName: {
        type: String,
        required: true
    },

    sectionDescription: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        require: true
    },
    inMainTask: {
        type: Boolean,
        require: false
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        require: true
    },
}, { timestamps: true })

module.exports = mongoose.model("Section", sectionSchema)