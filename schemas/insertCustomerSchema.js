import joi from 'joi';

const insertCustomerSchema = joi.object({
    name: joi.string().trim().required(),
    phone: joi.string().regex(/[0-9]{10,11}/).required(),
    cpf: joi.string().regex(/[0-9]{11}/).required(),
    birthday: joi.date().max('now').required()
});

export default insertCustomerSchema;