import Joi from "joi";
import { validateAuthorId } from "./customValidator";

export const authorSchema = Joi.object({
  name: Joi.string().max(255).required().messages({
    "string.base": "Name should be a type of string",
    "string.empty": "Name cannot be empty",
    "string.max": "Name must be less than or equal to 255 characters",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().max(255).required().messages({
    "string.base": "Email should be a type of string",
    "string.email": "Email must be a valid email address",
    "string.empty": "Email cannot be empty",
    "string.max": "Email must be less than or equal to 255 characters",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(8).max(255).required().messages({
    "string.base": "Password should be a type of string",
    "string.empty": "Password cannot be empty",
    "string.min": "Password must be at least 8 characters long",
    "string.max": "Password must be less than or equal to 255 characters",
    "any.required": "Password is required",
  }),
  bio: Joi.string().allow("").optional().messages({
    "string.base": "Bio should be a type of string",
  }),
  birth_date: Joi.date().required().messages({
    "date.base": "Birth date must be a valid date",
    "any.required": "Birth date is required",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().max(255).required().messages({
    "string.base": "Email should be a type of string",
    "string.email": "Email must be a valid email address",
    "string.empty": "Email cannot be empty",
    "string.max": "Email must be less than or equal to 255 characters",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(8).max(255).required().messages({
    "string.base": "Password should be a type of string",
    "string.empty": "Password cannot be empty",
    "string.min": "Password must be at least 8 characters long",
    "string.max": "Password must be less than or equal to 255 characters",
    "any.required": "Password is required",
  }),
});

export const bookSchema = Joi.object({
  title: Joi.string().max(255).required().messages({
    "string.base": "Title should be a type of string",
    "string.empty": "Title cannot be empty",
    "string.max": "Title must be less than or equal to 255 characters",
    "any.required": "Title is required",
  }),
  description: Joi.string().allow("").optional().messages({
    "string.base": "Description should be a type of string",
  }),
  published_date: Joi.date().required().messages({
    "date.base": "Published date must be a valid date",
    "any.required": "Published date is required",
  }),
  author_id: Joi.number()
    .integer()
    .required()
    .external(validateAuthorId)
    .messages({
      "number.base": "Author ID must be a number",
      "number.integer": "Author ID must be an integer",
      "any.required": "Author ID is required",
      "any.invalid": "Author ID does not exist",
    }),
});

export const isNumber = Joi.number().integer().required().messages({
  "number.base": "Must be a number",
  "number.integer": "Must be an integer",
  "any.required": "Value is required",
});

export const isString = Joi.string().allow("").optional().messages({
  "string.base": "Description should be a type of string",
});
