const Joi = require('joi');

exports.tagValidator = Joi.object({
 
    name: Joi.string().min(3).required(),

    slug: Joi.string().required(),
});