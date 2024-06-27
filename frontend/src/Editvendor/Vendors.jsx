import React, { useEffect, useState } from 'react'
import { vendorDetails } from './Editvendordetail';
import Cwr from './Cwr';
import Lipsey from './Lipsey';
import { useNavigate } from 'react-router-dom';




const Vendors = () => {
<<<<<<< HEAD
    const [editVendor, setEditVendor] = useState('')
    const navigate = useNavigate()



    const handleEditVendor = (e) => {
        // console.log(e.target.value);
        setEditVendor(e.target.value)
        localStorage.setItem('editVendor', JSON.stringify(e.target.value))
=======
    const navigate = useNavigate()

    const editVendor = JSON.parse(localStorage.getItem('editVendor'));
        console.log(editVendor);


    const handleEditVendor = () => {
>>>>>>> 9dfd328d331e551520b1c835060deaced2c8091f
        navigate('/layout/editvendor')
    }
    
    return (
        <div>
<<<<<<< HEAD
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
=======
            <button className='bg-white text- border py-1 px-5 rounded hover:bg-black font-bold hover:text-white border-[#089451]' onClick={() =>handleEditVendor()}>Edit</button>
>>>>>>> 9dfd328d331e551520b1c835060deaced2c8091f
        </div>
    )
}

export default Vendors