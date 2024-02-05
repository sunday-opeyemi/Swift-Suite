import React, { useState } from 'react'
import signImage from '../Images/signup.svg'
import Navbar from '../components/Navbar'
import { IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";


const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);

    const togglePasswordVisibility = (field) => {
      if (field === 'password') {
          setPasswordVisible(!passwordVisible);
      } else if (field === 'confirm') {
          setConfirmVisible(!confirmVisible);
      }
  };  

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
              <h1 className='text-center font-semibold text-xl text-[#089451]'>Create an Account</h1>
              <form action="" className=''>
              <p className='flex my-2 font-semibold text-xl text-[#089451]'>Sign Up</p>
                <div className='my-2'>
                  <label htmlFor="">Name</label><br />
                  <input type="text" placeholder='Jane Doe' className='px-4 py-2 w-full border-2  border-[#089451]'/>
                </div>
                <div className='my-2'>
                  <label htmlFor="Email">Email</label><br />
                  <input type="text" placeholder='Jane@gmail.com' className='px-4 py-2 w-full border-2 border-[#089451]'/>
                </div>
                <div className='my-2'>
                  <label htmlFor="">Username</label><br />
                  <input type="text" placeholder='Jane1234'  className='px-4 py-2 w-full border-2 border-[#089451]'/>
                </div>
                <div className='my-2 relative'>
                  <label htmlFor="">Password</label><br />
                  <input  type={passwordVisible ? 'text' : 'password'} placeholder=''  autoComplete='off' className='border-2 border-[#089451] py-2 px-4 w-full'/>
                  <span onClick={() => togglePasswordVisibility('password')} className='absolute top-[35px] right-5'>{!passwordVisible ? <BsEyeSlashFill /> : <IoEyeSharp />}</span>
                </div>
                <div className='my-2 relative'>
                  <label htmlFor="">Confirm Password</label><br />
                  <input type={confirmVisible ? 'text' : 'password'}  className='border-2 bg-white border-[#089451] py-2 px-4 w-full'/>
                  <span onClick={() => togglePasswordVisibility('confirm')} className='absolute top-[35px] right-5'>{!confirmVisible ? <BsEyeSlashFill /> : <IoEyeSharp />}</span>
                </div>
                <button className='w-full bg-[#089451] text-white font-bold py-2 my-2'>Sign Up</button>
              </form>
            </div>
        </section>
    </div>
  )
}

export default SignUp