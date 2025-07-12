import * as yup from "yup";

export const ServiceSchema = yup.object().shape({
  name: yup.string().required("Service name is required"),
  staff_id: yup.number().required("Please select a staff member"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required"),
});
export const StaffSchema = yup.object().shape({
  first_name: yup
    .string()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  last_name: yup
    .string()
    .min(2, "Last name must be at least 2 characters")
    .required("Last name is required"),

  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
});
