const express = require("express")
const router = express.Router()
const validate = require("../middleware/validate")
const { AuthController } = require("../controllers")
const { AuthValidation } = require("../validations")
const { auth } = require("../middleware/Api-auth.middleware")

router
    .route("/register")
    .post(validate(AuthValidation.newRegister),
        AuthController.newRegister)

router
    .route("/login")
    .post(validate(AuthValidation.login),
        AuthController.loginWithEmailAndPass)

router
    .route("/forgot_password")
    .post(validate(AuthValidation.forgotPassword),
        AuthController.forgetPassword)

router
    .route("/reset_password")
    .post(validate(AuthValidation.resetPassword),
        AuthController.resetPassword)

router
    .route("/valid_user")
    .get(auth, AuthController.validateAuth)

router
    .route("/update_profile")
    .put(auth, validate(AuthValidation.updateProfile),
        AuthController.updateProfile)

router
    .route("/get_all_users")
    .get(auth, AuthController.getAllUsers)

router
    .route("/create_account")
    .post(auth, validate(AuthValidation.createAccount),
        AuthController.createAccount)

router
    .route("/delete_account/:id")
    .delete(auth, AuthController.deleteAccount)

module.exports = router