import React from 'react'
import eff from '../Images/eff.png'
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from 'react-router-dom';

const Efficie = () => {
    return (
        <div className='grid lg:grid-cols-2 lg:px-[16%] md:px-[16%] px-10 bg-green-700 text-white md:grid-cols-2 grid-cols-1 '>
            <div className='mt-[10%]  '>
                <h1 className='text-xl  font-bold my-5'>Unleashing Seamless Efficiency</h1>
                <p className='lg:w-[65%] w-[100%]'>Empower your business streamline operations, and achieve unparalleled success with our innovative inventory management system. Your growth journey starts here - where efficiency meets excellence.</p>
                <div className='flex bg-white text-green-700 hover:bg-green-900 hover:text-white gap-3 rounded lg:mt-5 mt-5 p-1 lg:w-[30%] md:w-[40%] w-[50%] px-2 md:px-2 lg:px-2'>
                    <Link to='/signup'>Get Started</Link>
                    <IoIosArrowRoundForward className='mt-1' />
                </div>
            </div>
            <div className='mt-[10%]'>
                <img className='lg:w-[85%] lg:h-[95%] h-[100%] w-[100%] md:w-[100%] md:h-[100%]' src={eff} alt="" />
            </div>
        </div>
    )
}

export default Efficie