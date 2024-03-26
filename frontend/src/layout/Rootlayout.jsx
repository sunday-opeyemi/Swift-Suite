import React, { useContext, useEffect } from 'react'
import Sidebar from '../Side/Sidebar'
import { AppContext } from '../context/Dashboard'
import Header from '../Nav/Header'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Product from '../pages/Product'
import Enrolment from '../Vendorenrolment/Enrolment'
import Catalogue from '../pages/Catalogue'
import Inventory from '../pages/Inventory'





const Rootlayout = ({children}) => {
  let navigate= useNavigate()
    const { sideBarOpen} = useContext(AppContext)
    // console.log(sideBarOpen);

    let token = JSON.parse(localStorage.getItem('token'))
    console.log(token);


    useEffect(() => {
      if(!token){
        navigate('/signin')
      }
    }, [])
    
    
  return (
    <>
    
    <div className="h-28 duration-200 ease-in-out z-1 bg-green-50" >
              <Header/>
              <div className="flex max-w-full">
                <Sidebar />
                <div className={`  ${!(sideBarOpen) ? 'md:ml-16' : 'md:ml-64'}  `}>
                <main className="py-4 flex-1 break-words">{children}</main>
                </div>
              </div>
        </div>


        

        <Routes>
          <Route path='/home' element={<Dashboard/>}/>
          <Route path='/product' element={<Product/>}/>
          <Route path='/catalogue' element={<Catalogue/>}/>
          <Route path='/inventory' element={<Inventory/>}/>
          <Route path='/enrolment' element={<Enrolment/>}/>
        </Routes>
   
    </>
  )
}

export default Rootlayout