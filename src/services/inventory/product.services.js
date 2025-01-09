const { Product } = require("../../models");

// Create a new product
const createProduct = async (productData) => {
    const product = new Product(productData);
    return await product.save();
};

// Get all products
const getAllProducts = async () => {
    return await Product.find();
};

// Get a single product by ID
const getProductById = async (id) => {
    return await Product.findById(id);
};

// Update a product by ID
const updateProduct = async (id, updateData) => {
    return await Product.findByIdAndUpdate(id, updateData, { new: true });
};

// Delete a product by ID 
const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};

module.exports = {
    updateProduct,
    deleteProduct,
    getProductById,
    getAllProducts,
    createProduct
}

