import joi from 'joi';

const gameSchema = joi.object({
    name: joi.string().min(1).required(),
    pricePerDay: joi.number().integer().min(1).required(),
    stockTotal: joi.number().integer().min(1).required(),
    categoryId: joi.number().required(),
    image: joi.string().required()
});

export default gameSchema;