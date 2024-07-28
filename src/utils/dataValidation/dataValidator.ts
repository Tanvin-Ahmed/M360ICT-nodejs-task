import Joi from "joi";

export const authorSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Name cannot be empty",
    "any.required": "Name is required",
  }),
  bio: Joi.string().trim().required().messages({
    "string.empty": "Bio cannot be empty",
    "any.required": "Bio is required",
  }),
  birth_date: Joi.date().required().messages({
    "date.base": "Birth date must be a valid date",
    "any.required": "Birth date is required",
  }),
});
