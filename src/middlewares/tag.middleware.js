const { tagSchema } = require("../validators/tag.validator");

const validateTag = (req, res, next) => {
  const { error, value } = tagSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: error.details.map((err) => err.message),
    });
  }

  req.body = value;
  next();
};

module.exports = validateTag;
