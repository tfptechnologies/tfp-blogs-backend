import Joi from 'joi';

export const postValidator = Joi.object({
  title: Joi.string().min(5).required(),
  content: Joi.string().min(10).required(),
  image: Joi.string().uri().optional(),
  categoryId: Joi.string().required(),
  tagIds: Joi.array().items(Joi.string()), // array of tag IDs
});
