import React from 'react';
import { vendor } from './Data';

const Addvendor = () => {
    return (
        <>
            <h1 className='text-green-600 font-bold'>Add Marketplace</h1>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-3 mb-5 pb-10 gap-4'>
                {vendor.map((item, i) => (
                    <div key={i} className='border p-4 bg-white shadow-lg  text-center text-sm font-semibold'>
                        <div><img src={item.image} width={100} className='mx-auto' alt="" /></div>
                        <div>{item.summaries}</div>
                        <div>{item.price}</div>
                        <button className='bg-green-700 text-white p-2 rounded px-5 mt-5'>Add Marketplace</button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Addvendor;
