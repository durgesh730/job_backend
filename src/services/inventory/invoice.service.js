const asyncHandler = require('../../middleware/asyncHandler');
const { Invoice } = require('../../models');
const ErrorResponse = require('../../utils/ErrorResponse');

/**
 * Retrieves an invoice by its ID from the database.
 * @param {String} id - The ID of the invoice to retrieve.
 * @returns {Object|null} - The invoice object if found, or null if not found.
 * @throws {Error} - Throws an error if retrieving the invoice fails.
 */
const getInvoiceById = asyncHandler(async (id) => {
    return await Invoice.findById(id);
});

/**
 * Updates an invoice by its ID in the database.
 * @param {String} id - The ID of the invoice to update.
 * @param {Object} updateData - The data to update the invoice with.
 * @returns {Object|null} - The updated invoice object if found, or null if not found.
 * @throws {Error} - Throws an error if updating the invoice fails.
 */
const updateInvoice = asyncHandler(async (id, updateData) => {
    return await Invoice.findByIdAndUpdate(id, updateData, { new: true });
})

/**
 * Deletes an invoice by its ID from the database.
 * @param {String} id - The ID of the invoice to delete.
 * @returns {Object|null} - The deleted invoice object if found, or null if not found.
 * @throws {Error} - Throws an error if deleting the invoice fails.
 */
const deleteInvoice = asyncHandler(async (id) => {
    return await Invoice.findByIdAndDelete(id);
});

module.exports = {
    getInvoiceById,
    updateInvoice,
    deleteInvoice,
};
