/* eslint-disable @next/next/no-img-element */
"use client"
import { useState } from 'react';
// import { useRouter } from 'next/navigation';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
// import { Eye, EyeOff } from 'lucide-react';
import  Image  from 'next/image';
import BottomNav from '@/components/BottomNav';






const LoginByEmail = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const [visible, setVisible] = useState<boolean>(false);
  const [remember, setRemember] = useState<boolean>(false);
  // const router = useRouter();

  const initialValues = {
    email: email,
    password: password,
  }


  const loginSchema = Yup.object().shape({
  	email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (email: string, password: string) => {
       
    const formData = new URLSearchParams();
      formData.append('email', email);
      formData.append('password', password);

		const response = await fetch('masukkan-api/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: formData.toString(),
		});
    
		const result = await response.json();
		try{
			if(!response.ok){
				const errorData = await response.json();
				throw new Error(errorData.message || 'Login failed');
			}else{
				localStorage.setItem('token', result.token);
				// router.push('/verification');
			}
		}catch(error){
			console.log(error);
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
			<p className='mt-20 mb-5 font-bold text-xl'>Selamat Datang di Delish!</p>

			<Formik
				initialValues={initialValues}
				validationSchema={loginSchema}
				onSubmit={(values) => {
					handleLogin(values.email, values.password);
				}}
			>
				<Form className='w-full max-w-xs'>
					{/* Email */}
					<div className='mb-4'>
						<Label htmlFor="email" className='mb-1'>Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							value={email}
							onChange={onChangeEmail}
							className="w-[331px] h-[49px] bg-[#D9D9D9]"
						/>
						<ErrorMessage name="email" component="div" className="error" />
					</div>

					{/* Password */}
					<div className=' relative w-full'>
						<Label htmlFor="password" className='mb-1'>Password</Label>
						<Input
							id="password"
							name="password"
							type= "password"
							value={password}
							onChange={onChangePassword}
							className="w-[331px] h-[49px] bg-[#D9D9D9]"
						/>
						{/* <button
   						type="button"
   	 					className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer"
    					onClick={() => setVisible(!visible)}
    					aria-label="Toggle password visibility"
  					>
    				{visible ? <EyeOff  /> : <Eye  />}
  					</button> */}
						<ErrorMessage name="password" component="div" className="error" />
					</div>

					{/* Remember me */}
					<div className='flex items-center mb-4 mt-3'>
						<Checkbox
							id="remember"
							checked={remember}
							onCheckedChange={() => setRemember(!remember)}
							className="w-[37px] h-[25px] bg-[#D9D9D9]"
						/>
						<Label htmlFor="remember" className='ml-2'>Tetap login</Label>
					</div>

					{/* Login */}
					<Button 
						type="submit"
						className="w-[331px] h-[49px] bg-[#D9D9D9] text-black hover:bg-gray-500 mb-4 rounded-none"
						>
							MASUK
					</Button>

						{/* Links */}
						
				</Form>
			</Formik>
			<div className='flex flex-col items-center'>
				<a href="#" className='text-sm text-gray-800 mb-2'>Lupa password?</a>
				<Link href="/login/phone"  className='text-lg text-gray-800 font-semibold'>Gunakan nomor HP</Link>
			</div>
			<BottomNav/>
    </section>
  )
}

export default LoginByEmail
