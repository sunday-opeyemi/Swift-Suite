import React, { useState } from 'react'
import Navbar from '../components/Navbar'




const EnterEmail = () => {
  

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
  )
}

export default EnterEmail