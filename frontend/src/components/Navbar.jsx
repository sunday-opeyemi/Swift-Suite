import React from 'react';
import logo from '../Images/mainlogo.svg';
import { FaBars } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className='m-0 lg:ps-10 shadow w-full'>
      <div className='flex justify-between lg:mx-0 mx-10'>
        <a href="" className=''>
          <img src={logo} alt="" className='w-[196px] h-[88.2px]' />
        </a>
<<<<<<< HEAD
        <div className='mt-10 hidden lg:block'>
=======
        <div className='mt-8 hidden lg:block'>
>>>>>>> f3777b94b4498370d7a37a80ee0e9f1b335fde42
          <ul className='flex  mx-4 justify-between gap-10'>
            <li className='font-semibold'>
              <a href="">Home</a>
            </li>
            <li className='font-semibold'>
              <a href="">Features </a>
            </li>
            <li className='font-semibold'>
              <a href="">Pricing</a>
            </li>
            <li className='font-semibold'>
              <a href="">Blog</a>
            </li>
            <li className='font-semibold'>
              <a href="">About</a>
            </li>
            <li className='font-semibold'>
              <a href="">Contact</a>
            </li>
          </ul>
        </div>
        <div className='hidden lg:flex justify-center items-center gap-6 md:me-10 mt-1'>
<<<<<<< HEAD
            <a href="" className='border w-[150px] font-semibold text-white text-center py-1 bg-[#089451] rounded'>Get Started For Free</a>
=======
            <a href="" className='border w-[165px]  font-semibold text-white text-center py-1 bg-[#089451] rounded'>Get Started For Free</a>
>>>>>>> f3777b94b4498370d7a37a80ee0e9f1b335fde42
            <a href="" className='border w-[150px] font-semibold border-[#089451] text-center py-1 text-[#089451] rounded'>Sign in</a>
        </div>
        <button className='lg:hidden block mt-1 W-[200PX] text-green-700 font-bold '>
          <FaBars/>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
