const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    createBy: {
        required: false,
        type: mongoose.Schema.ObjectId
    },
    number: {
        type: String,
        trim: true,
        required: false,
        default: null,
    },
    productName: {
        type: String,
        trim: true,
        required: false,
        default: null,
    },
    category: {
        type: String,
        trim: true,
        required: false,
        default: null,
    },
    availableStock: {
        type: String,
        trim: true,
        required: false,
        default: null,
    },
    status: {
        type: String,
        trim: true,
        required: false,
        default: null,
    },
    reorderLevel: {
        type: String,
        trim: true,
        required: false,
        default: null,
    },
    reorderQty: {
        type: String,
        trim: true,
        required: false,
        default: null,
    },
    incommingOutgoing: {
        type: String,
        trim: true,
        required: false,
        default: null,
    },
    description: {
        type: Array,
        trim: true,
        required: true,
    },
    UOM: {
        type: String,
        trim: true,
        required: false,
    },
    transactionType: {
        type: String,
        required: false,
    },
    barcode: {
        type: String,
        required: false,
    },
    restockLevel: {
        type: String,
        required: false,
    },
    restockBuildQuantity: {
        type: String,
        required: false,
    },
},
    { timestamps: true }
);

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;

