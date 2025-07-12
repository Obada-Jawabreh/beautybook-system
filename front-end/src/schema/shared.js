import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password too short")
    .required("Password is required"),
});

export const RegisterSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  role: yup
    .string()
    .oneOf(["admin", "staff", "user"], "Role is required")
    .required("Role is required"),
  admin_id: yup
    .number()
    .nullable()
    .when("role", {
      is: "staff",
      then: (schema) => schema.required("Company selection is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
});
