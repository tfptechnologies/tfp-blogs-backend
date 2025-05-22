const Joi = require("joi");

const tagSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters",
    "any.required": "Name is required",
  }),

  slug: Joi.string()
    .pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .required()
    .messages({
      "string.pattern.base": "Slug must be in kebab-case (e.g., web-dev)",
      "any.required": "Slug is required",
      "string.empty": "Slug is required",
    }),

  isActive: Joi.boolean().optional(),
});

module.exports = {
  tagSchema,
};
