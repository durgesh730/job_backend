const mongoose = require("mongoose");

const userMangementSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: false,
        default: null,
    },
    profile_image: {
        type: String,
        trim: true,
        default: `https://ui-avatars.com/api/?background=random&size=128&rounded=true&format=png&name=${this.name}`,
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
        required: [false, "Please provide telephone Number"],
        trim: true,
        unique: false,
    },
    active: {
        type: Boolean,
        default: true
    },
},
    { timestamps: true }
);

const userMangementModel = mongoose.model("userMangement", userMangementSchema);

module.exports = userMangementModel;