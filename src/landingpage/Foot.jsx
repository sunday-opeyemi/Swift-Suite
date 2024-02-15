import React from 'react'
import mainlogo from '../Images/mainlogo.png'
import twitter from '../Images/twitter.png'
import instagram from '../Images/instagram.png'
import linkedIn from '../Images/linkedin.png'
import facebook from '../Images/facebook.png'




const Foot = () => {
  return (
    <div className='flex lg:gap-10 lg:px-20 lg:pt-20 md:gap-0 md:px-0 md:pt-10 pt-10 bg-green-100'>
    <div>
      <img className='lg:ms-0 ms-6 lg:px-0 md:ms-0 md:px-0' src={mainlogo} alt="" />
      </div>
    <div className='lg:p-5 md:p-5 lg:ms-0 md:ms-0 ms-[-45%] lg:mt-0 mt-24 grid lg:grid-cols-4 md:grid-cols-4 grid-cols-1 lg:gap-10 md:gap-3 md:mt-0 lg:px-20 md:px-20'>
      <div>
      <p className='font-bold'>Company</p>
      <p className='my-4'>FAQs</p>
      <p className='my-4'>Careers</p>
      <p>About</p>
      </div>
      <div>
      <p className='font-bold lg:mt-0 md:mt-0 mt-10'>Help</p>
      <p className='my-4'>Chat with us</p>
      <p className='my-4'>Contact us</p>
      <p>Help center</p>
      </div>
      <div>
      <p className='font-bold lg:mt-0 md:mt-0 mt-10'>Legal</p>
      <p className='my-4'>Privacy Policy</p>
      <p>Terms of Service</p>
      </div>
      <div>
      <p className='font-bold lg:mt-0 md:mt-0 mt-10'>Social Media</p>
      <div className='flex my-4 gap-10'>
      <p>Twitter</p>
        <img className='h-4 mt-1' src={twitter} alt="" />
      </div>
      <div className='flex my-4 gap-5'>
      <p>Instagram</p>
        <img className='h-4 mt-1' src={instagram} alt="" />
      </div>
      <div className='flex my-4 gap-8'>
      <p>LinkedIn</p>
        <img className='h-4 mt-1' src={linkedIn} alt="" />
      </div>
      <div className='flex my-4 gap-7'>
      <p>Facebook</p>
        <img className='h-4 mt-1' src={facebook} alt="" />
      </div>
      </div>
      
    </div>
    </div>
    )
}

export default Foot