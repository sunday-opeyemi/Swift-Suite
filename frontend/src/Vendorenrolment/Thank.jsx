import React from 'react'
import success from '../Images/success.png'

// import { useDispatch, useSelector } from 'react-redux'
// import { handlePreviousStep } from '../redux/vendor'


const Thank = () => {

//     const store = useSelector(state => state.vendor.vendorData)

//     const dispatch = useDispatch()
//     const handlePrevious = () => {
//         dispatch(handlePreviousStep())
//     }
    return (
        <>
            <div className='text-center mx-auto mt-20 lg:mt-40 text-[15px] font-bold'>
                <img className='mx-auto' src={success} alt="" />
                <p className='my-3'>Thank you!</p>
                <p>Thanks for ......! We hope you have fun using our platform. If you ever need support, please feel free to email us at abrahamoladotun@gmail.com.</p>
            </div>
            <div className='text-center my-5'>
                <button type='submit' className='bg-[#089451] text-white border py-1 px-5 rounded hover:bg-white font-bold hover:text-[#089451] border-[#089451]'>Go To Catalogue</button>
            </div>

        </>
    )
}

export default Thank