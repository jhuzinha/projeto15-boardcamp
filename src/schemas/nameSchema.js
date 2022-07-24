import joi from 'joi';

const nameSchema = joi.object({
    name: joi.string().min(1).required()
});
  
export default nameSchema;