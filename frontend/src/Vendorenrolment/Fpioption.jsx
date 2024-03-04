import React, { useState, useEffect } from 'react'
import { handleNextStep, handlePreviousStep } from '../redux/vendor'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";



const Fpioption = () => {
  const store = useSelector(state => state.vendor.vendorData)

 

  const Schema = yup.object().shape({
    ftpusername: yup.string().required(),
    ftppassword: yup.string().required(),
  })

  const { register, handleSubmit, setValue, formState: { errors }, } = useForm({
    resolver: yupResolver(Schema)
  })

  const dispatch = useDispatch()
  const onSubmit = (data) => {
    console.log(data);
    let form = { ...store, ...data }
    console.log(form);
    dispatch(handleNextStep(form))
  }

  return (
    <>
      <section className='bg-blue-100 h-screen'>
      <div className='bg-white mt-8 py-3 shadow lg:w-[100%] w-[130%] md:w-[90%] md:ms-[30%] lg:ms-0 ms-5'>
          <h1 className='lg:ps-16 ps-5 py-2 border-b border-gray-500 font-bold '>Vendor Option</h1>
          <form action="" className='lg:mx-20 mx-5' onSubmit={handleSubmit(onSubmit)}>
          <div>
              <div className='flex justify-between my-8'>
                <h3 className='font-semibold'>Host:</h3>
                <input {...register("ftppassword")} type='' className={`border border-black focus:outline-none py-1 rounded  h-[35px] w-[60%] lg:w-[50%] ${errors.ftppassword?.message && 'error'}`} />
              </div>
            </div>
            <div>
              <div className='flex justify-between my-8'>
                <h3 className='font-semibold'>Account Number:</h3>
                <input {...register("ftppassword")} type='' className={`border border-black focus:outline-none py-1 rounded  h-[35px] w-[60%] lg:w-[50%] ${errors.ftppassword?.message && 'error'}`} />
              </div>
            </div>
            <div>
              <div className='flex justify-between my-8'>
                <h3 className='font-semibold'>Dealer Name:</h3>
                <input {...register("ftppassword")} type='' className={`border border-black focus:outline-none py-1 rounded  h-[35px] w-[60%] lg:w-[50%] ${errors.ftppassword?.message && 'error'}`} />
              </div>
            </div>
            <div>
              <div className='flex justify-between my-8'>
                <h3 className='font-semibold'>Dealer Zip:</h3>
                <input {...register("ftppassword")} type='' className={`border border-black focus:outline-none py-1 rounded  h-[35px] w-[60%] lg:w-[50%] ${errors.ftppassword?.message && 'error'}`} />
              </div>
            </div>
            <div className='flex gap-20 justify-center my-14'>
              <button className='bg-white text-[#089451] border py-1 px-3 rounded hover:bg-[#089451] font-bold hover:text-white border-[#089451]'>Previous</button>
              <button className='bg-[#089451] text-white border py-1 px-5 rounded hover:bg-white font-bold hover:text-[#089451] border-[#089451]'>Next</button>
            </div>
          </form>
          </div>
        </section>
    </>
  )
}

export default Fpioption