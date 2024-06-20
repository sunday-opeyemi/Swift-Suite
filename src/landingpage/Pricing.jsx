import React from 'react'
import { IoMdCheckmark } from 'react-icons/io'
import { Link } from 'react-router-dom'

const Pricing = () => {
    return (
        <div className='bg-green-700 '>
            <h1 className='text-center font-bold text-xl text-white py-3'>Pricing</h1>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 p-5 lg:px-[20%] px-[12%]'>
                <div className='bg-white rounded lg:w-[90%] md:w-[80%] md:h-[100%] lg:h-[89%] py-6 transition duration-500 ease-in-out transform hover:scale-105'>
                    <h1 className='text-center font-bold'>Starter</h1>
                    <h2 className='text-center font-bold text-2xl'>$50</h2>
                    <h3 className='text-center'>/month</h3>
                    <div className='text-center bg-green-700 hover:bg-green-900 w-[50%] p-1 mx-auto text-white my-8 rounded-lg'>
                        <Link to="/signup">Get Started</Link>
                    </div>
                    <div className='flex px-6 gap-3 my-2'>
                        <IoMdCheckmark className='mt-2' /> <span>1 Integrations</span>
                    </div>
                    <div className='flex px-6 gap-3 my-2'>
                        <IoMdCheckmark  className='mt-2'/> <span>50K SKU Limit</span>
                    </div>
                    <div className='flex px-6 gap-3 my-2'>
                        <IoMdCheckmark  className='mt-2'/> <span>250 Orders Included</span>
                    </div>
                    <div className='flex px-6 gap-3 my-2'>
                        <IoMdCheckmark className='mt-2'/> <span>$0.05 Additional Orders</span>
                    </div>
                    <div className='flex px-6 gap-3 my-2'>
                        <IoMdCheckmark  className='mt-2'/> <span>2x Daily Sync Frequency</span>
                    </div>
                    <div className='flex px-6 gap-3 my-2'>
                        <IoMdCheckmark  className='mt-2'/> <span>Basic Support</span>
                    </div>
                </div>


                <div className='bg-white rounded lg:w-[99%] lg:h-[89%] lg:ms-0 md:ms-0 ms-0 lg:mt-0 mt-5 md:mt-0 py-6 transition duration-500 ease-in-out transform hover:scale-105'>
                    <h1 className='text-center font-bold'>Growth</h1>
                    <h2 className='text-center font-bold text-2xl'>$50</h2>
                    <h3 className='text-center'>/month</h3>
                    <div className='text-center bg-green-700 hover:bg-green-900 w-[50%] p-1 text-white my-8 mx-auto rounded-lg'>
                    <Link to="/signup">Get Started</Link>
                    </div>
                    <div className='flex px-6 gap-3'>
                        <IoMdCheckmark  className='mt-2'/> <span>2 Integrations</span>
                    </div>
                    <div className='flex px-6 gap-3 my-2'>
                        <IoMdCheckmark className='mt-2' /> <span>250K SKU Limit</span>
                    </div>
                    <div className='flex px-6 gap-3 my-2'>
                        <IoMdCheckmark  className='mt-2'/> <span>500 Orders Included</span>
                    </div>
                    <div className='flex px-6 gap-3 my-2'>
                        <IoMdCheckmark  className='mt-2'/> <span>$0.04 Additional Orders</span>
                    </div>
                    <div className='flex px-6 gap-3 my-2'>
                        <IoMdCheckmark  className='mt-2'/> <span>Optimized Sync Frequency</span>
                    </div>
                    <div className='flex px-6 gap-3 my-2'>
                        <IoMdCheckmark  className='mt-2'/> <span>Priority support</span>
                    </div>
                </div>

                <div className='bg-white rounded lg:w-[100%] lg:h-[97%] lg:mt-0 lg:ms-5 md:ms-0 ms-0 mt-5 py-6 transition duration-500 ease-in-out transform hover:scale-105'>
                    <h1 className='text-center font-bold'>Enterprise</h1>
                    <h2 className='text-center font-bold text-2xl'>$50</h2>
                    <h3 className='text-center'>/month</h3>
                    <div className='text-center bg-green-700 hover:bg-green-900 w-[50%] p-1 text-white my-8 mx-auto rounded-lg'>
                    <Link to="/signup">Get Started</Link>
                    </div>
                    <div className='flex px-6 gap-3'>
                        <IoMdCheckmark className='mt-2' /> <span>6 Integrations</span>
                    </div>
                    <div className='flex px-6 gap-3 my-2'>
                        <IoMdCheckmark  className='mt-2'/> <span>500K SKU Limit</span>
                    </div>
                    <div className='flex px-6 gap-3 my-2'>
                        <IoMdCheckmark  className='mt-2'/> <span>1000 Orders Included</span>
                    </div>
                    <div className='flex px-6 gap-3 my-2'>
                        <IoMdCheckmark  className='mt-2'/> <span>$0.30 Additional Orders</span>
                    </div>
                    <div className='flex px-6 gap-3 my-2'>
                        <IoMdCheckmark  className='mt-2'/> <span>Optimized Sync Frequency</span>
                    </div>
                    <div className='flex px-6 gap-3 my-2'>
                        <IoMdCheckmark  className='mt-2'/> <span>Dedicated Account Manager</span>
                    </div>
                    <div className='flex px-6 gap-3 my-2'>
                        <IoMdCheckmark  className='mt-2'/> <span>24/7 Premium</span>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}

export default Pricing