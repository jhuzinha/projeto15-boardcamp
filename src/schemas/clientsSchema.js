import joi from 'joi';

const date = Date.now()
const maxDate = new Date(date - (1000 * 60 * 60 * 24 * 365 * 1))
const clientSchema = joi.object({
    name: joi.string().min(1).required(),
    phone: joi.string().min(10).max(11).pattern(/[0-9]/).required(),
    cpf: joi.string().min(11).max(11).pattern(/[0-9]/).required(),
    birthday: joi.date().max(maxDate).required()
});

export default clientSchema;