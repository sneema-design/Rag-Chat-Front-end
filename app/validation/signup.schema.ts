import * as Yup from "yup";

export const signUpValidation = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email().required("email is required"),
  password: Yup.string()
    .min(8, "Password should be at least 8 characters")
    .max(16, "Password can be at most 16 characters")
    .required("Password is required"),
});
