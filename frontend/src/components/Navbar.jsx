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
        <div className='mt-8 hidden lg:block'>
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
            <a href="" className='border w-[160px]  font-semibold text-white text-center py-1 bg-[#089451] rounded'>Get Started For Free</a>
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
