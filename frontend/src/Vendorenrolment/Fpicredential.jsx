import React, { useState, useEffect } from 'react'
import { handleNextStep, handlePreviousStep } from '../redux/vendor'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";



const Fpicredential = () => {
  const store = useSelector(state => state.vendor.vendorData)

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const Schema = yup.object().shape({
    ftpusername: yup.string().required(),
    ftppassword: yup.string().required(),
  })

  const { register, handleSubmit, setValue, formState: { errors }, } = useForm({
    resolver: yupResolver(Schema)
  })

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
        setPasswordVisible(!passwordVisible);
    } else if (field === 'ftppassword') {
        setConfirmVisible(!confirmVisible);
    }
};  

  const dispatch = useDispatch()
  const onSubmit = (data) => {
    console.log(data);
    let form = { ...store, ...data }
    console.log(form);
    dispatch(handleNextStep(form))
  }
  
  useEffect(() => {
    setValue("ftpusername", store.ftpusername)
    setValue("ftppassword", store.ftppassword)
  }, [])
  
  
  const handlePrevious =()=>{
    dispatch(handlePreviousStep())
  }

  return (
    <>
    <section className='bg-blue-100 h-screen'>
      <div className='bg-white mt-8 py-3 shadow lg:w-[100%] w-[130%] md:w-[90%] md:ms-[30%] lg:ms-0 ms-5'>
          <h1 className='lg:ps-16 ps-5 py-2 border-b border-gray-500 font-bold '>FTP/API Credentials</h1>
          <form action="" className='lg:mx-20 mx-5' onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className='flex justify-between mt-5'>
                <h3 className='font-semibold'>FTP Username:</h3>
                <input {...register("ftpusername")} type="text" className={`border h-[35px] w-[60%] lg:w-[50%] border-black focus:outline-none py-1 rounded ${errors.ftpusername?.message && 'error'}`} />
              </div>
              <small className='text-red-600 lg:ms-[55%] ms-[40%]'>{errors.ftpusername?.message}</small>
            </div>
            <div>
              <div className='flex justify-between mt-5'>
                <h3 className='font-semibold'>FTP Password:</h3>
                <input {...register("ftppassword")} type={confirmVisible ? 'text' : 'password'} className={`border border-black focus:outline-none py-1 rounded  h-[35px] w-[60%] lg:w-[50%] ${errors.ftppassword?.message && 'error'}`} />
                <span onClick={() => togglePasswordVisibility('confirm')} className='absolute top-[42px] right-5'>{!confirmVisible ?  <IoEyeSharp /> :<BsEyeSlashFill /> }</span>
              </div>
              <small className='text-red-600 lg:ms-[55%] ms-[40%]'>{errors.ftppassword?.message}</small>
            </div>
            <div className='flex flex-col my-10 gap-5 w-1/2 mx-auto'>
              <button className='bg-[#089451] text-white font-semibold py-1 rounded'>Test Connect</button>
              <div className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-2 gap-12 lg:gap-10'>
              <button onClick={handlePrevious} className='border border-[#089451] font-semibold py-1 w-20 rounded'>Previous</button>
                <button type='submit' className='border border-[#089451] font-semibold py-1 w-20 rounded'>Next</button>
              </div>
            </div>
          </form>
          </div>
        </section>
    </>
  )
}

export default Fpicredential