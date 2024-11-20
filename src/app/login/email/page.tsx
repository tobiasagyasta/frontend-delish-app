/* eslint-disable @next/next/no-img-element */
"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import Image from "next/image";
import BottomNav from "@/components/created_components/BottomNav";
import { apiUrl } from "@/lib/env";
import { useRouter } from "next/navigation";

const LoginByEmail = () => {
  const router = useRouter();

  const initialValues = {
    email: "",
    password: "",
    remember: false, // Used for local state only, not sent to the backend
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch(`${apiUrl}/api/login-with-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const result = await response.json();
      localStorage.setItem("token", result.access_token);
      router.push("/reviews");
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <section
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="flex flex-col items-center justify-center min-h-screen bg-white p-4"
    >
      <div>
        <Image
          src="/assets/logo.png"
          alt="logo"
          width={247.29}
          height={65.21}
        />
      </div>
      <p className="mt-20 mb-5 font-bold text-xl">Selamat Datang di Delish!</p>

      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          handleLogin(values.email, values.password);
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className="w-full max-w-xs">
            {/* Email */}
            <div className="mb-4">
              <Label htmlFor="email" className="mb-1">
                Email
              </Label>
              <Field
                as={Input}
                id="email"
                name="email"
                type="email"
                className="w-[331px] h-[49px] bg-[#D9D9D9]"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            {/* Password */}
            <div className="relative w-full">
              <Label htmlFor="password" className="mb-1">
                Password
              </Label>
              <Field
                as={Input}
                id="password"
                name="password"
                type="password"
                className="w-[331px] h-[49px] bg-[#D9D9D9]"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            {/* Remember Me */}
            <div className="flex items-center mb-4 mt-3">
              <Checkbox
                id="remember"
                checked={values.remember}
                onCheckedChange={(checked) =>
                  setFieldValue("remember", checked)
                }
                className="w-[37px] h-[25px] bg-[#D9D9D9]"
              />
              <Label htmlFor="remember" className="ml-2">
                Tetap login
              </Label>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-[331px] h-[49px] bg-[#D9D9D9] text-black hover:bg-gray-500 mb-4 rounded-none"
            >
              {isSubmitting ? "Logging in..." : "MASUK"}
            </Button>
          </Form>
        )}
      </Formik>

      {/* Links */}
      <div className="flex flex-col items-center">
        <a href="#" className="text-sm text-gray-800 mb-2">
          Lupa password?
        </a>
        <Link
          href="/login/phone"
          className="text-lg text-gray-800 font-semibold"
        >
          Gunakan nomor HP
        </Link>
      </div>
      <BottomNav />
    </section>
  );
};

export default LoginByEmail;
