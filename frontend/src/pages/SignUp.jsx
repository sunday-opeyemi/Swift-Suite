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
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirm: ""
    },
    onSubmit: (values)=>{
        console.log(values);
    },
    validationSchema: yup.object({
      firstname: yup.string().required('Field is required'),
      lastname: yup.string().required( <span className='flex'><span>Field is required</span></span> ),
      email: yup.string().email('Invalid email format').required( <span className='flex'><span>Field is required</span></span> ),
      password: yup.string().required(<span className="flex">{' '}<span>Field is required</span></span>).matches(passwordRegex, 'Password must include letters and numbers'),
      confirm: yup.string().required(<span className="flex">{' '}<span>Confirm your Password</span></span> ).oneOf([yup.ref('password'), null], 'Passwords do not match'),
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
                <div className=' h-[80px] my-1'>
                  <label htmlFor="" className='font-semibold my-1'>Firstname</label><br />
                  <input type="text" placeholder='Jane'  className='px-4 py-2 w-full border-2 mt-1 border-[#089451] focus:outline-[#089451]' name='firstname' onBlur={formik.handleBlur} onChange={formik.handleChange}/>
                  <span className='text-red-500 my-1'>{formik.touched.firstname && formik.errors.firstname}</span>
                  {/* <span className='absolute top-[35px] right-5 text-red-700'>{formik.touched.name ? <MdErrorOutline /> : ''}</span> */}
                </div>
                <div className='h-[80px] my-1'>
                  <label htmlFor="" className='font-semibold my-1'>Lastname</label><br />
                  <input  type="text" placeholder='Doe'   className='px-4 py-2 w-full border-2 mt-1 border-[#089451] focus:outline-[#089451]' name='lastname' onBlur={formik.handleBlur} onChange={formik.handleChange}/>
                  <span className='text-red-500 my-1'>{formik.touched.lastname && formik.errors.lastname}</span>
                </div>
                <div className='h-[80px] my-1'>
                  <label htmlFor="Email" className='font-semibold my-1'>Email</label><br />
                  <input  type="email" placeholder='jane@gmail.com'  className='px-4 py-2 w-full border-2 mt-1 border-[#089451]  focus:outline-[#089451]' name='email' onBlur={formik.handleBlur} onChange={formik.handleChange}/>
                  <span className='text-red-500 my-1'>{formik.touched.email && formik.errors.email}</span>
                </div>
                <div className='h-[80px] relative my-1'>
                  <label htmlFor="" className='font-semibold'>Password</label><br />
                  <input  type={passwordVisible ? 'text' : 'password'} placeholder='**********'   autoComplete='off' className='border-2 mt-1 border-[#089451] py-2 px-4 w-full focus:outline-[#089451]' name='password' onBlur={formik.handleBlur} onChange={formik.handleChange}/>
                  <span className='text-red-500 my-1'>{formik.touched.password && formik.errors.password}</span>
                  <span onClick={() => togglePasswordVisibility('password')} className='absolute top-[35px] right-5'>{!passwordVisible ? <IoEyeSharp /> :  <BsEyeSlashFill /> }</span>
                </div>
                <div className='h-[80px] relative my-1'>
                  <label htmlFor="" className='font-semibold'>Confirm Password</label><br />
                  <input type={confirmVisible ? 'text' : 'password'} placeholder='**********'  className='border-2 bg-white border-[#089451] py-2 mt-1 px-4 w-full focus:outline-[#089451]' name='confirm' onBlur={formik.handleBlur} onChange={formik.handleChange}/>
                  <span className='text-red-500 my-1'>{formik.touched.confirm && formik.errors.confirm}</span>
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