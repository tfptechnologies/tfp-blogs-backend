
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


const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const messages = error.details.map((err) => err.message);
    return res.status(400).json({ errors: messages });
  }
  next();
};

module.exports = validate;
