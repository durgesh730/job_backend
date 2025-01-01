const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const inventoryAuthSchema = new mongoose.Schema({
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
    emailVerified: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: [true, "Please provide Password"],
        trim: true,
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
    resetToken: {
        token: {
            type: String,
            default: null,
        },
        expiry: {
            type: Date,
            default: null,
        },
    },
},
    { timestamps: true }
);

inventoryAuthSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user; // return true if user is not null
};

inventoryAuthSchema.statics.isTelephoneTaken = async function (
    telephone,
    excludeUserId
) {
    const user = await this.findOne({ telephone, _id: { $ne: excludeUserId } });
    return !!user; // return true if user is not null
};

inventoryAuthSchema.statics.getEmails = async function (userIds) {
    const users = await this.find({ _id: { $in: userIds } });
    return users.map((user) => user.email);
};

inventoryAuthSchema.methods.isPasswordMatch = async function (password) {
    return await bcrypt.compare(password, this.password);
};

inventoryAuthSchema.methods.changePassword = async function (password) {
    this.password = password;
    await this.save();
};

inventoryAuthSchema.pre("save", async function (next) {
    if (
        this.isModified("name") &&
        this.profile_image?.includes("ui-avatars.com") || this.profile_image?.includes("ui-avatars.com")
    ) {
        this.profile_image = `https://ui-avatars.com/api/?background=random&size=128&rounded=true&format=png&name=${this.name}`;
    }

    if (!this.isModified("password")) {
        next(); 
    }
    this.password = await bcrypt.hash(this.password, 10);
});

const inventoryModel = mongoose.model("inventoryAuth", inventoryAuthSchema);

module.exports = inventoryModel;