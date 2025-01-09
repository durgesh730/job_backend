const express = require("express")
const router = express.Router()
const auth = require('./auth.inventory.routes')
const product = require('./product.routes')
const user = require('./userMangement.route')
const invoice = require('./invoice.routes')
const { authMiddleware } = require("../../middleware/Api-auth.middleware")

const defaultRoutes = [
    {
        path: "/auth",
        route: auth
    },
]

const authRoutes = [
    {
        path: "/invoice",
        route: invoice
    },
    {
        path: "/user",
        route: user
    },
    {
        path: "/product",
        route: product
    },
]

// without authentication
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

// // Auth route
router.use(authMiddleware("inventory"));

authRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

module.exports = router