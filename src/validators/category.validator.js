const Joi = require('joi');

const categoryValidation = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-Z0-9\s-]+$/)
    .required()
    .messages({
      'string.base': 'Category name must be a string',
      'string.empty': 'Category name is required',
      'string.min': 'Category name must be at least 2 characters',
      'string.max': 'Category name must be at most 50 characters',
      'string.pattern.base': 'Category name can only contain letters, numbers, spaces and hyphens',
      'any.required': 'Category name is required',
    }),
});

module.exports = {
  categoryValidation,
};
