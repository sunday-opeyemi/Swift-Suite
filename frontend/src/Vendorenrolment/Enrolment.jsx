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
    <div className='lg:ms-[20%] lg:me-[15%] flex lg:flex-row flex-col gap-8'>
      <div className='stepContainer border-2 w-[70%]'>

    <section className='bg-blue-100 h-screen'>
    <div className='lg:ms-[20%] lg:me-[15%] flex gap-8'>

      <div className='stepContainer  w-[70%]'>


      <div className='lg:w-[30%] md:w-[63%] w-[84%] md:ms-[21%] lg:ms-0 ms-7 border-2 lg:order-last bg-white -order-last mt-8 h-[30%] shadow'>

      <div className='w-[30%] border-2  bg-white h-[30%] shadow'>


export default Enrolment