import React from 'react'
import sarah from '../Images/sarah.png'
import mike from '../Images/mike.png'
import lisa from '../Images/lisa.png'



const Testimonials = () => {
    return (
        <div className='mb-10'>
            <h1 className='text-center p-2 font-[font-PlayfairDisplay] text-2xl mt-10 font-bold'>Customers Testimonials</h1>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 p-5 lg:px-20'>
                <div className='border font-[font-PlayfairDisplay] border-white shadow-lg p-5 px-[12%]'>
                    <div className='flex gap-5'>
                        <img className='w-[17%] h-[55px]' src={sarah} alt="" />
                        <div>
                            <p className='font-bold'>Sarah T</p>
                            <p>Small Business Owner</p>
                        </div>
                    </div>
                    <p className='mt-5'>As a small business owner, time is my worst valuable asset. Swift Suite has simplified our catalogue management and made tracking inventory a breeze. The support team is responsive and always ready to help. Highly recommended!</p>
                </div>


                <div className='border font-[font-PlayfairDisplay] border-white shadow-lg p-5 px-[12%]'>
                <div className='flex gap-5'>
                    <img className='w-[17%] h-[55px]' src={mike} alt="" />
                    <div>
                        <p className='font-bold'>Mike G</p>
                        <p>Logistics Manager</p>
                    </div>
                </div>
                <p className='mt-5'>The scalability of Swift Suite is unmatched. It seamlessly adapts to our growth, providing unparallel insights. The dashboard has transformed the way we approach logistics, making daily operations smoother than ever.</p>
            </div>


            <div className='border font-[font-PlayfairDisplay] border-white shadow-lg p-5 px-[12%]'>
            <div className='flex gap-5'>
                <img className='w-[17%] h-[55px]' src={lisa} alt="" />
                <div>
                    <p className='font-bold'>Lisa M</p>
                    <p> Online Retailer</p>
                </div>
            </div>
            <p className='mt-5'>Swift Suite is a game changer in our industry. The level of details in the reports is unparalleled, guiding our strategic planning. The user-friendly interface has streamlined our processes and positively impacted our day-day efficiency.</p>
        </div>
            </div>
        </div>
    )
}

export default Testimonials