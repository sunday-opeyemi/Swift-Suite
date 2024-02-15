import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";
import { Link } from 'react-router-dom';



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


  return (
      <div>
        <Navbar/>
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
              </form>
            </div>
        </section>
    </div>
  )
}

export default Reset