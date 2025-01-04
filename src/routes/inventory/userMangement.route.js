const express = require("express")
const router = express.Router()
const validate = require("../../middleware/validate")
const { InventoryAuthController } = require("../../controllers")
const { AuthValidation } = require("../../validations")
const { auth } = require("../../middleware/Api-auth.middleware")

router
    .route("/create_account")
    .post(auth, validate(AuthValidation.createAccount),
        InventoryAuthController.createAccount)


module.exports = router