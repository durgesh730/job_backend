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
    address: {
        contactName: {
            type: String,
            required: false
        },
        addressOne: {
            type: String,
            required: false
        },
        addressTwo: {
            type: String,
            required: false
        },
        city: {
            type: String,
            required: false
        },
        postalCode: {
            type: String,
            required: false
        },
        state: {
            type: String,
            required: false
        },
        country: {
            type: String,
            required: false
        },
        phone: {
            type: String,
            required: [false, "Please provide telephone Number"],
            trim: true,
            unique: false,
        },
        email: {
            type: String,
            match: [
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please provide a valid email address",
            ],
            unique: true,
            lowercase: true,
            required: [false, "Please provide a email address"],
        },
    },
    active: {
        type: Boolean,
        default: true
    },
},
    { timestamps: true }
);

userMangementSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user; // return true if user is not null
};

userMangementSchema.statics.isTelephoneTaken = async function (
    telephone,
    excludeUserId
) {
    const user = await this.findOne({ telephone, _id: { $ne: excludeUserId } });
    return !!user; // return true if user is not null
};

const userMangementModel = mongoose.model("userMangement", userMangementSchema);

module.exports = userMangementModel;