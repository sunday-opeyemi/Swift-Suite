import React, { useState } from 'react';
import logo from '../Images/mainlogo.svg';
import { FaBars } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";


const Navbar = ({openToggle}) => {
  const location = useLocation()
  
  const hiddenRoutes = ['/layout/home','/layout/catalogue','/layout/product','/layout/allapp']
  const isHidden = hiddenRoutes.some(route => location.pathname.startsWith(route));
  

  
  return isHidden ? null : (
    <nav className='m-0 lg:ps-10 shadow w-full sticky top-0 bg-white z-[1000]'>
      <div className='flex justify-between lg:mx-0 md:mx-5 mx-2'>
        <a href="" className=''>
          <img src={logo} alt="" className='w-[196px] h-[88.2px]' />
        </a>
        <div className='mt-8 hidden lg:block'>
          <ul className='flex  mx-4 justify-between gap-10'>
            <li className='font-semibold'>
              <Link to="/">Home</Link>
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
            <Link to="/signup" className='border w-[165px]  font-semibold text-white text-center py-1 bg-[#089451] rounded'>Get Started For Free</Link>
            <Link to="/signin" className='border w-[150px] font-semibold border-[#089451] text-center py-1 text-[#089451] rounded'>Sign in</Link>
        </div>
        <button onClick={openToggle} className='lg:hidden block mt-1 W-[200PX]  text-green-700 font-bold '>
          {openToggle? <span><FaBars/></span> : <span><IoMdClose /></span> }
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
