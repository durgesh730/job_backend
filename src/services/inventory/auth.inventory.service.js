const jwt = require('jsonwebtoken')
const crypto = require("crypto");
const ErrorResponse = require("../../utils/ErrorResponse");
const { InventoryAuth } = require('../../models');
const { validatePhoneNumber } = require('../../validations/auth.validation');

const JWT_SECRET = process.env.JWT_SECRET

const generateToken = async (user_id) => {
    const user = await InventoryAuth.findOne({ _id: user_id });
    if (!user) throw new ErrorResponse("User not found", 404);

    const date = new Date();
    if (!user.resetToken.token || user.resetToken.expiry <= date) {
        const buffer = crypto.randomBytes(32);
        const token = buffer.toString("hex");
        const date = new Date();
        date.setDate(date.getDate() + 1);
        await InventoryAuth.findOneAndUpdate(
            { _id: user_id },
            {
                resetToken: {
                    token,
                    expiry: date,
                },
            }
        );
        return token;
    }

    return user.resetToken.token;
};

/**
 * Creates a new user account.
 * @param {Object} body - The request body containing user details.
 * @returns {Promise<InventoryAuth>} - The created InventoryAuth user object.
 * @throws {ErrorResponse} - If the email or telephone is already taken.
 */

const createAccount = async (body) => {
    const data = { ...body }

    if (!validatePhoneNumber(data.telephone)) {
        throw new ErrorResponse("Enter Valid Phone Number", 400);
    }
    else if (!data.role) {
        throw new ErrorResponse("Role Required", 400);
    }
    else if (await InventoryAuth.isEmailTaken(data.email)) {
        throw new ErrorResponse("Email Already Taken", 400);
    }
    else if (await InventoryAuth.isTelephoneTaken(data.telephone)) {
        throw new ErrorResponse("Phone Number Already Taken", 400);
    }

    return await InventoryAuth.create(data);
}

/**
 * Creates a new user account.
 * @param {Object} body - The request body containing user details.
 * @returns {Promise<Admin>} - The created Admin user object.
 * @throws {ErrorResponse} - If the email or telephone is already taken.
 */

const newRegister = async (body) => {
    const data = { ...body }

    if (await InventoryAuth.isEmailTaken(data.email)) {
        throw new ErrorResponse("Email Already Taken", 400);
    }

    const user = await InventoryAuth.create({ ...data, active: false });
    return user
}

/**
 * InventoryAuthenticates a user using email and password.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<Object>} - An object containing the InventoryAuthentication status, user data, and JWT token with expiry date.
 * @throws {ErrorResponse} - If JWT_SECRET is not set, the email is not found, or the password is incorrect.
 */

const loginWithEmailAndPass = async (email, password) => {
    if (!JWT_SECRET) throw new ErrorResponse("JWT_SECRET not set", 500);

    const user = await InventoryAuth.findOne({ email })
    if (!user) {
        throw new ErrorResponse("Email not found")
    }

    if (!(await user.isPasswordMatch(password))) {
        throw new ErrorResponse("Password is incorrect", 400)
    }

    const token = jwt.sign({
        name: user.name,
        email: user.email,
        user_id: user._id,
    },
        JWT_SECRET, {
        expiresIn: 60 * 60 * 24 * 7, // in 7 days
    }
    )

    let date = new Date();
    date.setDate(date.getDate() + 6);
    delete user.password;
    return {
        success: true,
        data: user,
        jwt: { token, expiry: date.toISOString() }
    }
}

/**
 * Initiates the password reset process for a user by email.
 * @param {string} email - The email address of the user requesting a password reset.
 * @returns {Promise<string>} - A message indicating that the reset password email has been sent.
 * @throws {ErrorResponse} - If the user with the provided email is not found.
 */
const forgetPassword = async (email) => {
    const user = await InventoryAuth.findOne({ email })
    if (!user) throw new ErrorResponse("User not found", 404);

    // console.log(email, process.env.EMAIL_SENDER)
    const token = await generateToken(user._id)

    let url = `${process.env.ADMIN_URL}/reset-password?token=${token}`
    const mainOptions = {
        from: "durgeshchaudhary020401@gmail.com",
        to: email,
        subject: "Reset Your Password",
        text: url
    }

    await transport.sendMail(mainOptions, function (error, info) {
        if (error) {
            console.log(error)
            throw new ErrorResponse(error, 500)
        } else {
            console.log(info.response)
        }
    })
    return "Reset password email sended successfully"
}

/**
 * Resets the user's password using the provided token and new password.
 * @param {string} token - The password reset token.
 * @param {string} newPassword - The new password to set for the user.
 * @returns {Promise<string>} - A message indicating that the password has been successfully changed.
 * @throws {ErrorResponse} - If the token is invalid, expired, or if the new password matches the old one.
 */

const resetPassword = async (token, newPassword) => {
    const user = await InventoryAuth.findOne({
        "resetToken.token": token,
        "resetToken.expiry": { $gt: new Date() },
    });

    if (!user)
        throw new ErrorResponse("Invalid Token or Token Expired", 400);

    if (await user.isPasswordMatch(newPassword)) {
        throw new ErrorResponse("New Password can't be same as previous password", 400);
    }

    await user.changePassword(newPassword)

    await InventoryAuth.findOneAndUpdate(
        { email: user.email },
        { resetToken: { token: null, expiry: null } }
    )

    return "Password Changed Successfully"
}

/**
 * Updates the profile of a user by their userId.
 * @param {Object} profile - The updated profile data to be set.
 * @param {String} userId - The unique ID of the user whose profile is being updated.
 * @returns {Object} - The updated user profile object.
 * @throws {ErrorResponse} - Throws an error if the user is not found.
 */

const updateProfile = async (profile, userId) => {
    const updatePro = await InventoryAuth.findByIdAndUpdate(
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
    loginWithEmailAndPass,
    forgetPassword,
    resetPassword,
    updateProfile,
    newRegister
}