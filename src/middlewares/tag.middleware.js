module.exports = (schemas) => {
  return (req, res, next) => {
    try {
      const validationSources = ["body", "query", "params"];
      const allErrors = [];
      
      validationSources.forEach((key) => {
        if (schemas[key]) {
          const { error } = schemas[key].validate(req[key], { abortEarly: false });
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
          status: "error",
          message: "Validation failed",
          errors: allErrors,
        });
      }

      next();
    } catch (err) {
      console.error("Validation middleware error:", err);
      return res.status(500).json({
        status: "error",
        message: "Something went wrong during validation",
      });
    }
  };
};
