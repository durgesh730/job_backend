const { jobApplicant } = require("../models");
const { ApplicantServices } = require("../services");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/asyncHandler");

/**
 * This function is used to create a new user account.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Returns the created user object.
 */
const saveApplicants = asyncHandler(async (req, res) => {
    const { body, file } = req;

    // Merge file information into body if necessary
    if (file) {
        body.attachment = file;
    }

    const user = await ApplicantServices.saveApplicants(body);
    return res.status(201).json({
        success: true,
        data: user,
        msg: "Application Saved Successfully"
    });
});

/**
 * This function is used to create a new user account.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Returns the created user object.
 */
const deleteApplicants = asyncHandler(async (req, res) => {
    const user = await jobApplicant.findByIdAndDelete(req.params.applicantId);
    return res.status(201).json({
        success: true,
        data: user,
        msg: "Deleted Successfully"
    });
});

/**
 * This function is used to create a new user account.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Returns the created user object.
 */
const getAllApplicants = asyncHandler(async (req, res) => {
    const user = await jobApplicant.find();
    return res.status(201).json({
        success: true,
        data: user,
        msg: "Deleted Successfully"
    });
});


module.exports = {
    deleteApplicants,
    saveApplicants,
    getAllApplicants
}