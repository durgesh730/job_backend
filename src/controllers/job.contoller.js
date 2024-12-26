const { Job } = require("../models");
const { JobServices } = require("../services");
const asyncHandler = require("../middleware/asyncHandler");

/**
 * This function is used to create a new user account.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Returns the created user object.
 */
const createJob = asyncHandler(async (req, res) => {
    const user = await JobServices.createJob(req.body);
    return res.status(201).json({
        success: true,
        data: user,
        msg: "Job created successfully"
    });
});

/**
 * This function is used to create a new user account.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Returns the created user object.
 */
const deleteJob = asyncHandler(async (req, res) => {
    const user = await Job.findByIdAndDelete(req.params.jobId);
    return res.status(201).json({
        success: true,
        data: user,
        msg: "Job deleted successfully"
    });
});

/**
 * This function is used to create a new user account.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Returns the created user object.
 */
const getAllJob = asyncHandler(async (req, res) => {
    const user = await Job.find();
    return res.status(201).json({
        success: true,
        data: user,
        msg: "Job Fetched successfully"
    });
});

module.exports = {
    createJob,
    deleteJob,
    getAllJob
}