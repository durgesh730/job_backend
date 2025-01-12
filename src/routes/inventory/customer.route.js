const express = require("express")
const router = express.Router()
const validate = require("../../middleware/validate")
const { InventoryValidation } = require("../../validations")
const { CustomerController } = require("../../controllers")
const { authMiddleware } = require("../../middleware/Api-auth.middleware")

router
    .route("/create_customer")
    .post(authMiddleware("inventory"),
        validate(InventoryValidation.createAccount),
        CustomerController.createAccount)

router
    .route("/update_customer/:id")
    .put(authMiddleware("inventory"),
        validate(InventoryValidation.createAccount),
        CustomerController.updateProfile)

router
    .route("/get_all_customer")
    .get(authMiddleware("inventory"),
        CustomerController.getAllUser)

router
    .route("/delete_customer/:id")
    .delete(authMiddleware("inventory"),
        CustomerController.deleteUser)

module.exports = router