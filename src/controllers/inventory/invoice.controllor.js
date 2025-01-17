const { uploadImage } = require('../../helpers/cloudinaryUploader');
const asyncHandler = require('../../middleware/asyncHandler');
const { Invoice } = require('../../models');
const invoiceModel = require('../../models/inventory/invoice.model');
const { InvoiceService } = require('../../services');
const { extractNumber } = require('../../utils/utils');

/**
 * Creates a new invoice.
 * @param {Object} req - Express request object containing invoice data in the request body.
 * @param {Object} res - Express response object for sending the response.
 * @returns {Object} - JSON response with the created invoice data.
 */
const createInvoice = asyncHandler(async (req, res) => {
    const invoiceData = req.body
    const userId = req.user_detail?._id

    // address not found
    if (!invoiceData.billTo) {
        return res.status(404).json({ message: "Billing and Shipping Address Required", success: false })
    }
    // invoice not found
    if (!invoiceData.invoiceDate) {
        return res.status(404).json({ message: "Invoice Date Required", success: false })
    }
    // subtotal not found
    if (!invoiceData.subTotal) {
        return res.status(404).json({ message: "Subtotal is Required", success: false })
    }

    // total not found
    if (!invoiceData.total) {
        return res.status(404).json({ message: "Total is Required", success: false })
    }

    // product not found
    if (!invoiceData.product) {
        return res.status(404).json({ message: "Product is Required", success: false })
    }

    // Retrieve the latest invoice
    const latestInvoice = await Invoice.findOne().sort({ createdAt: -1 });

    // Generate a new invoice number
    const lastNumber = latestInvoice ? extractNumber(latestInvoice.invoiceNo) : 0;
    const generatedInvoiceNo = `INV-${String(lastNumber + 1).padStart(3, '0')}`;
    console.log("req ", req.file)

    if (req.file) {
        const image = await uploadImage(req.file.attachedFile.path);
        productData.product_image = {
            public_id: image.public_id,
            asset_id: image.asset_id,
            url: image.secure_url
        }
    }

    // save invoice
    const invoice = new Invoice({
        ...invoiceData,
        createBy: userId,
        invoiceNo: generatedInvoiceNo
    });
    await invoice.save();

    return res.status(201).json({
        success: true,
        message: 'Invoice created successfully',
        data: invoice,
    });
});

/**
 * Retrieves all invoices.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object for sending the response.
 * @returns {Object} - JSON response with an array of all invoices.
 */
const getInvoices = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const query = req.query.query?.trim();

    const skip = (page - 1) * limit;

    const searchCondition = query
        ? {
            $or: [
                { invoiceNo: { $regex: query, $options: "i" } },
                { contact: { $regex: query, $options: "i" } },
                { invoiceDate: { $regex: query, $options: "i" } },
            ],
        }
        : {};

    const invoices = await Invoice.find(searchCondition)
        .populate({
            path: 'createBy',
            select: 'name profile_image email',
        })
        .populate({ path: 'billTo' })
        .populate({ path: 'shipTo' })
        .select("-product")
        .skip(skip)
        .limit(limit);

    const totalItems = await Invoice.countDocuments(searchCondition);

    return res.status(201).json({
        msg: "Fetched successfully",
        success: true,
        data: invoices,
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        totalItems: totalItems,
        limit,
    });
});

/**
 * Retrieves an invoice by its ID.
 * @param {Object} req - Express request object containing the `id` parameter.
 * @param {Object} res - Express response object for sending the response.
 * @returns {Object} - JSON response with the invoice data or an error if not found.
 */
const getInvoiceById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const invoice = await InvoiceService.getInvoiceById(id);
    if (!invoice) {
        return res.status(404).json({
            success: false,
            message: 'Invoice not found',
        });
    }
    return res.status(200).json({
        success: true,
        data: invoice,
    });
});

/**
 * Updates an invoice by its ID.
 * @param {Object} req - Express request object containing the `id` parameter and update data in the body.
 * @param {Object} res - Express response object for sending the response.
 * @returns {Object} - JSON response with the updated invoice data.
 */
const updateInvoice = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    const updatedInvoice = await InvoiceService.updateInvoice(id, updateData);
    if (!updatedInvoice) {
        return res.status(404).json({
            success: false,
            message: 'Invoice not found',
        });
    }
    return res.status(200).json({
        success: true,
        message: 'Invoice updated successfully',
        data: updatedInvoice,
    });
});

/**
 * Deletes an invoice by its ID.
 * @param {Object} req - Express request object containing the `id` parameter.
 * @param {Object} res - Express response object for sending the response.
 * @returns {Object} - JSON response indicating success or failure of the delete operation.
 */
const deleteInvoice = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedInvoice = await invoiceModel.findByIdAndDelete(id);
    if (!deletedInvoice) {
        return res.status(404).json({
            success: false,
            message: 'Invoice not found',
            data: null
        });
    }
    return res.status(200).json({
        success: true,
        message: 'Invoice deleted successfully',
        data: deletedInvoice,
    });
});

module.exports = {
    createInvoice,
    getInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice,
};
