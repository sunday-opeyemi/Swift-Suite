import React, { useState } from 'react'
import signImage from '../Images/signup.svg'
import Navbar from '../components/Navbar'
import { IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";
// import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { MdErrorOutline } from "react-icons/md";
import { useFormik } from "formik";
import * as yup from 'yup'



const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [inputFilled, setInputFilled] = useState(false);
  const [match, setMatch] = useState("")



//   const { register, handleSubmit, formState: { errors }, trigger} = useForm({
//     resolver: yupResolver(Schema)
// })

    const togglePasswordVisibility = (field) => {
      if (field === 'password') {
          setPasswordVisible(!passwordVisible);
      } else if (field === 'confirm') {
          setConfirmVisible(!confirmVisible);
      }
  };  
  // const handleInputChange = () => {
  //   setInputFilled(true);
  // };
  // const handleBlur = async (field) => {
  //   // Trigger validation for the specific field on blur
  //   await trigger(field);
  //   console.log(field);
  // };
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      confirm: ""
    },
    onSubmit: (values)=>{
        console.log(values);
    },
    validationSchema: yup.object({
      name: yup.string().required('Field is required'),
      email: yup.string().email('Invalid email format').required( <span className='flex'><span>Field is required</span></span> ),
      username: yup.string().required( <span className='flex'><span>Field is required</span></span> ),
      password: yup.string().required(<span className="flex">{' '}<span>Field is required</span></span>).matches(passwordRegex, 'Password must include letters and numbers'),
      confirm: yup.string().required(<span className="flex">{' '}<span>Confirm your Password</span></span> ),
    })
  });
  return (
      <div>
        <div>
        <Navbar/>
        </div>
        <section className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1'>
            <div className='px-10'>
            <img src={signImage} alt=""  className='lg:w-[500px] lg:h-[626px] md:w-full'/>
            </div>
            <div className='lg:py-20 py-0   lg:px-28 px-14 '>
              <h1 className='text-center font-semibold text-xl text-[#089451]'>Create an Account</h1>
              <form action="" className='' onSubmit={formik.handleSubmit}>
              <p className='flex my-4 font-semibold text-xl text-[#089451]'>Sign Up</p>
                <div className=' h-[80px] relative'>
                  <label htmlFor="" className='font-semibold'>Name</label><br />
                  <input type="text"  className='px-4 py-2 w-full border-2  border-[#089451] focus:outline-[#089451]' name='name' onBlur={formik.handleBlur} onChange={formik.handleChange}/>
                  <span className='text-red-500 font-bold'>{formik.touched.name && formik.errors.name}</span>
                  {/* <span className='absolute top-[35px] right-5 text-red-700'>{formik.touched.name ? <MdErrorOutline /> : ''}</span> */}
                </div>
                <div className='h-[80px]'>
                  <label htmlFor="Email" className='font-semibold'>Email</label><br />
                  <input  type="email"  className='px-4 py-2 w-full border-2 border-[#089451]  focus:outline-[#089451]' name='email' onBlur={formik.handleBlur} onChange={formik.handleChange}/>
                  <span className='text-red-500 font-bold'>{formik.touched.email && formik.errors.email}</span>
                </div>
                <div className='h-[80px]'>
                  <label htmlFor="" className='font-semibold'>Username</label><br />
                  <input  type="text"   className='px-4 py-2 w-full border-2 border-[#089451] focus:outline-[#089451]' name='username' onBlur={formik.handleBlur} onChange={formik.handleChange}/>
                  <span className='text-red-500 font-bold'>{formik.touched.username && formik.errors.username}</span>
                </div>
                <div className='h-[80px] relative'>
                  <label htmlFor="" className='font-semibold'>Password</label><br />
                  <input  type={passwordVisible ? 'text' : 'password'}   autoComplete='off' className='border-2 border-[#089451] py-2 px-4 w-full focus:outline-[#089451]' name='password' onBlur={formik.handleBlur} onChange={formik.handleChange}/>
                  <span className='text-red-500 font-bold'>{formik.touched.password && formik.errors.password}</span>
                  <span onClick={() => togglePasswordVisibility('password')} className='absolute top-[35px] right-5'>{!passwordVisible ? <IoEyeSharp /> :  <BsEyeSlashFill /> }</span>
                </div>
                <div className='h-[80px] relative'>
                  <label htmlFor="" className='font-semibold'>Confirm Password</label><br />
                  <input type={confirmVisible ? 'text' : 'password'}  className='border-2 bg-white border-[#089451] py-2 px-4 w-full focus:outline-[#089451]' name='confirm' onBlur={formik.handleBlur} onChange={formik.handleChange}/>
                  <span className='text-red-500 font-bold'>{formik.touched.confirm && formik.errors.confirm}</span>
                  <span onClick={() => togglePasswordVisibility('confirm')} className='absolute top-[35px] right-5'>{!confirmVisible ?  <IoEyeSharp /> :<BsEyeSlashFill /> }</span>
                </div>
                <button type='submit' className='w-full bg-[#089451] text-white font-bold py-2 my-2'>Sign Up</button>
              </form>
            </div>
        </section>
    </div>
  )
}

export default SignUp