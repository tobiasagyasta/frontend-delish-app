/* eslint-disable @next/next/no-img-element */
"use client"
import { useState } from 'react';
// import { useRouter } from 'next/navigation';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import  Image  from 'next/image';
// import BottomNav from '@/components/BottomNav';


const LoginByPhone = () => {
  const [number, setNumber] = useState<number | string>('');

  // const router = useRouter();

  const initialValues = {
    number: number,
   
  }

  const loginSchema = Yup.object().shape({
    phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Nomor HP harus berupa angka")
    .min(10, "Nomor HP minimal 10 digit")
    .max(13, "Nomor HP maksimal 13 digit")
    .required("Nomor HP wajib diisi"),

  });

  const onChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value, 10);
    setNumber(num)
  };

  const handleLogin = async (number: number) => {
       
    try {
			const response = await fetch ( 'masukkan-api/users/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					number,
				})
			})

			const result = await response.json();

			if(!response.ok){
				throw new Error(result.message || 'Login failed');
			}

			//simpan token ke localStorage jika berhasil lalu arahkan ke halaman selanjutnya
			localStorage.setItem('token', result.token);
			// Router.push('/verification');
		} catch (error) {
			console.error('Login failed!',error);	
		}
  };

  return (
    <section style={{ fontFamily: "'Inter', sans-serif"}} className='flex flex-col items-center justify-center min-h-screen bg-white p-4'>
      <div>
				<Image 
					src="/assets/logo.png" 
					alt="logo" 
					width={247.29}
					height={65.21}
				/>
			</div>
			<div className='w-full max-w-xs flex flex-col'>
				<p className='mt-20 mb-5 font-bold text-xl self-center'>Selamat Datang di Delish!</p>
				<p className='text-sm mb-5 self-start'>Masukkan nomor HP untuk lanjut</p>
			</div>

			<Formik
				initialValues={initialValues}
				validationSchema={loginSchema}
				onSubmit={(values) => {
					handleLogin(values.number as number);
				}}
			>
				<Form className='w-full max-w-xs'>
					{/* Phone */}
					<div className='mb-6'>
						
						<Input
							id="number"
							name="number"
							type="number"
							placeholder='08xxxxxxxxxx'
							value={number}
							onChange={onChangeNumber}
							className="w-[331px] h-[49px] bg-[#D9D9D9] text-center"
						/>
						<ErrorMessage name="email" component="div" className="error" />
					</div>

					{/* Login */}
					<Button 
						type="submit"
						className="w-[331px] h-[49px] bg-[#D9D9D9] text-black text-xl hover:bg-gray-500 mb-4 rounded-none"
						>
							LANJUT
					</Button>
						
				</Form>
			</Formik>
			<div className='flex flex-col items-center'>
				<Link href="/login/email"  className='text-lg text-gray-800 font-semibold'>Gunakan Email</Link>
			</div>
      {/* <BottomNav/> */}
    </section>
  )
}

export default LoginByPhone
