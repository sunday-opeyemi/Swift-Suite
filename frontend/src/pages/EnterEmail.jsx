import React, { useState } from 'react'
import Navbar from '../components/Navbar'
<<<<<<< HEAD

=======
import { useFormik } from "formik";
import * as yup from 'yup'
import axios from 'axios';
>>>>>>> f3777b94b4498370d7a37a80ee0e9f1b335fde42



const EnterEmail = () => {
<<<<<<< HEAD
  

  return (
      <div>
        <Navbar/>
        <section className='' style={{display: 'flex'}}>
            <div className='shadow w-1/3 p-4' style={{margin: 'auto'}}>
              <h1 className=' text-2xl font-bold'>Forgot Password?</h1>
              <p className='text-xl font-semibold my-4'>Enter your Email Address</p>
              <form action="" className=''>
                <div className='mt-5 relative'>
                  <label htmlFor="" className='font-semibold'>Email</label><br />
                  <input  type='text' placeholder='Jane@gmail.com'  className='border-2 border-[#089451] mt-1 py-2 my-4 ps-4 w-full'/>
                </div>
                <button className='w-full bg-[#089451] text-white font-bold py-3 my-2'>Reset Password</button>
              </form>
            </div>
        </section>
    </div>
=======

  let formik = useFormik({
    initialValues: {
      email: ""
    },
    onSubmit: (values)=>{
      console.log(values);
    },
    validationSchema: yup.object({
      email: yup.string().email('Invalid email format').required( <span className='flex'><span>Field is required</span></span> ),
    })
  });
  return (
    <>
    <Navbar />
    <div className="flex items-center justify-center  h-[85vh]" >
      <section className='shadow-xl lg:w-1/3 md:w-[400px] w-2/3 lg:p-6 p-4' >
        <div className=''>
          <h1 className='lg:text-2xl text-xl font-bold'>Forgot Password?</h1>
          <p className='lg:text-xl font-semibold my-4'>Enter your Email Address</p>
          <form action="" className='' onSubmit={formik.handleSubmit}>
            <div className='mt-5 relative h-[90px]'>
              <label htmlFor="" className='font-semibold'>Email</label><br />
              <input  type='text' placeholder='Jane@gmail.com' name='email'  className='border-2 border-[#089451] mt-1 py-2 focus:outline-[#089451]    ps-4 w-full' onBlur={formik.handleBlur} onChange={formik.handleChange}/>
              <span className='text-red-500 my-1'>{formik.touched.email && formik.errors.email}</span>    
            </div>
            <button className='w-full bg-[#089451] text-white font-bold py-3 my-2'>Reset Password</button>
          </form>
        </div>
      </section>
    </div>
    </>
>>>>>>> f3777b94b4498370d7a37a80ee0e9f1b335fde42
  )
}

export default EnterEmail