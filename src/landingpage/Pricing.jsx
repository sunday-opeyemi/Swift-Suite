import React from 'react'
import {IoMdCheckmark} from 'react-icons/io'

const Pricing = () => {
  return (
    <div className='bg-green-700'>
        <h1 className='text-center font-bold text-xl text-white'>Pricing</h1>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1'>
            <div>
                <h1>Student</h1>
                <h2>$50</h2>
                <h3>/month</h3>
                <p>Get Started</p>
                <span><IoMdCheckmark/></span> <span>8 files per account</span>
                <span><IoMdCheckmark/></span> <span>Unlimited templates</span>
                <span><IoMdCheckmark/></span> <span>Registration Form</span>
                <span><IoMdCheckmark/></span> <span>8 files per account</span>
                <span><IoMdCheckmark/></span> <span>8 files per account</span>
                <span><IoMdCheckmark/></span> <span>8 files per account</span>
            </div>
            <div></div>
            <div></div>
        </div>
    </div>
  )
}

export default Pricing