const joi = require("joi");

const schema = joi.object({
    email: joi.string().min(6).email().required(),
    password: joi
        .string()
        .regex(/^[a-zA-Z0-9]{6,16}$/)
        .min(6)
        .required()
});

module.exports = schema;
