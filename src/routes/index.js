const express = require("express")
const router = express.Router()
const auth = require('./auth.route')
const job = require('./job.route') 
const applicant = require('./jobApplicant.route') 
const apiAuthMiddleware = require('../middleware/Api-auth.middleware').auth;

const defaultRoutes = [
    {
        path: "/auth",
        route: auth
    },
    {
        path: "/job/applicant",
        route: applicant
    },
]

const authRoutes = [
    {
        path: "/job",
        route: job
    },
]

// without authentication
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

//Auth route
router.use(apiAuthMiddleware);

authRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

module.exports = router