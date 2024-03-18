import React, { useEffect, useRef, useState } from 'react';
import logo from '../Images/mainlogo.svg';
import { FaBars } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import Upbar from './Upbar';

const Navbar = ({ openToggle }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const location = useLocation();

  const hiddenRoutes = ['/layout/home', '/layout/catalogue', '/layout/product', '/layout/allapp','/layout/enrolment', '/layout/inventory'];

  const isHidden = hiddenRoutes.some(route => location.pathname.startsWith(route));

  return isHidden ? null : (
    <nav className='m-0 lg:ps-10 shadow w-full sticky top-0 bg-white z-[1000]'>
      <div className='flex justify-between lg:mx-0 md:mx-5 mx-2'>
        <Link to="/" className=''>
          <img src={logo} alt="" className='w-[196px] h-[88.2px]' />
        </Link>
        <div className='mt-8 hidden lg:block'>
          <ul className='flex mx-4 justify-between gap-10'>
            <li className='font-semibold'>
              <Link to="/" className='hover:text-[#089451] hover:font-bold'>Home</Link>
            </li>
            <li className='font-semibold'>
              <a href="" className='hover:text-[#089451] hover:font-bold'>Features</a>
            </li>
            <li className='font-semibold'>
              <a href="" className='hover:text-[#089451] hover:font-bold'>Pricing</a>
            </li>
            <li className='font-semibold'>
              <a href="" className='hover:text-[#089451] hover:font-bold'>Blog</a>
            </li>
            <li className='font-semibold'>
              <a href="" className='hover:text-[#089451] hover:font-bold'>About</a>
            </li>
            <li className='font-semibold'>
              <a href="" className='hover:text-[#089451] hover:font-bold'>Contact</a>
            </li>
          </ul>
        </div>
        <div className='hidden lg:flex justify-center items-center gap-6 md:me-10 mt-1'>
          <Link to="/signup" className='border w-[165px] font-semibold text-white text-center py-1 bg-[#089451] hover:border-[#089451] hover:bg-white hover:text-[#089451] rounded-[6px]'>Get Started For Free</Link>
          <Link to="/signin" className='border w-[150px] font-semibold border-[#089451] hover:border-green-900 text-center py-1 text-[#089451] hover:text-white rounded-[6px] hover:bg-[#089451]'>Sign in</Link>
        </div>
        <button ref={trigger} onClick={() => setDropdownOpen(!dropdownOpen)} className='lg:hidden block mt-1 W-[200PX] text-green-700 font-bold '>
          {openToggle ? <span><FaBars /></span> : <span><IoMdClose /></span>}
        </button>
        {dropdownOpen && (
          <div ref={dropdown} className="absolute bg-white w-48 mt-2 p-2 shadow-md">
            <Upbar/>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;