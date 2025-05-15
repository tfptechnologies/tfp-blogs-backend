
const {userValidator} = require ("../validators/user.validator");
exports.userValidatorMiddleWare = (req,res,next)=>{

     const { error } = userValidator.validate(req.body, { abortEarly: false });

    if (error) {
      const errorDetails = error.details.map((err) => ({
        field: err.context.key,
        message: err.message,
      }));

      return res.status(400).json({
        status: "user validation fail",
        errors: errorDetails,
      });
    }

    next();


}
