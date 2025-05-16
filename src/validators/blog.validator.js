const Joi = require('joi');

const createBlogSchema = Joi.object({
    title: Joi.string().required().min(3).max(200),
    content: Joi.string().required().min(10),
    category: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).min(1),
    isPublished: Joi.boolean().default(false)
});

const updateBlogSchema = Joi.object({
    title: Joi.string().min(3).max(200),
    content: Joi.string().min(10),
    category: Joi.string(),
    tags: Joi.array().items(Joi.string()),
    isPublished: Joi.boolean()
});

module.exports = {
    createBlogSchema,
    updateBlogSchema
};
