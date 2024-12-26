const { Auth } = require("../models");
const ErrorResponse = require("../utils/ErrorResponse");
const jwt = require("jsonwebtoken");

/**
 * Verifies JWT token and adds user info to request object.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const verifyCallback = async (req, res, next, err, response) => {
    try {
        if (err) {
            throw new ErrorResponse(
                `Token expired or invalid token, please try again with a valid JWT token`,
                403 // Ensure status code is set here
            );
        }

        req.user = response;
        const user = await Auth.findById(req.user.user_id);
        if (!user) {
            throw new ErrorResponse(
                `User not found`,
                400 // Set proper status code for user not found
            );
        }
        req.user_detail = user;
        next();
    } catch (err) {
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || 'Internal server error',
        });
    }
};

/**
 * Middleware to protect routes and verify access.
 * @param {String} permission - Permission required to access the route (optional).
 * @returns {Function} - Express middleware function.
 */
const auth = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            throw new ErrorResponse("Unauthorized, please provide a valid JWT token", 401);
        }

         jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            verifyCallback(req, res, next, err, decodedToken); // Pass err and response to verifyCallback
        });
    } catch (error) {
        res.status(401).json({ success: false, message: "Unauthorized, no token provided" });
    }
};

module.exports = { auth };
