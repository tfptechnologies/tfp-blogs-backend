// middlewares/validate.js
module.exports = (schema) => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req.body, { abortEarly: false });

      if (error) {
        return res.status(400).json({
          status: "error",
          message: "Validation failed",
          errors: error.details.map((err) => err.message),
        });
      }

      next(); // Proceed to the next middleware or controller
    } catch (err) {
      console.error("Validation middleware error:", err);

      return res.status(500).json({
        status: "error",
        message: "Something went wrong during validation",
      });
    }
  };
};
