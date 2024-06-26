import React from 'react'
import { Vendordata } from './Vendordata'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setVendorName } from '../redux/vendor'




const MarketVendors = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const vendor=(vendor)=>{
        // console.log(vendor);
        localStorage.setItem('vendor_name', JSON.stringify(vendor))
        dispatch(setVendorName(vendor))
        navigate('/layout/enrolment')
    }

  return (
    <div className=''>
    <h1 className='text-green-600 font-bold lg:mt-20 mt-[410%] md:mt-[40%]'>Add Vendor</h1>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 h-[500px] my-5 grid-cols-1 mt-3 gap-4'>
                {Vendordata.map((item, i) => (
                    <div key={i} className=' bg-white shadow-lg py-10 text-center text-sm font-semibold'>
                        <div className='my-2'><img src={item.image} width={150} height={100} className='mx-auto' alt="" /></div>
                        <div className='text-center px-1 text-[15px] my-2'>{item.summaries}</div>
                        <div className='my-2'>{item.price}</div>
                        <button onClick={()=> vendor(item.name)} className='bg-[#089451] text-white font-bold px-5  hover:bg-white border rounded hover:border-[#089451] hover:text-[#089451] py-1'>Add Vendor</button>
                    </div>
                ))}
            </div>
    </div>
  )
}

export default MarketVendors