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
    <section>
      
    </section>
  )
}

export default Enrolment