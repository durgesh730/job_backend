const express = require("express")
const router = express.Router()
const auth = require('./auth.inventory.routes')
const apiAuthMiddleware = require('../../middleware/Api-auth.middleware').auth;

const defaultRoutes = [
    {
        path: "/auth",
        route: auth
    },
]

// const authRoutes = [
//     {
//         path: "/job",
//         route: job
//     },
// ]

// without authentication
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

//Auth route
// router.use(apiAuthMiddleware);

// authRoutes.forEach((route) => {
//     router.use(route.path, route.route)
// })

module.exports = router