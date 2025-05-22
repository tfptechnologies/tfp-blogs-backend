const { categorySchema } = require("../validators/category.validator");

const validateCategory = (req, res, next) => {
  const { error, value } = categorySchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: error.details.map((err) => err.message),
    });
  }

  req.body = value; // Only validated and sanitized data moves forward
  next();
};

module.exports = validateCategory;
