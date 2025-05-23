const Joi = require('joi');

const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            const errors = error.details.map(err => ({
                field: err.path[0],
                message: err.message
            }));
            
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors
            });
        }

        next();
    };
};

module.exports = validate;
