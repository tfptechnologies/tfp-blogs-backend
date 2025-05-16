// validators/tag.validator.js
const Joi = require("joi");

exports.tagValidator = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.base": "Name must be a string",
    "string.min": "Name must be at least 3 characters long",
  }),

  slug: Joi.string().required().messages({
    "string.base": "Slug must be a string",
  }),

  isActive: Joi.boolean().required().messages({
    "boolean.base": "isActive must be a boolean value (true or false)",
  }),
  
});
