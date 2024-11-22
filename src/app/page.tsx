"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, ErrorMessage } from "formik";
import { useToast } from "@/hooks/use-toast";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import Image from "next/image";

const LoginByEmail = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("*Invalid email address")
      .required("*Email is required"),
    password: Yup.string()
      .min(6, "*Password must be at least 6 characters")
      .required("*Password is required"),
  });

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://backend-delish-app-production.up.railway.app/api/login-with-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      localStorage.setItem("token", result.access_token);
      toast({
        title: "Log In Sukses!",
        description: `Membawa anda ke profile page...`,
        className: "bg-green-400",
        duration: 1500,
      });

      setTimeout(() => {
        router.push("/profile");
      }, 1000);
    } catch (error) {
      console.error("Login failed!", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="flex flex-col items-center justify-center min-h-screen bg-white p-4"
      style={{ fontFamily: "'Inter', sans-serif" }}
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
        initialValues={{ email: "", password: "", remember: false }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          handleLogin(values.email, values.password);
        }}
      >
        {({ handleChange, handleSubmit, values }) => (
          <Form onSubmit={handleSubmit} className="w-full max-w-xs">
            <div className="mb-4">
              <Label htmlFor="email" className="mb-1">
                Email
              </Label>

              <Input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                className="w-[331px] h-[49px] bg-[#D9D9D9]"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            <div className="relative w-full">
              <Label htmlFor="password" className="mb-1">
                Password
              </Label>

              <Input
                id="password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                className="w-[331px] h-[49px] bg-[#D9D9D9]"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            <div className="flex items-center mb-4 mt-3">
              <Checkbox
                id="remember"
                name="remember"
                onChange={handleChange}
                className="w-[37px] h-[25px] bg-[#D9D9D9]"
              />
              <Label htmlFor="remember" className="ml-2">
                Tetap login
              </Label>
            </div>

            <Button
              type="submit"
              className="w-[331px] h-[49px] bg-[#D9D9D9] text-black hover:bg-gray-500 mb-4 rounded-none"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                  Memproses...
                </span>
              ) : (
                "MASUK"
              )}
            </Button>
          </Form>
        )}
      </Formik>

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
    </section>
  );
};

export default LoginByEmail;
