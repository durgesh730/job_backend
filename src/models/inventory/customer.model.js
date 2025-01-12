const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    customerName: {
        type: String,
        trim: true,
        required: [true, "Customer name is required"],
    },
    email: {
        type: String,
        trim: true,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email address",
        ],
        lowercase: true,
        default: "",
    },
    telephone: {
        type: String,
        trim: true,
        required: [true, "Telephone number is required"],
    },
    receivableAccount: {
        type: String,
        trim: true,
        required: [false, "Receivable account is required"],
    },
    payableAccount: {
        type: String,
        trim: true,
        required: [false, "Payable account is required"],
    },
    paymentTerm: {
        type: String,
        trim: true,
        required: [false, "Payment term is required"],
    },
    status: {
        type: String,
        enum: ["active", "inActive"],
        default: "active",
    },
    billingAddressOne: {
        type: String,
        trim: true,
        required: [true, "Billing address line 1 is required"],
    },
    billingAddressSec: {
        type: String,
        trim: true,
        default: null,
    },
    billingState: {
        type: String,
        trim: true,
        required: [true, "Billing state is required"],
    },
    billingStateCode: {
        type: String,
        trim: true,
        required: [false, "Billing state code is required"],
    },
    billingCity: {
        type: String,
        trim: true,
        required: [false, "Billing city is required"],
    },
    billingPostalCode: {
        type: String,
        trim: true,
        required: [true, "Billing postal code is required"],
    },
    shippingAddressOne: {
        type: String,
        trim: true,
        required: [true, "Shipping address line 1 is required"],
    },
    shippingAddressSec: {
        type: String,
        trim: true,
        default: null,
    },
    shippingState: {
        type: String,
        trim: true,
        required: [true, "Shipping state is required"],
    },
    shippingStateCode: {
        type: String,
        trim: true,
        required: [false, "Shipping state code is required"],
    },
    shippingCity: {
        type: String,
        trim: true,
        required: [true, "Shipping city is required"],
    },
    shippingPostalCode: {
        type: String,
        trim: true,
        required: [true, "Shipping postal code is required"],
    },
    gstTreatmentType: {
        type: String,
        trim: true,
        default: "Unregistered Business",
    },
    gstIn: {
        type: String,
        trim: true,
        default: "",
    },
},
    { timestamps: true }
);

customerSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const customer = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!customer;
};

customerSchema.statics.isTelephoneTaken = async function (telephone, excludeUserId) {
    const customer = await this.findOne({ telephone, _id: { $ne: excludeUserId } });
    return !!customer;
};

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
