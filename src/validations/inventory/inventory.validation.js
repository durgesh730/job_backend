const Joi = require('joi')

const createUser = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        // password: Joi.string().required(),
        telephone: Joi.string().optional(),
        name: Joi.string().optional(),
    })
}


module.exports = {
    createUser,
}