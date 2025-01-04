const { InvoiceService } = require('../../services');
const asyncHandler = require('../middlewares/asyncHandler');

/**
 * Creates a new invoice.
 * @param {Object} req - Express request object containing invoice data in the request body.
 * @param {Object} res - Express response object for sending the response.
 * @returns {Object} - JSON response with the created invoice data.
 */
const createInvoice = asyncHandler(async (req, res) => {
    const invoiceData = req.body;
    const invoice = await InvoiceService.createInvoice(invoiceData);
    res.status(201).json({
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
    const invoices = await InvoiceService.getInvoices();
    res.status(200).json({
        success: true,
        data: invoices,
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
    res.status(200).json({
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
    res.status(200).json({
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
    const deletedInvoice = await InvoiceService.deleteInvoice(id);
    if (!deletedInvoice) {
        return res.status(404).json({
            success: false,
            message: 'Invoice not found',
        });
    }
    res.status(200).json({
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
