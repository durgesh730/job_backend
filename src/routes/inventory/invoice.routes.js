const express = require("express")
const router = express.Router()
const { InvoiceController } = require("../../controllers")
const { authMiddleware } = require("../../middleware/Api-auth.middleware")
const upload = require("../../middleware/multer.middleware")

router
    .route("/create_invoice")
    .post(authMiddleware("inventory"), InvoiceController.createInvoice)

router
    .route("/get_invoice_by_id/:id")
    .get(authMiddleware("inventory"), InvoiceController.getInvoiceById)

router
    .route("/update_invoice_by_id/:id")
    .post(authMiddleware("inventory"), InvoiceController.getInvoiceById)

router
    .route("/get_all_invoice")
    .get(authMiddleware("inventory"), InvoiceController.getInvoices)

router
    .route("/delete_invoice/:id")
    .delete(authMiddleware("inventory"), InvoiceController.deleteInvoice)

module.exports = router