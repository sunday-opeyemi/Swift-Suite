import React, { useState, useEffect } from 'react'
import { handleNextStep, handlePreviousStep } from '../redux/vendor'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import gif from '../Images/gif.gif'
import { useNavigate } from 'react-router-dom'




const Fpicredential = () => {
  const navigate = useNavigate()
  let token = JSON.parse(localStorage.getItem('token'))
  const vendor_name = JSON.parse(localStorage.getItem('vendorName'));

  console.log(vendor_name);

  const store = useSelector(state => state.vendor.vendorData)





  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [dispatchCheck, setDispatchCheck] = useState(false)
  const [myLoader, setMyLoader] = useState(false)


  const Schema = yup.object().shape({
    host: yup.string().required(),
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

  let endpoint = 'https://service.swiftsuite.app/vendor/vendor-enrolment-test/'



  const dispatch = useDispatch()
  const onSubmit = (data) => {
    setMyLoader(true)
    // console.log(data);
    let form = { ...store, ...data }
    console.log(form);
    axios.post(
      endpoint,
      {
        vendor_name: vendor_name,
        ftp_username: form.ftpusername,
        ftp_password: form.ftppassword,
        host: form.host
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then((response) => {
        console.log(response);
        localStorage.setItem('connection',JSON.stringify(response.data))
        setMyLoader(false)
        toast.success("Connection Successful!");
        setDispatchCheck(true)

      })
      .catch((err) => {
        setMyLoader(false)
        console.log(err);
        if (err.response.data.detail) {
          console.log("Token has expired");
          toast.error("Token has expired");
          localStorage.removeItem("token");
          navigate("/signin");
        } else {
          toast("Connection not Successful!")
        }
      })


    if (dispatchCheck === true) {
      dispatch(handleNextStep(form))
    }

  }

  useEffect(() => {
    setValue("host", store.host),
      setValue("ftpusername", store.ftpusername)
    setValue("ftppassword", store.ftppassword)
  }, [])




  const handlePrevious = () => {
    dispatch(handlePreviousStep())
  }

  return (
    <>
      <section className='bg-green-50 h-screen'>

        <div className='bg-white mt-8 py-3 shadow lg:w-[100%] w-[130%] md:w-[90%] md:ms-[30%] lg:ms-0 ms-5'>
          <h1 className='lg:ps-16 ps-5 py-2 border-b border-gray-500 font-bold '>FTP/API Credentials</h1>
          <form action="" className='lg:mx-20 mx-5' onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div>
              <div className='flex justify-between mt-5'>
                <h3 className='font-semibold'>Vendor Name:</h3>
                <input
                  {...register("vendor_name", { required: true })} type="text" disabled value={`${vendor_name}`}
                  className={`border p-3 border-black focus:outline-none py-1 lg:w-[52%] md:w-[46%] w-[58%] ms-12 lg:ms-6 md:ms-20 rounded mt-0 ${errors.vendorName && <span>This field is required</span>}`}
                />
              </div>
              <small className='text-red-600 ms-[42%] lg:ms-[55%]'>{errors.host && <span>This field is required</span>}</small>
              </div>
              <div className='flex justify-between mt-5'>
                <h3 className='font-semibold'>Host:</h3>
                <input {...register("host", { required: true })} type='' className={`border border-black focus:outline-none py-1 rounded  h-[35px] p-3 w-[60%] lg:w-[50%] ${errors.host?.message && 'error'}`} />
              </div>
              <small className='text-red-600 ms-[42%] lg:ms-[55%]'>{errors.host && <span>This field is required</span>}</small>
            </div>
            <div>
              <div className='flex justify-between mt-5'>
                <h3 className='font-semibold'>FTP Username:</h3>
                <input {...register("ftpusername", { required: true })} type="text" className={`border h-[35px] w-[60%] lg:w-[50%] border-black focus:outline-none p-3 py-1 rounded ${errors.ftpusername?.message && 'error'}`} />
              </div>
              <small className='text-red-600 lg:ms-[55%] ms-[40%]'>{errors.ftpusername && <span>This field is required</span>}</small>
            </div>
            <div>
              <div className='flex justify-between mt-5 relative'>
                <h3 className='font-semibold'>FTP Password:</h3>
                <input {...register("ftppassword", { required: true })} type={confirmVisible ? 'text' : 'password'} className={`border border-black focus:outline-none py-1 rounded p-3 h-[35px] w-[60%] lg:w-[50%] ${errors.ftppassword?.message && 'error'}`} />
                <span onClick={() => togglePasswordVisibility('ftppassword')} className='absolute right-[3%] top-[26%]'>{!confirmVisible ? <IoEyeSharp /> : <BsEyeSlashFill />}</span>
              </div>
              <small className='text-red-600 lg:ms-[55%] ms-[40%]'>{errors.ftppassword && <span>This field is required</span>}</small>
            </div>
            <div className='flex flex-col my-10 gap-8 w-2/3 mx-auto'>
              <div className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-2 gap-12 lg:gap-10'>
                <button onClick={handlePrevious} className='border hover:bg-[#089451] hover:text-white border-[#089451] font-semibold py-1 rounded'>Previous</button>
                <div>


                  {myLoader ? <img src={gif} alt="" className='w-[25px] lg:ms-20 mt-2 md:ms-10 ms-10' /> : dispatchCheck ? '' : <button className=' border hover:text-[#089451] hover:bg-white hover:border-[#089451] bg-[#089451] lg:w-40 md:40 w-32   text-white font-semibold py-1 rounded'>Test Connect</button>}

                  {!dispatchCheck ? '' : <button onClick={handleNextStep} className='border border-[#089451] font-semibold py-1 px-10 rounded hover:text-white hover:bg-[#089451]'>Next</button>}

                </div>
              </div>
            </div>
            <ToastContainer />
          </form>
        </div>
      </section>
    </>
  )
}

export default Fpicredential