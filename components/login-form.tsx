"use client";
import { cn } from "@/lib/utils";
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
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { loginValue } from "@/app/types/loginType";
import { loginValidation } from "@/app/validation/login.schema";
import { useLogin } from "@/app/services/auth/useAuthService";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { FormInput } from "./ui/FormInput";
import { ROUTES } from "@/app/constant/ROUTES";
export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const { mutate } = useLogin();
  const formik = useFormik<loginValue>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidation,
    validateOnChange: true,
    onSubmit: (values, { resetForm }) => {
      try {
        mutate(values, {
          onSuccess: (data) => {
            const userId = data.id;
            localStorage.setItem("userId", userId.toString());
          },
        });
        toast.success("Login SuccessFully!!");
        router.push("/");

        resetForm();
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <FieldGroup>
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
              </Field>
              <Field>
                <div className="flex items-center">
                </div>
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
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link href={ROUTES.SIGNUP}>Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
