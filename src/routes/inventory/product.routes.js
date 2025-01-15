const express = require("express")
const router = express.Router()
const { ProductController } = require("../../controllers")
const { authMiddleware } = require("../../middleware/Api-auth.middleware")
const upload = require("../../middleware/multer.middleware")

router
    .route("/create_product")
    .post(authMiddleware("inventory"),
        upload.fields([
            { name: "product_image", maxCount: 1 },
            { name: "attachment_file", maxCount: 1 },
        ]),
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