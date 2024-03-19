import React from 'react'
import feat5 from "../Images/feat5.png"
import feat1 from "../Images/feat1.png"
import feat2 from "../Images/feat2.png"
import feat4 from "../Images/feat4.png"
import feat3 from "../Images/feat3.png"





const Features = () => {
    return (
        <section className=''>
            <div className='text-center mt-8 text-2xl font-bold'>Key Features</div>
            <div className='grid lg:grid-cols-2 grid-cols-1 md:grid-cols-2 lg:px-[24%] lg:gap-20 md:gap-28 p-10 lg:p-10'>
            <div className='flex flex-col justify-center'>
                    <img className='lg:w-[86%]' src={feat5} alt="" />
                </div>
                <div className='m-0'>
                    <h2 className='font-bold lg:mt-0 mb-4 text-xl'>Full Product Data Integration</h2>
                    <p>Automatically upload comprehensive product data various suppliers into  your eCommerce store. Effortlessly  manages images, descriptions and other  essential details.</p>
                </div>
            </div>
            <div className='grid lg:grid-cols-2 grid-cols-1 md:grid-cols-2 md:gap-28 lg:gap-10 lg:px-[24%] px-10 lg:p-10 border'>
                <div>
                    <h2 className='font-bold lg:mt-0 text-xl py-5'>Intelligent Order Routing</h2>
                    <p className=''>Streamline Order processing by automatically routing orders to the   best-suited supplier. Our intelligent system  ensures orders are directed to suppliers   with the product in stock and the lowest  cost.</p>
                </div>
                <div className='flex flex-col justify-center'>
                    <img className='lg:w-[86%] lg:ms-20 lg:mt-0 mt-5' src={feat1} alt="" />
                </div>
            </div>

            <div className='grid lg:grid-cols-2 grid-cols-1 md:grid-cols-2 md:gap-28 lg:gap-20 lg:px-[24%] p-10 lg:p-10'>
            <div className='flex flex-col justify-center'>
                    <img className='lg:w-[86%]' src={feat2} alt="" />
                </div>
                <div>
                    <h2 className='font-bold lg:mt-0 mt-4 text-xl my-5'>Synchronized Inventory Management</h2>
                    <p>Keep your Inventory in Sync with allvendors. Swift Suite processes feeds from suppliers and updates your inventory in real time, ensuring accurate stock levels across all platforms.</p>
                </div>
            </div>
            <div className='grid lg:grid-cols-2 grid-cols-1 md:grid-cols-2 md:gap-28 lg:gap-10 lg:px-[24%] px-10 lg:p-10'>
                <div>
                    <h2 className='font-bold lg:mt-0 text-xl py-5'>Automated Order Processing</h2>
                    <p>Automate the orders to vendors,  distributors, suppliers or fulfillment  centers, whether through email, EDI,  FTP, CSV, XML, etc.  Swift Suite  supports any format  your vendor requires.</p>
                </div>
                <div className='flex flex-col justify-center'>
                    <img className='lg:w-[86%] lg:ms-20 lg:mt-0 mt-5' src={feat4} alt="" />
                </div>
            </div>
            <div className='grid lg:grid-cols-2 grid-cols-1 md:grid-cols-2 md:gap-28 lg:gap-20 lg:px-[24%] p-10 lg:p-10'>
            <div className='flex flex-col justify-center'>
                    <img className='lg:w-[86%]' src={feat3} alt="" />
                </div>
                
                <div>
                    <h2 className='font-bold lg:mt-0 mt-4 text-xl py-5'>Multiple Supplier Integration</h2>
                    <p>Connect one product to multiple  <br />suppliers and intelligently route orders <br />to the best possible. This ensures optimal <br />fulfillment and customer satisfaction.</p>
                </div>
            </div>

        </section>
    )
}

export default Features