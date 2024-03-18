import React from 'react'
import { IoMdCheckmark } from 'react-icons/io'
import { Link } from 'react-router-dom'

const Pricing = () => {
    return (
        <div className='bg-green-700 '>
            <h1 className='text-center font-bold text-xl text-white py-3'>Pricing</h1>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 p-5 lg:px-[20%] px-[12%]'>
                <div className='bg-white rounded lg:w-[90%] md:w-[80%] md:h-[83%] lg:h-[75%] py-6 transition duration-500 ease-in-out transform hover:scale-105'>
                    <h1 className='text-center font-bold'>Student</h1>
                    <h2 className='text-center font-bold text-2xl'>$50</h2>
                    <h3 className='text-center'>/month</h3>
                    <div className='text-center bg-green-700 hover:bg-green-900 w-[50%] p-1 mx-auto text-white my-8 rounded-lg'>
                        <Link to="/signup">Get Started</Link>
                    </div>
                    <div className='flex px-6 gap-3 my-2'>
                        <IoMdCheckmark className='mt-1' /> <span>8 files per account</span>
                    </div>
                    <div className='flex px-6 gap-3 my-2'>
                        <IoMdCheckmark /> <span>Unlimited templates</span>
                    </div>
                    <div className='flex px-6 gap-3 my-2'>
                        <IoMdCheckmark /> <span>Registration Form</span>
                    </div>
                    <div className='flex px-6 gap-3 my-2'>
                        <IoMdCheckmark /> <span>Email Announcements</span>
                    </div>
                    <div className='flex px-6 gap-3 my-2'>
                        <IoMdCheckmark /> <span>Added to community</span>
                    </div>
                    <div className='flex px-6 gap-3 my-2'>
                        <IoMdCheckmark /> <span>Differents screens</span>
                    </div>
                </div>


                <div className='bg-white rounded lg:w-[99%] lg:h-[89%] lg:ms-0 md:ms-0 ms-0 lg:mt-0 mt-5 md:mt-0 py-6 transition duration-500 ease-in-out transform hover:scale-105'>
                    <h1 className='text-center font-bold'>Student</h1>
                    <h2 className='text-center font-bold text-2xl'>$50</h2>
                    <h3 className='text-center'>/month</h3>
                    <div className='text-center bg-green-700 hover:bg-green-900 w-[50%] p-1 text-white my-8 mx-auto rounded-lg'>
                    <Link to="/signup">Get Started</Link>
                    </div>
                    <div className='flex px-6 gap-3'>
                        <IoMdCheckmark /> <span>16 files per account</span>
                    </div>
                    <div className='flex px-6 gap-3 my-2'>
                        <IoMdCheckmark /> <span>Unlimited templates</span>
                    </div>
                    <div className='flex px-6 gap-3 my-2'>
                        <IoMdCheckmark /> <span>Registration Form</span>
                    </div>
                    <div className='flex px-6 gap-3 my-2'>
                        <IoMdCheckmark /> <span>Email Announcements</span>
                    </div>
                    <div className='flex px-6 gap-3 my-2'>
                        <IoMdCheckmark /> <span>Added to community</span>
                    </div>
                    <div className='flex px-6 gap-3 my-2'>
                        <IoMdCheckmark /> <span>Email support</span>
                    </div>
                    <div className='flex px-6 gap-3 my-2'>
                        <IoMdCheckmark /> <span>300 Email invitations event</span>
                    </div>
                    <div className='flex px-6 gap-3 my-2'>
                        <IoMdCheckmark /> <span>Events Reminders</span>
                    </div>
                </div>

                <div className='bg-white rounded lg:w-[100%] lg:h-[97%] lg:mt-0 lg:ms-5 md:ms-0 ms-0 mt-5 py-6 transition duration-500 ease-in-out transform hover:scale-105'>
                    <h1 className='text-center font-bold'>Student</h1>
                    <h2 className='text-center font-bold text-2xl'>$50</h2>
                    <h3 className='text-center'>/month</h3>
                    <div className='text-center bg-green-700 hover:bg-green-900 w-[50%] p-1 text-white my-8 mx-auto rounded-lg'>
                    <Link to="/signup">Get Started</Link>
                    </div>
                    <div className='flex px-6 gap-3 my-2'>
                        <IoMdCheckmark /> <span>8 files per account</span>
                    </div>
                    <div className='flex px-6 gap-3 my-2'>
                        <IoMdCheckmark /> <span>Unlimited templates</span>
                    </div>
                    <div className='flex px-6 gap-3 my-2'>
                        <IoMdCheckmark /> <span>Registration Form</span>
                    </div>
                    <div className='flex px-6 gap-3 my-2'>
                        <IoMdCheckmark /> <span>Email Announcements</span>
                    </div>
                    <div className='flex px-6 gap-3 my-2'>
                        <IoMdCheckmark /> <span>Added to community</span>
                    </div>
                    <div className='flex px-6 gap-3 my-2'>
                        <IoMdCheckmark /> <span>Email support</span>
                    </div>
                    <div className='flex px-6 gap-3 my-2'>
                        <IoMdCheckmark /> <span>300 Email invitations event</span>
                    </div>
                    <div className='flex px-6 gap-3 my-2'>
                        <IoMdCheckmark /> <span>Events Reminders</span>
                    </div>
                    <div className='flex px-6 gap-3 my-2'>
                        <IoMdCheckmark /> <span>AI Builders</span>
                    </div>
                    <div className='flex px-6 gap-3 my-2'>
                        <IoMdCheckmark /> <span>Group discounts</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pricing