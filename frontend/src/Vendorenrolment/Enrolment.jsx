import React from 'react'
import Vendorenrolment from './Vendorenrolment'
import Fpicredential from './Fpicredential'
import Fpioption from './Fpioption'
import { useSelector } from 'react-redux'
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { FaSquareCheck } from "react-icons/fa6";
import Producttype from './Producttype'

const Enrolment = () => {
  const currentIndex = useSelector(state => state.vendor.vendorData.currentStep)

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
    <section className='bg-blue-100'>
    <div className='lg:ms-[20%] lg:me-[15%] flex lg:flex-row flex-col gap-8'>
      <div className='stepContainer border-2 w-[70%]'>
        {currentIndex === 0 &&
          (<Vendorenrolment />
          )}
        {currentIndex === 1 &&
          (<Fpicredential />
          )}
        {currentIndex === 2 &&
          (<Fpioption />
          )}
        {currentIndex === 3 &&
          (<Producttype />
          )}
          {currentIndex === 4 &&
            (<Thank />
            )}
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