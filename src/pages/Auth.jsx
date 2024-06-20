import React, { useState } from 'react'
import { useFormik } from "formik";
import * as yup from 'yup'
import axios from 'axios';
import gif from '../Images/gif.gif'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



const Auth = () => {
   let navigate = useNavigate()
    const [myLoader, setMyLoader] = useState(false)
    const endpoint = 'https://service.swiftsuite.app/accounts/verify_email/'
    let formik = useFormik({
        initialValues: {
          otp: "",
        },
        onSubmit: (values)=>{
          setMyLoader(true)
          // console.log(values);
          axios.post(endpoint, values)
          .then((result)=>{
            console.log(result);
            setMyLoader(false)
            toast.success("account email verified successfully!");
            navigate('/signin')
          })
          .catch((error)=>{
              console.log(error);
              setMyLoader(false)
              if(error.response.status == 404) {
                // console.log("duplicate user found");
                toast.error("Passcode not provided");
            }
          })
        },
    validationSchema: yup.object({
        otp: yup.string().required( <span className='flex'><span>Field is required</span></span>),
    })
  });
  return (
    <>
  
    <div className="flex items-center justify-center  h-[85vh]" >
      <section className='shadow-xl lg:w-1/3 md:w-[400px] w-2/3 lg:p-6 p-4' >
        <div className=''>
          <h1 className='lg:text-xl text-sm font-semibold my-4'>Enter the Otp sent to your Email</h1>
          <form action="" className='' onSubmit={formik.handleSubmit}>
            <div className='mt-5 relative h-[90px]'>
              <label htmlFor="" className='lg:font-semibold'>Otp</label><br />
              <input  type='text' placeholder='******' name='otp'  className='border-2 border-[#089451] mt-1 py-2 focus:outline-[#089451]    ps-4 w-full' onBlur={formik.handleBlur} onChange={formik.handleChange}/>
              <span className='text-red-500 my-1'>{formik.touched.otp && formik.errors.otp}</span>    
            </div>
            <button type='submit' className='w-full bg-[#089451] flex justify-center items-center text-white font-bold py-3 mt-5'>{myLoader? <img src={gif} alt="" className='w-[25px] ' /> : 'Submit'}</button>
          </form>
        </div>
      </section>
      <ToastContainer/>
    </div>
    </>
  )
}

export default Auth