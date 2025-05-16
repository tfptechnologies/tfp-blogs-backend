const Joi = require('joi');

// Configuration for email normalization similar to express-validator's normalizeEmail
const emailOptions = {
  lowercase: true,
  remove_dots: true,
  remove_extension: true
};

// User input validation schema
const userSchema = Joi.object({
  email: Joi.string().email().trim().lowercase(),
  fullName: Joi.string().trim(),
  phone: Joi.string().trim(),
  occupation: Joi.string().trim()
});

// Blog input validation schema
const blogSchema = Joi.object({
  title: Joi.string().trim(),
  content: Joi.string().trim(),
  metaTitle: Joi.string().trim(),
  metaDescription: Joi.string().trim(),
  canonicalUrl: Joi.string().trim().uri(),
  excerpt: Joi.string().trim()
});

// Comment input validation schema
const commentSchema = Joi.object({
  content: Joi.string().trim()
});

// Middleware functions to validate and sanitize inputs
const validateUserInput = (req, res, next) => {
  const { error, value } = userSchema.validate(req.body, { abortEarly: false, stripUnknown: true });
  if (error) {
    return res.status(400).json({ errors: error.details.map(err => err.message) });
  }
  req.body = value;
  next();
};

const validateBlogInput = (req, res, next) => {
  const { error, value } = blogSchema.validate(req.body, { abortEarly: false, stripUnknown: true });
  if (error) {
    return res.status(400).json({ errors: error.details.map(err => err.message) });
  }
  req.body = value;
  next();
};

const validateCommentInput = (req, res, next) => {
  const { error, value } = commentSchema.validate(req.body, { abortEarly: false, stripUnknown: true });
  if (error) {
    return res.status(400).json({ errors: error.details.map(err => err.message) });
  }
  req.body = value;
  next();
};

module.exports = {
  validateUserInput,
  validateBlogInput,
  validateCommentInput,
  // Also export schemas for direct use
  schemas: {
    userSchema,
    blogSchema,
    commentSchema
  }
};