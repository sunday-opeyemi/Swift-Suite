import React from 'react'
import success from '../Images/success.png'

import { useDispatch, useSelector } from 'react-redux'
import { handlePreviousStep } from '../redux/vendor'
import { useNavigate } from 'react-router-dom'


const Thank = () => {

    const store = useSelector(state => state.vendor.vendorData)
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const handlePrevious = () => {
        // alert()
        dispatch(handlePreviousStep())
    }

    const catalogue=()=>{
        navigate("/layout/catalogue")
    }
    return (
        <>
        <div className='lg:w-[175%]  w-[140%] h-screen'>
         <section className='flex flex-col justify-center items-center h-full mt-[-40px] md:mx-40 mx-20'>
          <div className='text-center text-[15px] font-bold'>
                <img className='mx-auto' src={success} width={150} alt="" />
                <p className='my-3'>Enrollment Successful!</p>
                <p className=''>Thanks for ......! We hope you have fun using our platform. If you ever need support, please feel free to email us at abrahamoladotun@gmail.com.</p>
            </div>
            <div className='text-center my-5'>
                <button onClick={() => catalogue()} type='submit' className='bg-[#089451] text-white border py-1 px-5 rounded hover:bg-white font-bold hover:text-[#089451] border-[#089451]'>Go To Catalogue</button>
            </div>

            <div className='text-center my-5'>
                <button type='submit' onClick={handlePrevious} className='bg-[#089451] text-white border py-1 px-5 rounded hover:bg-white font-bold hover:text-[#089451] border-[#089451]'>Go To Previous</button>
            </div>
        </section>
        </div>

        </>
    )
}

export default Thank