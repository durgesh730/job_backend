const express = require("express")
const router = express.Router()
const { ProductController } = require("../../controllers")
const { authMiddleware } = require("../../middleware/Api-auth.middleware")

router
    .route("/create_product")
    .post(authMiddleware("inventory"),
        ProductController.createProduct)

router
    .route("/update_product/:id")
    .put(authMiddleware("inventory"),
        ProductController.updateProduct)

router
    .route("/get_all_product")
    .get(authMiddleware("inventory"),
        ProductController.getAllProducts)

router
    .route("/delete_product/:id")
    .delete(authMiddleware("inventory"),
        ProductController.deleteProduct)

module.exports = router