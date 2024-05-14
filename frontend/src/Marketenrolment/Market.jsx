import React from 'react'
import Shopify from './Shopify';
import Ebay from './Ebay';
import Amazon from './Amazon';
import Woocommerce from './Woocommerce';
import Walmart from './Walmart';



const Market = () => {
  const marketPlace = JSON.parse(localStorage.getItem('marketPlace'));
//   console.log(marketPlace);

 
  return (
    <section className='bg-green-50'>
    <div className='lg:ms-[32%] lg:me-[15%] pb-10'>
          {(marketPlace === 'shopify' ? <Shopify /> : marketPlace === 'ebay' ? <Ebay />  : marketPlace === 'amazon' ? <Amazon />  : marketPlace === 'walmart' ? <Walmart />  :  <Woocommerce />)}
        </div>
    </section>
  )
}

export default Market