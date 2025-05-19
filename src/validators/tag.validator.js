const Joi = require('joi');

exports.tagValidator = Joi.object({
 
    name: Joi.string().min(3).required(),

    email: Joi.string().email().required(),
 
    password: Joi.string().min(6).required(),
 
    age: Joi.number(),
});