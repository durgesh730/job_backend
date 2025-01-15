const { uploadImage } = require("../../helpers/cloudinaryUploader");
const { Product } = require("../../models");

// Create a new product
const createProduct = async (productData, file, id) => {
    // generate product id 
    const invoiceCount = await Product.countDocuments();
    const generatedProductId = `P-000${invoiceCount + 1}`;

    if (file.product_image) {
        const image = await uploadImage(file.product_image[0].path);
        productData.product_image = {
            public_id: image.public_id,
            asset_id: image.asset_id,
            url: image.secure_url
        }
    }

    if (file.attachment_file) {
        const filer = await uploadImage(file.attachment_file[0].path)
        productData.attachment_file = {
            public_id: filer.public_id,
            asset_id: filer.asset_id,
            url: filer.secure_url
        }
    }

    const product = new Product({
        ...productData,
        productId: generatedProductId,
        createBy: id
    });

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

