const Joi = require('joi')

const createNewJob = {
    body: Joi.object().keys({
        jobTitle: Joi.string().required(),
        jobDescription: Joi.string().required()
    })
}
const createApplicant = {
    body: Joi.object().keys({
        jobId: Joi.string()
            .required()
            .messages({
                "any.required": "Job ID is required",
            }),
        name: Joi.string()
            .trim()
            .allow(null, "")
            .messages({
                "string.base": "Name must be a string",
            }),
        email: Joi.string()
            .email()
            .lowercase()
            .required()
            .messages({
                "string.email": "Please provide a valid email address",
                "any.required": "Email address is required",
            }),
        telephone: Joi.string()
            .trim()
            .required()
            .messages({
                "any.required": "Telephone number is required",
            }),
        comment: Joi.string()
            .trim()
            .allow(null, "")
            .messages({
                "string.base": "Comment must be a string",
            }),
        attachment: Joi.string()
            .required()
            .messages({
                "any.required": "Attachment is required",
            }),
    })
}

module.exports = {
    createNewJob,
    createApplicant
}