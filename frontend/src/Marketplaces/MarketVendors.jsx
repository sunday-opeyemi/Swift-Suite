import React from 'react'
import { Link } from 'react-router-dom'
import img1 from '../Images/vendorone.png'
import img2 from '../Images/vendortwo.png'
import img3 from '../Images/vendorthree.png'
import img4 from '../Images/vendorfour.png'
import img5 from '../Images/vendorfive.png'



const MarketVendors = () => {
  return (
    <>
        <p className='my-2 font-semibold text-[#089541]'>Add Vendor</p>
    <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 pb-5'>
        <div className='bg-white flex flex-col justify-center items-center gap-2 p-3 shadow-xl'>
            <img src={img1} width={100} alt="" />
            <p>Send orders and receive tracking with CWR</p>
            <p className='font-semibold'>$50/month</p>
            <Link to='/layout/enrolment' className='bg-[#089451] text-white font-bold px-3 hover:bg-white border rounded hover:border-[#089451] hover:text-[#089451] py-1'>Add Vendor</Link>
        </div>
        <div className='bg-white flex flex-col justify-center items-center gap-2 p-3 shadow-xl'>
            <img src={img2} width={100} alt="" />
            <p>Send orders and receive tracking with Zanders</p>
            <p className='font-semibold'>$50/month</p>
            <Link to='/layout/enrolment' className='bg-[#089451] text-white font-bold px-3 hover:bg-white border rounded hover:border-[#089451] hover:text-[#089451] py-1'>Add Vendor</Link>
        </div>
        <div className='bg-white flex flex-col justify-center items-center gap-2 p-3 shadow-xl'>
            <img src={img3} width={100} alt="" />
            <p>Send orders and receive tracking with RSR Group</p>
            <p className='font-semibold'>$50/month</p>
            <Link to='/layout/enrolment' className='bg-[#089451] text-white font-bold px-3 hover:bg-white border rounded hover:border-[#089451] hover:text-[#089451] py-1'>Add Vendor</Link>
        </div>
        <div className='bg-white flex flex-col justify-center items-center gap-2 p-3 shadow-xl'>
            <img src={img4} width={100} alt="" />
            <p>Send orders and receive tracking with FragranceX</p>
            <p className='font-semibold'>$50/month</p>
            <Link to='/layout/enrolment' className='bg-[#089451] text-white font-bold px-3 hover:bg-white border rounded hover:border-[#089451] hover:text-[#089451] py-1'>Add Vendor</Link>
        </div>
        <div className='bg-white flex flex-col justify-center items-center gap-2 p-3 shadow-xl'>
            <img src={img5} width={100} alt="" />
            <p>Send orders and receive tracking with Lipsey's</p>
            <p className='font-semibold'>$50/month</p>
            <Link to='/layout/enrolment' className='bg-[#089451] text-white font-bold px-3 hover:bg-white border rounded hover:border-[#089451] hover:text-[#089451] py-1'>Add Vendor</Link>
        </div>
    </div>
    </>
  )
}

export default MarketVendors