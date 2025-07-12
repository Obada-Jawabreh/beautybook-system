const Joi = require("joi");
const { validateSchema } = require("./index");

const addServiceSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters",
    "any.required": "Name is required",
  }),
  price: Joi.number().positive().required().messages({
    "number.base": "Price must be a number",
    "number.positive": "Price must be positive",
    "any.required": "Price is required",
  }),
  staff_id: Joi.number().positive().required().messages({
    "number.base": "Provider ID must be a number",
    "number.positive": "Provider ID must be positive",
    "any.required": "Provider ID is required",
  }),
  description: Joi.string().min(5).allow("").optional().messages({
    "string.base": "Description must be a string",
    "string.min": "Description must be at least 5 characters",
  }),
});
const addStaffSchema = Joi.object({
  first_name: Joi.string().min(2).max(50).required().messages({
    "string.base": "First name must be a string",
    "string.empty": "First name is required",
    "string.min": "First name must be at least 2 characters",
    "any.required": "First name is required",
  }),
  last_name: Joi.string().min(2).max(50).required().messages({
    "string.base": "Last name must be a string",
    "string.empty": "Last name is required",
    "string.min": "Last name must be at least 2 characters",
    "any.required": "Last name is required",
  }),

  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email",
    "any.required": "Email is required",
  }),
});
const servicesValidation = {
  addServiceSchema: validateSchema(addServiceSchema),
  addStaffSchema: validateSchema(addStaffSchema),
};

module.exports = servicesValidation;
