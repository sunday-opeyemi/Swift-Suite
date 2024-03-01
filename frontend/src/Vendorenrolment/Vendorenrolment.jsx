import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
// import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { handleNextStep } from '../redux/vendor'
import { useDispatch, useSelector } from 'react-redux'
import CountrySelect from './CountrySelect'




const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

const vendorenrolment = () => {
    const [select, setSelect] = useState("")
    console.log(select);
    const Schema = yup.object().shape({
        vendorName: yup.string().required(),
        street1: yup.string().required(),
        street2: yup.string().required(),
        city: yup.string().required(),
        state: yup.string().required(),
        postalCode: yup.string().required(),
        country: yup.string(),
    })

    const store = useSelector(state => state.vendor.vendorData)
    // console.log(store);


    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(Schema)
    })

    const dispatch = useDispatch()
    const onSubmit = (data) => {
        let form = { ...store, ...data, country: select }
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
        <section className='bg-blue-100 mb-10'>
            <form className='bg-white py-10  mt-8' action="" onSubmit={handleSubmit(onSubmit)}>
                <h1 className='text-xl font-bold font-sans border-gray-500 border-b p-4'>Vendor Enrollment</h1>
                <div className='my-5'>
                    <div className='flex gap-10  border-gray-500 border-b px-7 p-5'>
                        <label className='font-bold mt-5' htmlFor="">Vendor Name</label>
                        <input {...register("vendorName")} type="text" className={`border border-black h-[35px] lg:w-[50%] lg:ms-10 rounded mt-3 ${errors.vendorName?.message && 'error'}`} />
                    </div>
                    <small className='text-red-600 lg:ms-[15%]'>{errors.vendorName?.message}</small>
                </div>
                <h1 className='text-xl font-bold font-sans border-gray-500 border-b px-7'>Vendor Address</h1>
                <div className='px-10'>
                    <div className=''>
                        <div className='flex gap-10 mt-5'>
                            <label className='font-bold mt-5' htmlFor="">Street 1:</label>
                            <input {...register("street1")} type="text" className={`border border-black h-[35px] lg:w-[50%] lg:ms-[12%] rounded mt-3 ${errors.street1?.message && 'error'}`} />
                        </div>
                        <small className='text-red-600 lg:ms-[15%]'>{errors.street1?.message}</small>
                    </div>
                    <div className=''>
                        <div className='flex gap-10'>
                            <label className='font-bold ' htmlFor="">Street 2:</label>
                            <input {...register("street2")} type="text" className={`border border-black h-[35px] lg:w-[50%] lg:ms-[12%] rounded ${errors.street2?.message && 'error'}`} />
                        </div>
                        <small className='text-red-600 lg:ms-[15%]'>{errors.street2?.message}</small>
                    </div>
                    <div className=''>
                        <div className='flex gap-10'>
                            <label className='font-bold' htmlFor="">City:</label>
                            <input {...register("city")} type="text" className={`border border-black h-[35px] lg:w-[50%] lg:ms-[18%] rounded ${errors.street2?.message && 'error'}`} />
                        </div>
                        <small className='text-red-600 lg:ms-[15%]'>{errors.city?.message}</small>
                    </div>
                    <div className=''>
                        <div className='flex gap-10'>
                            <label className='font-bold' htmlFor="">State:</label>
                            <input {...register("state")} type="text" className={`border border-black h-[35px] lg:w-[50%] lg:ms-[17%] rounded ${errors.street2?.message && 'error'}`} />
                        </div>
                        <small className='text-red-600 lg:ms-[15%]'>{errors.state?.message}</small>
                    </div>
                    <div className=''>
                        <div className='flex gap-10'>
                            <label className='font-bold' htmlFor="">Postal Code (Zip):</label>
                            <input {...register("postalCode")} type="text" className={`border border-black h-[35px] lg:w-[50%] rounded ${errors.postalCode?.message && 'error'}`} />
                        </div>
                        <small className='text-red-600 lg:ms-[15%]'>{errors.postalCode?.message}</small>
                    </div>
                    <div className=''>
                        <div className='flex gap-10'>
                            <label className='font-bold mt-4' htmlFor="">Country:</label>
                            <CountrySelect  {...register("country")} onChange={(selectedOption) => setSelect(selectedOption.value)} value={select} />
                        </div>
                        <small className='text-red-600 lg:ms-[15%]'>{errors.country?.message}</small>
                    </div>
                </div>
                <button type='submit' className='bg-green-800 text-white rounded lg:ms-[50%] ms-26 lg:mt-10 lg:p-2 p-2 lg:w-[20%] w-[105px]'>Next</button>
            </form>
        </section>
    )
}

export default vendorenrolment