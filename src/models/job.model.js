const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        trim: true,
        required: [true, "Please provide a Job Title"],
        default: null,
    },
    jobDescription: {
        type: String,
        required: true,
        default: null,
    },
},
    { timestamps: true }
)

const Job = mongoose.model("job", jobSchema)

module.exports = Job