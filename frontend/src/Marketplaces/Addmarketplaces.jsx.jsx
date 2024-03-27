import React from 'react';
import { vendor } from './Data';

const Addvendor = () => {
    return (
        <>
            <h1 className='text-green-600 font-bold'>Add Marketplace</h1>
            <div className='grid lg:grid-cols-3 h-[500px] md:grid-cols-2 grid-cols-1 mt-3 gap-4'>
                {vendor.map((item, i) => (
                    <div key={i} className='bg-white shadow-lg  py-10 text-center text-sm font-semibold'>
                        <div><img src={item.image} width={150} className='mx-auto' alt="" /></div>
                        <div>{item.summaries}</div>
                        <div>{item.price}</div>
                        <button className='bg-green-700 hover:bg-white border rounded hover:border-[#089451] hover:text-[#089451] text-white p-2  px-5 mt-5'>Add Marketplace</button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Addvendor;
