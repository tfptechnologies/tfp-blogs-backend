const Joi = require('joi');

const tagValidation = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(30)
    .pattern(/^[a-zA-Z0-9\s-]+$/)
    .required()
    .messages({
      'string.base': 'Tag name must be a string',
      'string.empty': 'Tag name is required',
      'string.min': 'Tag name must be at least 2 characters',
      'string.max': 'Tag name must be at most 30 characters',
      'string.pattern.base': 'Tag name can only contain letters, numbers, spaces and hyphens',
      'any.required': 'Tag name is required',
    }),
});

module.exports = {
  tagValidation,
};
