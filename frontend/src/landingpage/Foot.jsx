import React from 'react';
import mainlogo from '../Images/mainlogo.png';
import twitter from '../Images/twitter.png';
import instagram from '../Images/instagram.png';
import linkedIn from '../Images/linkedin.png';
import facebook from '../Images/facebook.png';

const Foot = () => {
  return (
    <div className='flex lg:gap-10 lg:px-20 lg:pt-20 md:gap-0 md:px-0 md:pt-10 pt-10 bg-green-100'>
      <div>
        <img className='lg:ms-0 ms-6 lg:px-0 md:ms-0 md:px-0' src={mainlogo} alt="" />
      </div>
      <div className='lg:p-5 md:p-5 lg:ms-0 md:ms-0 ms-[-45%] lg:mt-0 mt-24 grid lg:grid-cols-4 md:grid-cols-4 grid-cols-1 lg:gap-10 md:gap-3 md:mt-0 lg:px-20 md:px-20'>
        <div>
          <p className='font-bold hover:text-green-900'>Company</p>
          <p className='my-4 hover:text-green-900'>FAQs</p>
          <p className='my-4 hover:text-green-900'>Careers</p>
          <p className='hover:text-green-900'>About</p>
        </div>
        <div>
          <p className='font-bold lg:mt-0 md:mt-0 mt-10 hover:text-green-900'>Help</p>
          <p className='my-4 hover:text-green-900'>Chat with us</p>
          <p className='my-4 hover:text-green-900'>Contact us</p>
          <p className='hover:text-green-900'>Help center</p>
        </div>
        <div>
          <p className='font-bold lg:mt-0 md:mt-0 mt-10 hover:text-green-900'>Legal</p>
          <p className='my-4 hover:text-green-900 '>Privacy Policy</p>
          <p className='hover:text-green-900'>Terms of Service</p>
        </div>
        <div>
          <p className='font-bold hover:text-green-900 lg:mt-0 md:mt-0 mt-10'>Social Media</p>
          <div className='flex my-4 gap-10'>
            <p className='hover:text-green-900'>Twitter</p>
            <img className='h-4 mt-1 transition-transform transform hover:scale-110' src={twitter} alt="" />
          </div>
          <div className='flex my-4 gap-5'>
            <p className='hover:text-green-900'>Instagram</p>
            <img className='h-4 mt-1 transition-transform transform hover:scale-110' src={instagram} alt="" />
          </div>
          <div className='flex my-4 gap-8'>
            <p className='hover:text-green-900'>LinkedIn</p>
            <img className='h-4 mt-1 transition-transform transform hover:scale-110' src={linkedIn} alt="" />
          </div>
          <div className='flex my-4 gap-7'>
            <p className='hover:text-green-900'>Facebook</p>
            <img className='h-4 mt-1 transition-transform transform hover:scale-110' src={facebook} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Foot;
