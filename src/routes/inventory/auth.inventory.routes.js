const express = require("express")
const router = express.Router()
const validate = require("../../middleware/validate")
const { InventoryAuthController } = require("../../controllers")
const { AuthValidation } = require("../../validations")
const { authMiddleware } = require("../../middleware/Api-auth.middleware")

router
    .route("/register")
    .post(validate(AuthValidation.newRegister),
        InventoryAuthController.newRegister)

router
    .route("/create_account")
    .post(authMiddleware("inventory"), validate(AuthValidation.createAccount),
        InventoryAuthController.createAccount)


router
    .route("/login")
    .post(validate(AuthValidation.login),
        InventoryAuthController.loginWithEmailAndPass)

router
    .route("/forgot_password")
    .post(validate(AuthValidation.forgotPassword),
        InventoryAuthController.forgetPassword)

router
    .route("/reset_password")
    .post(validate(AuthValidation.resetPassword),
        InventoryAuthController.resetPassword)

router
    .route("/valid_user")
    .get(authMiddleware("inventory"), InventoryAuthController.validateAuth)

router
    .route("/update_profile/:id")
    .put(authMiddleware("inventory"), validate(AuthValidation.updateProfile),
        InventoryAuthController.updateProfile)

router
    .route("/get_all_users")
    .get(authMiddleware("inventory"), InventoryAuthController.getAllUsers)


router
    .route("/delete_account/:id")
    .delete(authMiddleware("inventory"), InventoryAuthController.deleteAccount)

module.exports = router