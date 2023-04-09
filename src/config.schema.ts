import * as Joi from 'joi';

export const validationConfigSchema = Joi.object({
  NODE_ENV: Joi.string().required(),
  DAYVE_PORT: Joi.number().required(),
  PORT: Joi.number().default(3000)
})