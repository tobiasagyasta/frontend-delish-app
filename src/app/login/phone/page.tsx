/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import BottomNav from "@/components/created_components/BottomNav";

const LoginByPhone = () => {
  const router = useRouter();

  const initialValues = {

    phoneNumber: "",

  };

  const loginSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "*Nomor HP harus berupa angka")
      .min(10, "*Nomor HP minimal 10 digit")
      .max(13, "*Nomor HP maksimal 13 digit")
      .required("*Nomor HP wajib diisi"),
  });

  const handleLogin = async (phoneNumber: string) => {

		try {
			
			// Simpan nomor telepon sementara
			localStorage.setItem("phone_number", phoneNumber);
	
			// Arahkan ke halaman verifikasi PIN
			router.push("/login-pin");
		} catch (error) {
			console.error("Error submitting phone number:", error);
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
      <div className="w-full max-w-xs flex flex-col">
        <p className="mt-20 mb-5 font-bold text-xl self-center">
          Selamat Datang di Delish!
        </p>
        <p className="text-sm mb-5 self-start">
          Masukkan nomor HP untuk lanjut
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          handleLogin(values.phoneNumber);
        }}
      >
        {({ values, handleChange }) => (
          <Form className="w-full max-w-xs">
            {/* Phone */}
            <div className="mb-6">
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                placeholder="08xxxxxxxxxx"
                value={values.phoneNumber}
                onChange={handleChange}
                className="w-[331px] h-[49px] bg-[#D9D9D9] text-center"
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            {/* Login */}
            <Button
              type="submit"
              className="w-[331px] h-[49px] bg-[#D9D9D9] text-black text-xl hover:bg-gray-500 mb-4 rounded-none"
            >
              LANJUT
            </Button>
          </Form>
        )}
      </Formik>
      <div className="flex flex-col items-center">
        <Link href="/login/email" className="text-lg text-gray-800 font-semibold">
          Gunakan Email
        </Link>
      </div>

    </section>
  );
};

export default LoginByPhone;
