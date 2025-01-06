const express = require("express")
const router = express.Router()
const validate = require("../../middleware/validate")
const { InventoryValidation } = require("../../validations")
const { UserManagementController } = require("../../controllers")
const { authMiddleware } = require("../../middleware/Api-auth.middleware")

router
    .route("/create_user")
    .post(authMiddleware("inventory"),
        validate(InventoryValidation.createAccount),
        UserManagementController.createAccount)

router
    .route("/update_user/:id")
    .put(authMiddleware("inventory"),
        validate(InventoryValidation.createAccount),
        UserManagementController.updateProfile)

router
    .route("/get_all_user")
    .get(authMiddleware("inventory"),
        UserManagementController.getAllUser)

router
    .route("/delete_user/:id")
    .delete(authMiddleware("inventory"),
        UserManagementController.deleteUser)

module.exports = router