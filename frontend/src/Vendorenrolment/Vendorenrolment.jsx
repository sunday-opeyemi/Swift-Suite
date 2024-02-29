import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
// import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { handleNextStep } from '../redux/vendor'
import { useDispatch, useSelector } from 'react-redux'
import CountrySelect from './CountrySelect'




const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/


const Schema = yup.object().shape({
    vendorName: yup.string().required(),
    street1: yup.string().required(),
    street2: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    postalCode: yup.string().required(),
    country: yup.string(),




    

    // Phone: yup.string().matches(phoneRegExp, 'Invalid phone').required(),
    // Email: yup.string().email().required(),
})


const vendorenrolment = () => {
    const [select, setSelect] = useState("")
    console.log(select);
    const store = useSelector(state => state.vendor.vendorData)
    console.log(store);


    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(Schema)
    })

    const dispatch = useDispatch()
    const onSubmit = (data) => {
        let form = { ...store, ...data }
        console.log(form);
        // dispatch(handleNextStep(form))
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
        
            <form className='bg-white p-5' action="" onSubmit={handleSubmit(onSubmit)}>
                <h1 className='text-xl font-bold font-sans'>Vendor Enrollment</h1>
                <div className='my-5'>
                    <div className='flex gap-10'>
                        <label className='font-bold mt-5' htmlFor="">Vendor Name</label>
                        <input {...register("vendorName")} type="text" className={`border border-black h-[35px] lg:w-[50%] lg:ms-10 rounded mt-3 ${errors.vendorName?.message && 'error'}`} />
                    </div>
                    <small className='text-red-600 lg:ms-[15%]'>{errors.vendorName?.message}</small>
                </div>
                <h1 className='text-xl font-bold font-sans'>Vendor Address</h1>
                <div className='my-5'>
                    <div className='flex gap-10'>
                        <label className='font-bold mt-5' htmlFor="">Street 1:</label>
                        <input {...register("street1")} type="text" className={`border border-black h-[35px] lg:w-[50%] lg:ms-10 rounded mt-3 ${errors.street1?.message && 'error'}`} />
                    </div>
                    <small className='text-red-600 lg:ms-[15%]'>{errors.street1?.message}</small>
                </div>
                <div className='my-5'>
                <div className='flex gap-10'>
                    <label className='font-bold mt-5' htmlFor="">Street 2:</label>
                    <input {...register("street2")} type="text" className={`border border-black h-[35px] lg:w-[50%] lg:ms-10 rounded mt-3 ${errors.street2?.message && 'error'}`} />
                </div>
                <small className='text-red-600 lg:ms-[15%]'>{errors.street2?.message}</small>
            </div>
            <div className='my-5'>
                <div className='flex gap-10'>
                    <label className='font-bold mt-5' htmlFor="">City:</label>
                    <input {...register("city")} type="text" className={`border border-black h-[35px] lg:w-[50%] lg:ms-10 rounded mt-3 ${errors.street2?.message && 'error'}`} />
                </div>
                <small className='text-red-600 lg:ms-[15%]'>{errors.city?.message}</small>
            </div>
            <div className='my-5'>
                <div className='flex gap-10'>
                    <label className='font-bold mt-5' htmlFor="">State:</label>
                    <input {...register("state")} type="text" className={`border border-black h-[35px] lg:w-[50%] lg:ms-10 rounded mt-3 ${errors.street2?.message && 'error'}`} />
                </div>
                <small className='text-red-600 lg:ms-[15%]'>{errors.state?.message}</small>
            </div>
            <div className='my-5'>
                <div className='flex gap-10'>
                    <label className='font-bold mt-5' htmlFor="">Postal Code (Zip):</label>
                    <input {...register("postalCode")} type="text" className={`border border-black h-[35px] lg:w-[50%] lg:ms-10 rounded mt-3 ${errors.postalCode?.message && 'error'}`} />
                </div>
                <small className='text-red-600 lg:ms-[15%]'>{errors.postalCode?.message}</small>
            </div>
        
            <div className='my-5'>
                <div className='flex gap-10'>
                    <label className='font-bold mt-5' htmlFor="">Country:</label>
                    <CountrySelect {...register("country")}  onChange={(e) => setSelect(e.target.value)} value={select} />
                </div>
            </div>
            
                <button type='submit' className='bg-blue-800 text-white rounded lg:ms-96 ms-26 lg:mt-0 lg:p-3 p-2 lg:w-[25%] w-[105px]'>CONFIRM</button>
            </form>
        </section>
    )
}

export default vendorenrolment