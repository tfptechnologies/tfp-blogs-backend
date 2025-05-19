// middlewares/validate.js

module.exports = (schemas) => {
  return (req, res, next) => {
    try {
      const sources = ["body", "query", "params"];
      const errors = [];

      sources.forEach((key) => {
        if (schemas[key]) {
          const { error } = schemas[key].validate(req[key], { abortEarly: false });
          if (error) {
            errors.push(
              ...error.details.map((detail) => ({
                location: key,
                field: detail.path.join("."),
                message: detail.message,
              }))
            );
          }
        }
      });

      if (errors.length > 0) {
        return res.status(400).json({
          status: "error",
          message: "Validation failed",
          errors,
        });
      }

      next();
    } catch (err) {
      console.error("Validation middleware error:", err);
      return res.status(500).json({
        status: "error",
        message: "Internal server error during validation",
      });
    }
  };
};