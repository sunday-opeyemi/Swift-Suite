import React, { useState, useEffect } from 'react'
import { handleNextStep, handlePreviousStep } from '../redux/vendor'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'




const Fpioption = () => {
  const navigate = useNavigate()
  let token = JSON.parse(localStorage.getItem('token'))
  const store = useSelector(state => state.vendor.vendorData)
 

  const Schema = yup.object().shape({
    file_urls: yup.string().required(),
    ftp_url: yup.string().required(),
  })

  const { register, handleSubmit, setValue, formState: { errors }, } = useForm({
    resolver: yupResolver(Schema)
  })

  const dispatch = useDispatch()
  const onSubmit = (data) => {
    // console.log(data);
    let form = { ...store, ...data }
    console.log(form);
    dispatch(handleNextStep(form))
  }

  const handlePrevious = () => {
    dispatch(handlePreviousStep())
  }

useEffect(() => {
  if(store) {
    setValue("file_urls", store.file_urls);
    setValue("ftp_url", store.ftp_url);
  }
}, [])


  return (
    <>
      <section className='bg-green-50 h-screen'>
        <div className='bg-white mt-8 py-3 shadow lg:w-[100%] w-[130%] md:w-[90%] md:ms-[30%] lg:ms-0 ms-5'>
          <h1 className='lg:ps-16 ps-5 py-2 border-b border-gray-500 font-bold '>Vendor Option</h1>
          <form action="" className='lg:mx-20 mx-5' onSubmit={handleSubmit(onSubmit)}>
         
            <div>
              <div className='flex justify-between my-2'>
                <h3 className='font-semibold'>File_urls:</h3>
                <input {...register("file_urls" , {required : true})} type='' className={`border border-black focus:outline-none py-1 rounded  h-[35px] w-[60%] p-3 lg:w-[50%] ${errors.file_urls?.message && 'error'}`} />
              </div>
              <small className='text-red-600 ms-[42%] lg:ms-[53%]'>{errors.file_urls  && <span>This field is required</span>}</small>
            </div>
            <div>
              <div className='flex justify-between my-2'>
                <h3 className='font-semibold'>Ftp_url:</h3>
                <input {...register("ftp_url" , {required : true})} type='' className={`border border-black focus:outline-none py-1 rounded  h-[35px] w-[60%] p-3 lg:w-[50%] ${errors.ftp_url?.message && 'error'}`} />
              </div>
              <small className='text-red-600 ms-[42%] lg:ms-[55%]'>{errors.ftp_url  && <span>This field is required</span>}</small>
            </div>
            
            <div className='flex gap-20 justify-center my-14'>
              <button type='submit' onClick={handlePrevious} className='bg-white text-[#089451] border py-1 px-3 rounded hover:bg-[#089451] font-bold hover:text-white border-[#089451]'>Previous</button>
              <button type='submit' className='bg-[#089451] text-white border py-1 px-5 rounded hover:bg-white font-bold hover:text-[#089451] border-[#089451]'>Next</button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default Fpioption