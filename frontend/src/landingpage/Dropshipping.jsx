import React from 'react'
import '../Dropshipping.css';
import { Link } from 'react-router-dom';


const Dropshipping = () => {
    return (
        <div>
            <div id='back'>
                <div className='absolute text-white lg:mt-[12%]  md:mt-[20%] mt-[40%] ms-10 lg:ms-[5%]'>
                    <h1 className='lg:text-4xl md:text-4xl text-2xl font-bold'>Elevate Your Ecommerce</h1>
                    <p className='lg:text-4xl md:text-4xl text-2xl font-bold'>Dropshipping Experience</p>
                    <p className='lg:text-2xl md:text-2xl mt-5'>Elevate Your E-Commerce</p>
                    <p className='lg:text-2xl md:text-2xl'>Dropshipping Experience</p>
                    <div className='bg-[#089451] pt-1 lg:w-[150px] md:w-[150px] w-[180px] cursor-pointer p-2 px-5 lg:px-2 md:px-2 mt-5 rounded-lg'>
                    <Link to='/signup' className='ps-2'>Get Started for free</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dropshipping