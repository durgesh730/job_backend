const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        trim: true,
        required: [true, "Please provide a Job Title"],
        default: null,
    },
    // jobLocation: {
    //     type: String,
    //     trim: true,
    //     required: [true, "Please provide a Job Location"],
    //     default: null,
    // },
    // jobType: {
    //     type: String,
    //     trim: true,
    //     required: false,
    //     default: null,
    // },
    // description : {
    //     type: String,
    //     trim: true,
    //     required: false,
    //     default: null,
    // },
    // skill: {
    //     type: String,
    //     trim: true,
    //     required: [true, "Please provide a Job Skill"],
    //     default: null,
    // },
    // education: {
    //     type: String,
    //     trim: true,
    //     required: false,
    //     default: null,
    // },
    // experience: {
    //     type: String,
    //     trim: true,
    //     required: [true, "Please provide a Experience"],
    //     default: null,
    // },
    // responsibilities: {
    //     type: String,
    //     trim: true,
    //     required: false,
    //     default: null,
    // },
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