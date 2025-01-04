const ErrorResponse = require("../../utils/ErrorResponse");
const asyncHandler = require("../../middleware/asyncHandler");
const { UserManagementServices } = require("../../services");
const { UserMangement } = require("../../models");

/**
 * This function is used to create a new user account.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Returns the created user object.
 */
const createAccount = asyncHandler(async (req, res) => {
    const user = await UserManagementServices.createAccount(req.body);
    return res.status(201).json({
        success: true,
        data: user,
        mgs: "Account created successfully"
    });
});

/**
 * Updates the profile of the authenticated user.
 * @param {Object} req - Express request object containing the updated profile in the body and user details in `req.user_detail`.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response indicating success and the updated profile data.
 */

const updateProfile = asyncHandler(async (req, res) => {
    const userId = req.user_detail._id;
    const data = await UserManagementServices.updateProfile(req.body, userId)
    return res.status(200).json({
        success: true,
        data,
        message: "Profile Updated Successfully"
    });
})

/**
 * This function is used to  get all users.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Returns the created user object.
 */
const getAllUser = asyncHandler(async (req, res) => {
    const user = await UserMangement.find();
    return res.status(201).json({
        success: true,
        data: user,
        msg: "Job Fetched successfully"
    });
});

/**
 * Deletes a user account by its ID.
 * @param {Object} req - Express request object containing the `id` parameter in the URL.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response indicating success or failure of the delete operation.
 */

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!id) {
        throw new ErrorResponse("Account Id Required", 400)
    }
    const data = await UserMangement.findByIdAndDelete(id)
    return res.status(200).json({
        success: true,
        data,
        message: "Deleted Successfully"
    });
})


module.exports = {
    createAccount,
    updateProfile,
    getAllUser,
    deleteUser
};
