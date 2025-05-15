import Joi from 'joi';

export const registerAuthorValidator = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  bio: Joi.string().optional(),
});

export const loginAuthorValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
