import joi from 'joi';

const categoriesSchema = joi.object({
    name: joi.string().min(1).required()
});
  
export default categoriesSchema;