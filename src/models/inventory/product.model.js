const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    createBy: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Login User Id is required"],
    },
    productId: {
        type: String,
        trim: true,
        required: [true, "Product Id is required"],
        default: null,
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
        required: [true, "Product Name is required"],
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
        type: String,
        trim: true,
        required: false,
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
    product_image: {
        type: Object,
        required: false,
        default: null
    },
    attachment_file: {
        type: Object,
        required: false,
        default: null
    }
},
    { timestamps: true }
);

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;

