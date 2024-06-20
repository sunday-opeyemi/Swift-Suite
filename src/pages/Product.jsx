import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import gif from '../Images/gif.gif'
import { RiDeleteBin2Fill } from "react-icons/ri";
import { RiDeleteBin5Line } from "react-icons/ri";

const Product = () => {
  const store = useSelector((state) => state.vendor.productId);
  console.log(store);

  const productId = JSON.parse(localStorage.getItem('productId'))
  console.log(productId);

  const token = JSON.parse(localStorage.getItem('token'))
  console.log(token);

  const [loader, setLoader] = useState(true)
  const [emptyproduct, setEmptyproduct] = useState(false)


  const [userProduct, setUserProduct] = useState([])

  let endpoint = 'https://service.swiftsuite.app/vendor/view-all-products/46/'

  useEffect(() => {
    axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((result) => {
        if (result.data <= 0) {
          setEmptyproduct(true)
        } else {
          console.log(result.data);
          setUserProduct(result.data)
          setLoader(false)
        }

      })
      .catch((err) => {
        console.log(err);
        setLoader(false)
      })
  }, [])

  return (

    <section className='bg-green-50 py-[5%] h-full'>
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
          {userProduct.length && (
            userProduct.map((item, i) => (
              <div key={i} className='relative grid grid-cols-3 shadow-xl cursor-pointer rounded-xl bg-white mb-10 p-3 border-2 md:me-10 me-0 border-[#089451]'>
                <div>
                  <img src={`https://www.lipseyscloud.com/images/${item.image}`} alt={item.image} className="w-[40%] mt-8 rounded-md mx-auto" />
                </div>
                <div>
                  {/* <p>ID: {item.id}</p> */}
                  <p>TITLE: {item.title}</p>
                  <p>BRAND: {item.brand}</p>
                  <p>UPC: {item.upc}</p>
                  {/* <p>MODEL: {item.model}</p> */}
                  <p>PRICE: {item.price}</p>
                  {/* {/* <p>QUANTITY: {item.quantity}</p> */}
                  <p>MSRP: {item.msrp}</p>
                </div>
                <div>
                  <p>MPN: {item.mpn}</p>
                  <p>SKU: {item.sku}</p>
                  <p>CATEGORY: {item.category}</p>
                  <p>DESCRIPTION: {item.detailed_description}</p>
                  <p>SHIPPING WEIGHT: {item.shipping_weight}</p>
                  {/* <p>SHIPPING HEIGHT: {item.shipping_height}</p>
              <p>SHIPPING WIDTH: {item.shipping_width}</p>
              <p>USER: {item.user}</p> */}
                </div>
                <div className='absolute right-4 top-2 text-[#089451] text-xl'><RiDeleteBin5Line /></div>
              </div>
            ))
          )
          }
          {emptyproduct && <p className='text-black bg-green-50 h-screen text-xl lg:ms-[100px] w-[90%]'>No products available.</p>}
        </>
      </div>
    </section>

  )
}

export default Product