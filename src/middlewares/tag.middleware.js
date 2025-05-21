module.exports = (schemas) => {
  return (req, res, next) => {
    try {
      const validationSources = ["body", "query", "params"];
      const allErrors = [];

      validationSources.forEach((key) => {
        if (schemas[key]) {
          const { error } = schemas[key].validate(req[key], {
            abortEarly: false,
          });

          if (error) {
            allErrors.push(
              ...error.details.map((err) => ({
                field: err.path.join("."),
                message: err.message,
                location: key,
              }))
            );
          }
        }
      });

      if (allErrors.length > 0) {
        return res.status(400).json({
          status: "fail",
          code: 400,
          message: "Validation failed",
          errors: allErrors,
        });
      }

      next(); // Pass to the next middleware/handler
    } catch (err) {
      console.error(" Validation middleware error:", err);

      return res.status(500).json({
        status: "error",
        code: 500,
        message: "Something went wrong during validation",
        error: process.env.NODE_ENV === "development" ? err.message : undefined,
      });
    }
  };
};
