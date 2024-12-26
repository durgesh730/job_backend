const mongoose = require("mongoose")

const jobApplicantSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Types.ObjectId,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        trim: true,
        required: false,
        default: null,
    },
    email: {
        type: String,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email address",
        ],
        unique: true,
        lowercase: true,
        required: [true, "Please provide a email address"],
    },
    telephone: {
        type: String,
        required: [true, "Please provide telephone Number"],
        trim: true,
        unique: false,
    },
    comment: {
        type: String,
        trim: true,
        required: false,
        default: null,
    },
    attachment: {
        type: String,
        required: true
    }
},
    { timestamps: true }
)


const jobApplicant = mongoose.model("jobApplicants", jobApplicantSchema)

module.exports = jobApplicant