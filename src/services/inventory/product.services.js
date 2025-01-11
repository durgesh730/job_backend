const { Product } = require("../../models");

// Create a new product
const createProduct = async (productData) => {
    const product = new Product(productData);
    return await product.save();
};

// Get all products with search and pagination
const getAllProducts = async (query) => {
    const { productName, page = 1, limit = 10 } = query;
    const filter = {};

    if (productName) {
        filter.productName = { $regex: productName, $options: "i" };
    }
    const skip = (page - 1) * limit;

    const products = await Product.find(filter).limit(limit).skip(skip);
    const totalProducts = products.length;

    // Calculate total pages
    const totalPages = Math.ceil(totalProducts / limit);

    return {
        products,
        totalProducts,
        totalPages,
        currentPage: Number(page),
    };
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

