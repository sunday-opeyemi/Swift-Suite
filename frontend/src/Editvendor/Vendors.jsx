import React, { useEffect, useState } from 'react'
import { vendorDetails } from './Editvendordetail';
import Cwr from './Cwr';
import Lipsey from './Lipsey';
import { useNavigate } from 'react-router-dom';




const Vendors = () => {
    const [editVendor, setEditVendor] = useState('')
    const navigate = useNavigate()



    const handleEditVendor = (e) => {
        // console.log(e.target.value);
        setEditVendor(e.target.value)
        localStorage.setItem('editVendor', JSON.stringify(e.target.value))
        navigate('/layout/editvendor')
    }
    
    return (
        <div>
            <div className="my-auto">Edit Vendor:</div>
            <select className="cursor-pointer h-9 rounded-xl px-2 outline-none w-20" onChange={handleEditVendor} value={editVendor}>
                {
                    vendorDetails.map((item, i) => (
                        <option key={i} value={item.name}>
                            {item.name}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}

export default Vendors