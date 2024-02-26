import React from 'react'
import swift from '../Images/swift.png'
import { IoMdClose } from "react-icons/io";
import { FaHouse } from "react-icons/fa6";
import { MdOutlineRealEstateAgent } from "react-icons/md";
import { Link, useLocation } from 'react-router-dom'


const Upbar = ({onClickHandler}) => {


// const location = useLocation()
// const hiddenRoutes = []

// const isHidden = hiddenRoutes.some(route => location.pathname.startsWith(route));


  return (
    <>
        <div className='fixed w-screen lg:hidden bg-white p-5 rounded' style={{zIndex: '2'}}>
            <section className='mx-1'>
                <div className='grid grid-cols-2 gap-2 justify-center items-center'>
                    <Link to="" className='font-semibold'>Home</Link>
                    <Link to="" className='font-semibold'>Features</Link>
                    <Link className='font-semibold' href="">Pricing</Link>
                    <Link className='font-semibold' href="">Blog</Link>
                    <Link className='font-semibold' href="">About</Link>
                    <Link className='font-semibold' href="">Contact</Link>
                </div>
                <div className='flex md:gap-22 gap-5 my-4'>
                    <Link className='bg-[#089451] text-white text-center py-1 w-[200px]' to="/signup">Get Started For Free</Link>
                    <Link to='/signin' className='border border-[#089451] py-1 text-center w-[200px]'>Sign in</Link>
                </div>
            </section>
        </div>
    </>
  )
}

export default Upbar