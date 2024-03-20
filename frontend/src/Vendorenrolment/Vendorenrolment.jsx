import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { handleNextStep } from '../redux/vendor'
import { useDispatch, useSelector } from 'react-redux'
import CountrySelect from './CountrySelect'


const Vendorenrolment = () => {
    let vendorName = JSON.parse(localStorage.getItem('vendorName'))
    console.log(vendorName);
    const store = useSelector(state => state.vendor.vendorData)
    const [select, setSelect] = useState("")
    // console.log(select);
    const Schema = yup.object().shape({
        // vendorName: yup.string().required(),
        street1: yup.string().required(),
        street2: yup.string().required(),
        city: yup.string().required(),
        state: yup.string().required(),
        postalCode: yup.string().required(),
        country: yup.string(),
    })

    const { register, handleSubmit, setValue, formState: { errors }, } = useForm({
        resolver: yupResolver(Schema)
    })

    const dispatch = useDispatch()
    const onSubmit = (data) => {
        let form = { ...store,  ...data, vendorName: vendorName, country: select }
        console.log(form);
        dispatch(handleNextStep(form))
    }

    useEffect(() => {
        if (store) {
            // setValue("vendorName", store.vendorName)
            setValue("street1", store.street1)
            setValue("street2", store.street2)
            setValue("city", store.city)
            setValue("state", store.state)
            setValue("postalCode", store.postalCode)
            setValue("country", store.country)
        }
    }, [])

    return (
        <section className='bg-green-50 mb-10'>
            <form className='bg-white lg:w-[100%] w-[130%] md:w-[90%] md:ms-[30%] lg:ms-0 ms-5  py-10 lg:mt-8 mt-0' action="" onSubmit={handleSubmit(onSubmit)}>
                <h1 className='lg:text-xl text-sm font-bold font-sans border-gray-500 border-b lg:p-4 p-0 py-2 px-4'>Vendor Enrollment</h1>
                <div className=''>
                    <div className='flex lg:gap-10 gap-3 border-gray-500 border-b lg:p-5 p-4'>
                        <label className='font-bold lg:mt-5 mt-2 lg:text-xl text-sm' htmlFor="">Vendor Name:</label>
                        <input {...register("vendorName")} type="text" disabled value={`${vendorName}`} className={`border border-black focus:outline-none py-2 lg:w-[50%] w-[65%] lg:ms-0 rounded lg:mt-3 mt-0 ${errors.vendorName?.message && 'error'}`} />
                    </div>
                    <small className='text-red-600 ms-[42%]'>{errors.vendorName?.message}</small>
                </div>
                <h1 className='lg:text-xl text-sm font-bold font-sans border-gray-500 border-b lg:0 p-5 px-5'>Vendor Address</h1>
                <div className='px-5'>
                    <div className='mt-5'>
                        <div className='flex lg:gap-10 md:gap-8 lg:mt-0 mt-5'>
                            <label className='font-bold w-[140px] mt-3' htmlFor="">Street 1:</label>
                            <input {...register("street1")} type="text" className={`border border-black focus:outline-none py-4 lg:w-[50%] md:w-[45%] rounded ${errors.street1?.message && 'error'}`} />
                        </div>
                        <small className='text-red-600 ms-[42%]'>{errors.street1?.message}</small>
                    </div>
                    <div className=''>
                        <div className='flex lg:gap-10 md:gap-8 lg:mt-0 mt-5'>
                            <label className='font-bold w-[140px] mt-3' htmlFor="">Street 2:</label>
                            <input {...register("street2")} type="text" className={`border border-black focus:outline-none py-4 lg:w-[50%] md:w-[45%] rounded ${errors.street2?.message && 'error'}`} />
                        </div>
                        <small className='text-red-600 ms-[42%]'>{errors.street2?.message}</small>
                    </div>
                    <div className=''>
                        <div className='flex lg:gap-10 md:gap-8 gap-2  lg:mt-0 mt-5'>
                            <label className='font-bold  w-[140px] mt-3' htmlFor="">City:</label>
                            <input {...register("city")} type="text" className={`border border-black focus:outline-none py-2  rounded ${errors.street2?.message && 'error'}`} />
                        </div>
                        <small className='text-red-600 ms-[42%]'>{errors.city?.message}</small>
                    </div>
                    <div className=''>
                        <div className='flex lg:gap-10 md:gap-8 gap-2 lg:mt-0 mt-5'>
                            <label className='font-bold w-[140px] mt-3' htmlFor="">State:</label>
                            <input {...register("state")} type="text" className={`border border-black focus:outline-none py-2 rounded ${errors.street2?.message && 'error'}`} />
                        </div>
                        <small className='text-red-600 ms-[42%]'>{errors.state?.message}</small>
                    </div>
                    <div className=''>
                        <div className='flex lg:gap-10 md:gap-8 gap-2  lg:mt-0 mt-5'>
                            <label className='font-bold w-[140px] mt-3' htmlFor="">Postal Code (Zip):</label>
                            <input {...register("postalCode")} type="text" className={`border border-black focus:outline-none py-2  rounded ${errors.postalCode?.message && 'error'}`} />
                        </div>
                        <small className='text-red-600 ms-[42%]'>{errors.postalCode?.message}</small>
                    </div> 
                    <div className=''>
                        <div className='flex lg:gap-[74px] md:gap-[65px] gap-2 mt-5'>
                            <label className='font-bold w-[105px] mt-3' htmlFor="">Country:</label>
                            <CountrySelect className=' lg:w-[210%] md:w-[200%] w-[150%] border rounded border-black'  {...register("country")} onChange={(selectedOption) => setSelect(selectedOption.value)} value={select} />
                        </div>
                        <small className='text-red-600 ms-[42%]'>{errors.country?.message}</small>
                    </div>
                </div>
                <button type='submit' className='bg-[#089451] hover:border hover:border-[#089451] hover:bg-white text-white hover:text-[#089451] rounded lg:ms-[50%] ms-[49%] lg:mt-1 mt-10  lg:p-2 p-2 lg:w-[20%] w-[105px]'>Next</button>
            </form>
        </section>
    )
}

export default Vendorenrolment