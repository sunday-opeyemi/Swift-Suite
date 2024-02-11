import React, { useState } from 'react'
import signImage from '../Images/signup.svg'
import Navbar from '../components/Navbar'
import { IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from 'yup'
import axios from 'axios';
import loader from '../Images/loader1.gif'



const Signin = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);

    let formik = useFormik({
      initialValues: {
        email: "",
        password: ""
      },
      onSubmit: (values)=>{
        console.log(values);
      },
      validationSchema: yup.object({
        email: yup.string().email('Invalid email format').required( <span className='flex'><span>Field is required</span></span> ),
        password: yup.string().required(<span className="flex">{' '}<span>Field is required</span></span>).min(8, 'Password must be at least 8 characters')
      })
    });

  return (
      <div>
        <div>
        <Navbar/>
        </div>
        <section className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 border-4'>
            <div className='px-10'>
                <img src={signImage} alt=""  className='lg:w-[500px] lg:h-[626px] md:w-full'/>
            </div>
            <div className='lg:py-20 py-0   lg:px-28 px-14 '>
              <h1 className='text-center font-semibold text-2xl text-[#089451] my-2'>Enter your sign In details</h1>
              <form action="" className=''>
              <p className='flex text-[#089451] font-semibold text-xl my-4'>Sign up</p>
                <div className='my-2'>
                  <label htmlFor="" className='font-semibold'>Email</label><br />
                  <input type="text" placeholder='Jane1234' className='px-4 py-3 w-full border-2 mt-1  border-[#089451]'/>
                <span className='text-red-500 my-1'>{formik.touched.email && formik.errors.email}</span>
                </div>
                <div className='mt-5 relative'>
                  <label htmlFor="" className='font-semibold'>Password</label><br />
                  <input  type={passwordVisible ? 'text' : 'password'} placeholder=''  autoComplete='off' className='border-2 border-[#089451] mt-1 py-3 ps-4 w-full'/>
                  <span className='text-red-500 my-1'>{formik.touched.password && formik.errors.password}</span>
                  <span onClick={() => togglePasswordVisibility('password')} className='absolute top-[47px] right-5'>{!passwordVisible ? <BsEyeSlashFill /> : <IoEyeSharp />}</span>
                </div>
                <div className='flex justify-between my-5'>
                    <div className='flex'>
                    <input type="checkbox"  className='border-2 border-black me-2 mt-[3px]'/>
                    <div className='font-semibold'>Remember me</div>
                    </div>
                    <div className='font-semibold'>Forgot password?</div>
                </div>
                <button className='w-full bg-[#089451] text-white font-bold py-3 my-2'>Sign In</button>
                <div className='flex justify-between my-2'>
                    <div>
                    <span className='font-semibold'>Don't have an Account?</span>
                    </div>
                    <Link to='' className='font-bold text-[#089451]'>Sign Up</Link>
                </div>
              </form>
            </div>
        </section>
    </div>
  )
}

export default Signin