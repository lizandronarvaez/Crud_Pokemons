import * as Joi from 'joi';

const JoiValidationSchema = Joi.object({
  MONGODB: Joi.required(),
  PORT: Joi.number().default(3001),
});

export default JoiValidationSchema;
