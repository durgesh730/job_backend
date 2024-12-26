const ErrorResponse = require("../utils/ErrorResponse");
const Joi = require('joi')

/**
 * This function is used to validate password
 * @param {String} password  password to be validate
 * @returns true if password validate else throws error
 */
const validatePassword = (password) => {
    const requirements = [
        { test: (p) => p.length >= 6, message: "Password must contain at least 6 characters" },
        { test: (p) => /[0-9]/.test(p), message: "Password must contain at least one number" },
        { test: (p) => /[a-z]/.test(p), message: "Password must contain one lower case character" },
        { test: (p) => /[A-Z]/.test(p), message: "Password must contain one upper case character" },
        { test: (p) => /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(p), message: "Password must contain one special character" }
    ];

    for (const { test, message } of requirements) {
        if (!test(password)) {
            throw new ErrorResponse(message, 400);
        }
    }
    return true;
};

/**
 * This function is used to validate email
 * @param {String} emailAddress  email to be validate
 * @returns true if email validate else throws error
 */

const validateEmail = (emailAddress) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(emailAddress);
};

/**
 * This function is used to validate phoneNumber
 * @param {String} phoneNumber  phoneNumber to be validate
 * @returns true if phoneNumber validate else throws error
 */

const validatePhoneNumber = (input_str) => {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(input_str);
};

const createAccount = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        telephone: Joi.string().optional(),
        name: Joi.string().optional(),
    })
}

const login = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required()
    })
}

const newRegister = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
        name: Joi.string().optional(),
    })
}

const forgotPassword = {
    body: Joi.object().keys({
        email: Joi.string().required().email()
    })
}

const resetPassword = {
    body: Joi.object().keys({
        newPassword: Joi.string().required()
    }),
    query: Joi.object().keys({
        token: Joi.string().required()
    })
}

const updateProfile = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        name: Joi.string().optional(),
        telephone: Joi.string().optional(),
        country: Joi.string().optional(),
        address: Joi.string().optional(),
        profile_image: Joi.string().optional(),
    }),
}

module.exports = {
    validatePassword,
    validateEmail,
    validatePhoneNumber,
    createAccount,
    resetPassword,
    forgotPassword,
    updateProfile,
    login,
    newRegister
}