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
            <button className='bg-white text- border py-1 px-5 rounded hover:bg-black font-bold hover:text-white border-[#089451]' onClick={() =>handleEditVendor()}>Edit</button>
        </div>
    )
}

export default Vendors