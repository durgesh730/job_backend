const { Auth, InventoryAuth } = require("../models");
const ErrorResponse = require("../utils/ErrorResponse");
const jwt = require("jsonwebtoken");

/**
 * Verifies JWT token and adds user info to request object.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @param {Object} Model - Mongoose model to check user existence.
 * @param {Object} err - Error object from JWT verification.
 * @param {Object} response - Decoded JWT payload.
 */
const verifyCallback = async (req, res, next, Model, err, response) => {
    try {
        if (err) {
            throw new ErrorResponse(
                `Token expired or invalid token, please try again with a valid JWT token`,
                403
            );
        }

        req.user = response;
        const user = await Model.findById(req.user.user_id);
        if (!user) {
            throw new ErrorResponse(`User not found`, 400);
        }

        req.user_detail = user;
        next();
    } catch (err) {
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || "Internal server error",
        });
    }
};

/**
 * Middleware to protect routes and verify access for a specific model.
 * @param {String} modelName - The name of the model to use for verification ('auth' or 'inventory').
 * @returns {Function} - Express middleware function.
 */
const authMiddleware = (modelName) => {
    return (req, res, next) => {
        try {
            const authHeader = req.headers["authorization"];
            const token = authHeader && authHeader.split(" ")[1];

            if (!token) {
                throw new ErrorResponse("Unauthorized, please provide a valid JWT token", 401);
            }

            const Model = modelName === "inventory" ? InventoryAuth : Auth;

            jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
                verifyCallback(req, res, next, Model, err, decodedToken);
            });
        } catch (error) {
            res.status(401).json({
                success: false,
                message: "Unauthorized, no token provided",
            });
        }
    };
};

module.exports = { authMiddleware };
