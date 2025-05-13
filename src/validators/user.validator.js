const Joi = require("joi");

exports.userValidator = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  mobile: Joi.string().min(10).max(10),
  altMobile: Joi.string().min(10).max(10),
  age: Joi.number(),
});
