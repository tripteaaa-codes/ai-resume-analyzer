const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema (
    {
       user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
       },

       originalName: {
        type: String,
        required: true
       },

       fileName: {
        type: String,
        required: true
       },

       filePath: {
        type: String,
        required: true
       },

       fileSize: {
        type: String,
        required: true
       },

       analysis: {
        type: Object
       },
       
       atsScore: {
        type: Number
       }
    },

    {
        timestamps: true
    }
);

module.exports = mongoose.model("Resume", resumeSchema)