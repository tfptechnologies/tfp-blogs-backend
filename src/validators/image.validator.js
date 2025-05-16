const Joi = require('joi');

const imageValidation = Joi.object({
  type: Joi.string()
    .valid('profile', 'blog')
    .required()
    .messages({
      'any.required': 'Image type is required',
      'any.only': 'Image type must be either profile or blog',
    }),

  blogId: Joi.string()
    .uuid()
    .when('type', {
      is: 'blog',
      then: Joi.required().messages({ 'any.required': 'Blog ID is required for blog images' }),
      otherwise: Joi.optional(),
    })
    .messages({
      'string.guid': 'Invalid blog ID',
    }),
});

module.exports = {
  imageValidation,
};
