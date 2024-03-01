import React from 'react'
import Vendorenrolment from './Vendorenrolment'
import Fpicredential from './Fpicredential'
import Fpioption from './Fpioption'
import Cataloguefilter from './Cataloguefilter'
import { useSelector } from 'react-redux'
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { FaSquareCheck } from "react-icons/fa6";

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
      name: 'Catalogue Filter',
      icon: <MdCheckBoxOutlineBlank />,
      icon2: <FaSquareCheck />
    }
  ])
  return (
    <section className='bg-blue-100'>
    <div className='lg:ms-[20%] lg:me-[15%] flex gap-8'>

      <div className='stepContainer  border-2 border-black w-[70%]'>

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
          (<Cataloguefilter />
          )}
          {currentIndex === 4 &&
            (<Thank />
            )}
      </div>

      <div className='w-[30%] border-2  bg-white h-[30%] shadow'>

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