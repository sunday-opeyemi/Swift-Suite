import React, { useEffect, useState } from 'react'
import { vendorDetails } from './Editvendordetail';
import Cwr from './Cwr';
import Lipsey from './Lipsey';
import { useNavigate } from 'react-router-dom';




const Vendors = () => {
    const navigate = useNavigate()

    const editVendor = JSON.parse(localStorage.getItem('editVendor'));
        console.log(editVendor);


    const handleEditVendor = () => {
        navigate('/layout/editvendor')
    }
    
    return (
        <div>
            <button className='bg-white text- border py-[5px] px-5 rounded-xl  border-[#089451] hover:border-white hover:bg-[#089451] hover:text-white' onClick={() =>handleEditVendor()}>Update Enrolment</button>
        </div>
    )
}

export default Vendors