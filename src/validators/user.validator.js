const Joi = require('joi');

const registerValidation = Joi.object({
  fullName: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.empty': 'Full name is required',
      'string.min': 'Full name must be at least 2 characters',
      'string.max': 'Full name must be at most 50 characters',
    }),

  email: Joi.string()
    .trim()
    .email()
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please include a valid email',
    }),

  password: Joi.string()
    .trim()
    .min(6)
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])/)
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters long',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
    }),

  gender: Joi.string()
    .valid('male', 'female', 'other')
    .optional()
    .messages({
      'any.only': 'Gender must be either male, female or other',
    }),

  dob: Joi.date()
    .iso()
    .optional()
    .messages({
      'date.format': 'Date of birth must be a valid date',
    }),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .optional()
    .messages({
      'string.pattern.base': 'Phone number must be 10 digits',
    }),

  occupation: Joi.string()
    .trim()
    .max(100)
    .optional()
    .messages({
      'string.max': 'Occupation must not exceed 100 characters',
    }),
});

const loginValidation = Joi.object({
  email: Joi.string()
    .trim()
    .email()
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please include a valid email',
    }),

  password: Joi.string()
    .trim()
    .required()
    .messages({
      'string.empty': 'Password is required',
    }),
});

const updateProfileValidation = Joi.object({
  fullName: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .optional()
    .messages({
      'string.min': 'Full name must be at least 2 characters',
      'string.max': 'Full name must be at most 50 characters',
    }),

  gender: Joi.string()
    .valid('male', 'female', 'other')
    .optional()
    .messages({
      'any.only': 'Gender must be either male, female or other',
    }),

  dob: Joi.date()
    .iso()
    .optional()
    .messages({
      'date.format': 'Date of birth must be a valid date',
    }),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .optional()
    .messages({
      'string.pattern.base': 'Phone number must be 10 digits',
    }),

  occupation: Joi.string()
    .trim()
    .max(100)
    .optional()
    .messages({
      'string.max': 'Occupation must not exceed 100 characters',
    }),
});

module.exports = {
  registerValidation,
  loginValidation,
  updateProfileValidation,
};
