import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
// import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { handleNextStep } from '../redux/vendor'
import { useDispatch, useSelector } from 'react-redux'




const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/


const Schema = yup.object().shape({
    Phone: yup.string().matches(phoneRegExp, 'Invalid phone').required(),
    Email: yup.string().email().required(),
    Name: yup.string().required()
})


const vendorenrolment = () => {
    const store = useSelector(state => state.vendor.vendorData)
    console.log(store);


    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(Schema)
    })

    const dispatch = useDispatch()
    const onSubmit = (data) => {
        let form = { ...store, ...data }
        console.log(form);
        dispatch(handleNextStep(form))
    }

    // useEffect(() => {
    //     if (store) {
    //         setValue("Name", store.Name)
    //         setValue("Email", store.Email)
    //         setValue("Phone", store.Phone)

    //     }
    // }, [])
  return (
    <section className='bg-blue-100 h-screen'>
    <div className='lg:ms-[24%]'>
    <h1 className='text-3xl mt-5 font-bold font-sans'>Personal Info</h1>
    <p className='mt-5 '>Please provide your name, email address, and phone number.</p>

    <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className='my-5'>
            <label className='font-bold' htmlFor="">Name</label>
            <input {...register("Name")} type="text" className={`border border-black h-[40px] rounded lg:w-full mt-3 ${errors.Name?.message && 'error'}`} />
            <p className='text-red-600'>{errors.Name?.message}</p>
        </div>

        <div className='my-5'>
            <label className='font-bold' htmlFor="">Email Address</label>
            <input {...register("Email")} type="text" className={`border border-black h-[40px] mt-3 rounded lg:w-full ${errors.Email?.message && 'error'}`} />
            <p className='text-red-600'>{errors.Email?.message}</p>
        </div>
        <div className='my-5'>
            <label className='font-bold' htmlFor="">Phone</label>
            <input {...register("Phone")} type="text" className={`border border-black h-[40px] mt-3 rounded lg:w-full ${errors.Phone?.message && 'error'}`} />
            <p className='text-red-600'>{errors.Phone?.message}</p>
        </div>
        <button type='submit' className='bg-blue-800 text-white rounded lg:ms-96 ms-26 lg:mt-0 lg:p-3 p-2 lg:w-[25%] w-[105px]'>CONFIRM</button>
    </form>

    </div>
    </section>
  )
}

export default vendorenrolment