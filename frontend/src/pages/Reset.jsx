import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
<<<<<<< HEAD
=======
import { useFormik } from "formik";
import * as yup from 'yup'
import axios from 'axios';
>>>>>>> f3777b94b4498370d7a37a80ee0e9f1b335fde42



const Reset = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);

    const togglePasswordVisibility = (field) => {
      if (field === 'password') {
          setPasswordVisible(!passwordVisible);
      } else if (field === 'confirm') {
          setConfirmVisible(!confirmVisible);
      }
  }; 
<<<<<<< HEAD
=======
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/
  let formik = useFormik({
    initialValues: {
      password: "",
      password2: ""
    },
    onSubmit: (values)=>{
      console.log(values);
    },
    validationSchema: yup.object({
      password: yup.string().required('Field is required').min(8, 'Password must be at least 8 characters').matches(passwordRegex, 'must include letters and numbers'),
      password2: yup.string().required('Confirm password').oneOf([yup.ref('password'), null], 'Passwords do not match'),
    })
  });
>>>>>>> f3777b94b4498370d7a37a80ee0e9f1b335fde42


  return (
      <div>
        <Navbar/>
<<<<<<< HEAD
        <section className='' style={{display: 'flex'}}>
            <div className='shadow w-1/3 p-4' style={{margin: 'auto'}}>
              <h1 className=' text-2xl font-bold'>Reset Account Password</h1>
              <p className='text-xl font-semibold my-4'>Enter a new Password</p>
              <form action="" className=''>
                <div className='mt-5 relative'>
                  <label htmlFor="" className='font-semibold'>Password</label><br />
                  <input  type={passwordVisible ? 'text' : 'password'} placeholder=''  autoComplete='off' className='border-2 border-[#089451] mt-1 py-3 ps-4 w-full'/>
                  <span onClick={() => togglePasswordVisibility('password')} className='absolute top-[39px] right-5'>{!passwordVisible ? <BsEyeSlashFill /> : <IoEyeSharp />}</span>
                </div>
                <div className='my-2 relative'>
                  <label htmlFor="">Confirm Password</label><br />
                  <input type={confirmVisible ? 'text' : 'password'}  className='border-2 bg-white border-[#089451] py-2 px-4 w-full'/>
                  <span onClick={() => togglePasswordVisibility('confirm')} className='absolute top-[35px] right-5'>{!confirmVisible ? <BsEyeSlashFill /> : <IoEyeSharp />}</span>
                </div>
                <button className='w-full bg-[#089451] text-white font-bold py-3 my-2'>Reset Password</button>
=======
        <section className='flex items-center justify-center  h-[85vh]'>
            <div className='shadow-xl lg:w-1/3 md:w-[400px] w-2/3 lg:p-6 p-4'>
              <h1 className=' lg:text-2xl font-bold'>Reset Account Password</h1>
              <p className='lg:text-xl font-semibold my-4'>Enter a new Password</p>
              <form action="" className='' onSubmit={formik.handleSubmit}>
                <div className='mt-5 relative h-[83px]'>
                  <label htmlFor="" className='font-semibold'>Password</label><br />
                  <input  type={passwordVisible ? 'text' : 'password'} placeholder=''  autoComplete='off' name='password' className='border-2 focus:outline-[#089451]   border-[#089451] mt-1 py-2 ps-4 w-full' onBlur={formik.handleBlur} onChange={formik.handleChange}/>
                  <span onClick={() => togglePasswordVisibility('password')} className='absolute top-[41px] right-5'>{!passwordVisible ? <BsEyeSlashFill /> : <IoEyeSharp />}</span>
                  <span className='text-red-500 my-1'>{formik.touched.password && formik.errors.password}</span>
                </div>
                <div className='my-2 relative h-[83px]'>
                  <label htmlFor="" className='font-semibold mb-1'>Confirm Password</label><br />
                  <input type={confirmVisible ? 'text' : 'password'}  className='border-2 focus:outline-[#089451]   bg-white border-[#089451] py-2 px-4 w-full' name='password2' onBlur={formik.handleBlur} onChange={formik.handleChange}/>
                  <span onClick={() => togglePasswordVisibility('confirm')} className='absolute top-[38px] right-5'>{!confirmVisible ? <BsEyeSlashFill /> : <IoEyeSharp />}</span>
                  <span className='text-red-500 my-1'>{formik.touched.password2 && formik.errors.password2}</span>
                </div>
                <button type='submit' className='w-full  bg-[#089451] text-white font-bold py-3 my-2'>Reset Password</button>
>>>>>>> f3777b94b4498370d7a37a80ee0e9f1b335fde42
              </form>
            </div>
        </section>
    </div>
  )
}

export default Reset