
exports.getAllCategoriesValidator = Joi.object({
  isActive: Joi.boolean().optional(),
  search: Joi.string().optional(),
});

exports.createCategoryValidator = Joi.object({
  name: Joi.string().min(3).required(),
  slug: Joi.string().required(),
  isActive: Joi.boolean().optional(),
});

exports.updateCategoryValidator = Joi.object({
  name: Joi.string().min(3).optional(),
  slug: Joi.string().optional(),
  isActive: Joi.boolean().optional(),
});
