// middlewares/validate.js

module.exports = (schemas) => {
  return (req, res, next) => {
    try {
      const sources = ["body", "query", "params"];
      const errors = [];

      sources.forEach((key) => {
        if (schemas[key]) {
          const { error } = schemas[key].validate(req[key], {
            abortEarly: false,
          });

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
          status: "fail",
          code: 400,
          message: "Validation failed",
          errors,
        });
      }

      next(); // Proceed if no validation errors
    } catch (err) {
      console.error(" Validation Middleware Error:", err);

      return res.status(500).json({
        status: "error",
        code: 500,
        message: "Internal server error during validation",
        error: process.env.NODE_ENV === "development" ? err : undefined,
      });
    }
  };
};
