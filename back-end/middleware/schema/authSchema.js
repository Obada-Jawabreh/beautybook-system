const Joi = require("joi");
const { validateSchema } = require("./index");

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please provide a valid email",
    }),

  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});

const registerSchema = Joi.object({
  first_name: Joi.string().required().messages({
    "string.empty": "First name is required",
  }),
  last_name: Joi.string().required().messages({
    "string.empty": "Last name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email is required",
  }),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$"))
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    }),
  confirm_password: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
    "any.required": "Confirm password is required",
  }),
  role: Joi.string().valid("admin", "staff", "user").required().messages({
    "any.only": "Invalid role",
    "string.empty": "Role is required",
  }),
  admin_id: Joi.when("role", {
    is: "staff", 
    then: Joi.number().required().messages({
      "any.required": "Admin ID is required for staff",
    }),
    otherwise: Joi.forbidden(), 
  }),
});


const authValidation = {
  loginSchema: validateSchema(loginSchema),
  registerSchema: validateSchema(registerSchema),
};

module.exports = authValidation;
