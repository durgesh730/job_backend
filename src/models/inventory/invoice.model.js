const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
    billTo: {
        required: false,
        type: {
            billingPersonName: {
                type: String,
                trim: true,
                required: false,
                default: null,
            },
            billingAddress: {
                type: String,
                trim: true,
                required: false,
                default: null,
            },
        },
    },
    shipTo: {
        required: false,
        type: {
            billingPersonName: {
                type: String,
                trim: true,
                required: false,
                default: null,
            },
            billingAddress: {
                type: String,
                trim: true,
                required: false,
                default: null,
            },
        },
    },
    invoiceDate: {
        type: Date,
        trim: true,
        required: false,
        default: null,
    },
    dueDate: {
        type: Date,
        trim: true,
        required: false,
        default: null,
    },
    shipByDate: {
        type: Date,
        trim: true,
        required: false,
        default: null,
    },
    customerOrderNo: {
        type: String,
        trim: true,
        required: false,
        default: null,
    },
    tallyBill: {
        type: String,
        trim: true,
        required: false,
        default: null,
    },
    trackingId: {
        type: String,
        trim: true,
        required: false,
        default: null,
    },
    shippingOrDate: {
        type: String,
        trim: true,
        required: false,
        default: null,
    },
    salesPerson: {
        type: String,
        trim: true,
        required: false,
        default: null,
    },
    source: {
        type: String,
        trim: true,
        required: false,
        default: null,
    },
    product: {
        type: Array,
        trim: true,
        required: true,
    },
    attachedFile: {
        type: String,
        trim: true,
        required: false,
    },
    active: {
        type: Boolean,
        default: true
    },
},
    { timestamps: true }
);

const invoiceModel = mongoose.model("invoice", invoiceSchema);

module.exports = invoiceModel;