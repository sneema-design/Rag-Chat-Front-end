"use client";
import { useSignup } from "@/app/services/auth/useAuthService";
import type { signUpValues } from "@/app/types/signUpType";
import { signUpValidation } from "@/app/validation/signup.schema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormInput } from "./ui/FormInput";
import { ROUTES } from "@/app/constant/ROUTES";
export default function SignupForm({
  ...props
}: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const { mutate } = useSignup();
  const formik = useFormik<signUpValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: signUpValidation,
    validateOnChange: true,
    onSubmit: (values, { resetForm }) => {
      try {
        console.log("signupform:", values);
        mutate(values, {
          onSuccess: (data) => {
            const userId = data.id;
            if (userId) {
              localStorage.setItem("userId", userId.toString());
            }
          },
        });
        router.push("/");
        resetForm();
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
          <FieldGroup>
            <Field>
              <FormInput
                id="name"
                label="Full Name"
                type="text"
                placeholder="John Doe"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.name}
                error={formik.errors.name}
              />
            </Field>
            <Field>
              <FormInput
                id="email"
                label="Email"
                type="email"
                placeholder="m@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.email}
                error={formik.errors.email}
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FormInput
                id="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.password}
                error={formik.errors.password}
              />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>

            <FieldGroup>
              <Field>
                <Button type="submit">Create Account</Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <Link href={ROUTES.LOGIN}>Login</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
