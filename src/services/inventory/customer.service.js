const { Customer } = require("../../models");
const ErrorResponse = require("../../utils/ErrorResponse");

/**
 * Creates a new user account.
 * @param {Object} body - The request body containing user details.
 * @returns {Promise<Customer>} - The created inventoryAuth user object.
 * @throws {ErrorResponse} - If the email or telephone is already taken.
 */

const createAccount = async (body) => {
    const data = { ...body }

    if (await Customer.isEmailTaken(data.email)) {
        throw new ErrorResponse("Email Already Taken", 400);
    }

    if (await Customer.isTelephoneTaken(data.telephone)) {
        throw new ErrorResponse("Phone Number Already Taken", 400);
    }

    const user = await Customer.create(data);
    return user
}

/**
 * Updates the profile of a user by their userId.
 * @param {Object} profile - The updated profile data to be set.
 * @param {String} userId - The unique ID of the user whose profile is being updated.
 * @returns {Object} - The updated user profile object.
 * @throws {ErrorResponse} - Throws an error if the user is not found.
 */

const updateProfile = async (profile, userId) => {
    const updatePro = await Customer.findByIdAndUpdate(
        { _id: userId },              // Match the user by ID
        { $set: { ...profile } },             // Update profile using $set
        { new: true, runValidators: true }
    )

    // Check if the user was found and updated
    if (!updatePro) {
        throw new ErrorResponse("User not found", 404);
    }

    return updatePro;
}

module.exports = {
    createAccount,
    updateProfile
}