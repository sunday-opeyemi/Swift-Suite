import React, { useEffect } from 'react'
import Vendorenrolment from './Vendorenrolment'
import Fpicredential from './Fpicredential'
import Fpioption from './Fpioption'
import { useDispatch, useSelector } from 'react-redux'
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { FaSquareCheck } from "react-icons/fa6";
import Thank from './Thank'
import Productype from './Productype'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Lipsey from './Lipsey'
import Fragrancex from './Fragrancex'
import { handleNextStep } from '../redux/vendor'
import Zanders from './Zanders'
import Cwr from './Cwr'
import Ssi from './Ssi'



const Enrolment = () => {
  const token = JSON.parse(localStorage.getItem('token'));
  const vendorName = JSON.parse(localStorage.getItem('vendorName'));

  console.log(vendorName);

  const navigate = useNavigate()

  const currentIndex = useSelector(state => state.vendor.vendorData.currentStep)
  // const vendorName = useSelector((state) => state.vendor.vendorData.vendorName);

  let endpoint = 'https://service.swiftsuite.app/vendor/vendor-enrolment/'
    

     const dispatch = useDispatch()
    useEffect(() => {
      return () => {
        // Dispatch an action to reset currentStep to 0 when component unmounts
        dispatch(handleNextStep({ currentStep: -1 }));
      };
    }, [dispatch]);

  const myList = ([
    {
      name: 'Vendor Enrollment',
      icon: <MdCheckBoxOutlineBlank />,
      icon2: <FaSquareCheck />
    },
    {
      name: 'FTP/API Credentials',
      icon: <MdCheckBoxOutlineBlank />,
      icon2: <FaSquareCheck />
    },
    {
      name: 'Vendor Options',
      icon: <MdCheckBoxOutlineBlank />,
      icon2: <FaSquareCheck />
    },
    {
      name: 'Product Type',
      icon: <MdCheckBoxOutlineBlank />,
      icon2: <FaSquareCheck />
    }
  ])
  return (
    <section className='bg-green-50'>
    <div className='lg:ms-[22%] lg:me-[15%] flex lg:flex-row flex-col gap-8'>
    <div className='stepContainer w-[70%]'>
          {currentIndex === 0 && <Vendorenrolment />}
          {currentIndex === 1 && <Fpicredential />}
          {currentIndex === 2 && <Fpioption />}
          {currentIndex === 3 && (vendorName === 'Lipseys' ? <Lipsey /> : vendorName === 'FragranceX' ? <Fragrancex /> : vendorName === 'Zanders' ? <Zanders/> : vendorName === 'cwr' ? <Cwr/> : vendorName === 'ssi' ? <Ssi/> : <Productype />)}
          {currentIndex === 4 && <Thank />}
        </div>
      <div className='lg:w-[30%] md:w-[63%] w-[84%] md:ms-[21%] lg:ms-0 ms-7 border-2 lg:order-last bg-white -order-last mt-8 h-[30%] shadow'>
            {
              myList.map((items, index)=>(
                <ul key={index} className='flex justify-between border-b border-gray-500 p-5'>
                    <li className='font-semibold'>{items.name}</li>
                    <li className={currentIndex >= index ? 'mt-2 text-[#089451]' : 'mt-2'}>{currentIndex >= index ? items.icon2 : items.icon}</li>
                </ul>
              ))
            }
      </div>
    </div>
    </section>
  )
}

export default Enrolment