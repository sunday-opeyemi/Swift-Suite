import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import gif from '../Images/gif.gif'

const Product = () => {
  const store = useSelector((state) => state.vendor.productId);
  console.log(store);

  const productId = JSON.parse(localStorage.getItem('productId'))
  console.log(productId);

  const token = JSON.parse(localStorage.getItem('token'))
  console.log(token);

  const [loader, setLoader] = useState(true)


  const [userProduct, setUserProduct] = useState([])

  let endpoint = 'https://service.swiftsuite.app/vendor/view-all-products/46/'

  useEffect(() => {
    axios.get(endpoint, {
      headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },})
    .then((result)=>{
      console.log(result.data);
      setUserProduct(result.data)
      setLoader(false)
    })
    .catch((err)=>{
      console.log(err);
      setLoader(false)
    })
  }, [])
  
  return (
  
    <section className='bg-green-50 py-[5%]'>
    <div className='lg:ms-[24%]'>
      
      <>
      {loader && (
          <div className="flex justify-center items-center">
            <img
              src={gif}
              alt="Loading..."
              className="lg:ms-[-100px] border p-3 shadow-xl rounded-xl w-[50px] mt-10"
            />
          </div>
        )}
      {userProduct.length > 0 ? (
          userProduct.map((item, i) => (
            <div key={i} className='grid grid-cols-3 shadow-xl cursor-pointer rounded-xl bg-white mb-10 p-3'>
              <div>
              <img src={`https://www.lipseyscloud.com/images/${item.image}`} alt={item.image} className="w-[40%] mt-10  justify-center items-center rounded-md mx-auto object-cover"/>
              </div>
              <div>
              <p>ID: {item.id}</p>
              {/* <p>TITLE: {item.title}</p> */}
              <p>UPC: {item.upc}</p>
              <p>SKU: {item.sku}</p>
              {/* <p>MODEL: {item.model}</p> */}
              <p>PRICE: {item.price}</p>
              {/* {/* <p>QUANTITY: {item.quantity}</p> */}
              <p>MSRP: {item.msrp}</p>
              </div>
              <div>
              <p>MPN: {item.mpn}</p>
              <p>BRAND: {item.brand}</p>
              <p>CATEGORY: {item.category}</p>
              <p>DESCRIPTION: {item.detailed_description}</p>
              <p>SHIPPING WEIGHT: {item.shipping_weight}</p>
              {/* <p>SHIPPING HEIGHT: {item.shipping_height}</p>
              <p>SHIPPING WIDTH: {item.shipping_width}</p>
              <p>USER: {item.user}</p> */}
              </div>
            </div>
          ))
        ) : (
          <p className='text-black bg-green-50 h-screen text-xl lg:ms-[100px] w-[90%]'>No products available.</p>
        )
        }
      </>
    </div>
    </section>
   
  )
}

export default Product