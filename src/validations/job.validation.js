const Joi = require('joi')

const createNewJob = {
    body: Joi.object().keys({
        jobTitle: Joi.string().required(),
        jobDescription: Joi.string().required(),
    })
}

module.exports = {
    createNewJob
}