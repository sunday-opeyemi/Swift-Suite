import React from 'react'
import ico4 from '../Images/ico4.png'
import ico2 from '../Images/ico2.png'
import ico1 from '../Images/ico1.png'
import ico3 from '../Images/ico3.png'



const Choose = () => {
    return (
        <div>
            <h1 className='text-center text-2xl font-bold mt-16 '>Why Choose Us</h1>
            <div className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 mt-10 lg:px-[30%] md:px-[10%] px-[10%] gap-10'>
                <div className='bg-green-800 p-5  text-white rounded-lg py-10 lg:h-[100%] transition duration-500 ease-in-out transform hover:scale-105'>
                    <img src={ico4} alt="" />
                    <h1 className='mt-5 font-bold'>Versatility</h1>
                    <p className='mt-5'>Swift Suite supports a variety of platforms, catering to the diverse needs of eCommerce merchants</p>
                </div>
                <div className='bg-gray-300 p-5 rounded-lg lg:h-[100%] transition duration-500 ease-in-out transform hover:scale-105'>
                    <img src={ico2} alt="" />
                    <h1 className='mt-5 font-bold'>Efficiency</h1>
                    <p className='mt-5'>With features inspired by successful solutions like Spark Shipping and Inventory Source, Swift Suite ensures your operations are streamlined, saving <br /> time and resources</p>
                </div>


                <div className='bg-gray-300 p-5  rounded-lg transition duration-500 ease-in-out transform hover:scale-105'>
                    <img src={ico3} alt="" />
                    <h1 className='font-bold mt-5'>Simplify Inventory Oversight</h1>
                    <p className=''>Our integrated system brings together the dashboard, catalogue, and reports for seamless inventory oversight. Say goodbye to complexity and hello to streamlined control.</p>
                </div>
                <div className='bg-green-800 text-white p-5  rounded-lg transition duration-500 ease-in-out transform hover:scale-105'>
                    <img src={ico1} alt="" />
                    <h1 className='font-bold text-white mt-5'>Achieve progres, Track Success</h1>
                    <p className='mt-5'>Track your business's journey to success through our user-friendly dashboard, comprehensive catalogue management and insightful reports. Your progress, your way.</p>
                </div>
            </div>


        </div>
    )
}

export default Choose