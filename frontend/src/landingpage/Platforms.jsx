import React from 'react'
import walmart from '../Images/walmart.png'
import amazon from '../Images/amazon.png'
import ebay from '../Images/ebay.png'
import woocommerce from '../Images/woocommerce.png'
import shopify from '../Images/shopify.png'



const Platforms = () => {


    return (
        <>
            <h1 className=' text-center text-2xl font-bold'>Supported Platforms</h1>
            <div className='text-2xl lg:text-xl grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 text-center lg:px-10 lg:mt-0 mt-3 p-5'>
                <div className='border shadow-lg lg:w-[80%] w-[80%] bg-gray-300 p-2 mx-auto py-5 lg:h-[95%] md:h-[100%] rounded transition duration-500 ease-in-out transform hover:scale-105'>
                    <img className='w-[50%] mx-auto' src={walmart} alt="" />
                    <p className='lg:text-xl text-xl md:text-xl'>Direct Integration with <br /> walmart for a <br /> streamlined selling <br />  experience </p>
                </div>
                <div className='border shadow-lg lg:w-[80%] w-[80%] bg-gray-300 mx-auto p-2 py-5 lg:mt-0 md:mt-0 mt-10 md:h-[95%] lg:h-[95%]  rounded transition duration-500 ease-in-out transform hover:scale-105'>
                    <img className='w-[40%] mx-auto' src={amazon} alt="" />
                    <p className='lg:text-xl text-xl md:text-xl'>Seamless integration <br />  with amazon Seller <br /> central for a robust <br />  eCommerce presence.</p>
                </div>
                <div className='border shadow-lg lg:w-[80%] w-[80%] bg-blue-100 mx-auto p-2 py-5 md:h-[80%] lg:h-[95%] lg:mt-0 mt-10 rounded transition duration-500 ease-in-out transform hover:scale-105'>
                    <img className='w-[40%] mx-auto' src={ebay} alt="" />
                    <p className='lg:text-xl text-xl md:text-xl'>Effortless connection <br />  with ebay Seller for <br />  efficient order <br />  management.</p>
                </div>
                <div className='border shadow-lg lg:w-[80%] w-[80%] bg-blue-100 mx-auto p-2 py-5 h-[95%] md:h-[80%] lg:h-[95%] lg:mt-0 mt-10 rounded transition duration-500 ease-in-out transform hover:scale-105'>
                    <img className='w-[40%] mx-auto' src={woocommerce} alt="" />
                    <p className='lg:text-xl text-xl md:text-xl'>Compatible with <br />  woocommerce, <br />  offering flexibilty for <br />  WordPress-based <br />  online stores.</p>
                </div>
                <div className='border shadow-lg lg:w-[80%] w-[80%] bg-blue-100 mx-auto p-2 py-5 h-[95%] md:h-[80%] lg:h-[95%] lg:mt-0 mt-16 rounded transition duration-500 ease-in-out transform hover:scale-105'>
                    <img className='w-[40%] mx-auto' src={shopify} alt="" />
                    <p className='lg:text-xl text-xl md:text-xl'>Integration with <br />  Shopify, empowering <br />  merchants to sell <br />  across multiple <br />  channels.</p>
                </div>

            </div>
        </>
    )
}

export default Platforms