import React, { useContext } from 'react'

import Sidebar from '../Side/Sidebar'
import { AppContext } from '../context/Dashboard'

import Header from '../Nav/Header'
import { Route, Routes } from 'react-router-dom'
// import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import Allapp from '../pages/Allapp'
// import Allapp from '../pages/Allapp'
// import Authentication from '../pages/Authentication'




const Rootlayout = ({children}) => {
    const { sideBarOpen} = useContext(AppContext)
    console.log(sideBarOpen);


    
  return (
    <>
    
    <div className="h-28 duration-200 ease-in-out z-1 bg-blue-100" >
              
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
          <Route path='/allapp' element={<Allapp/>}/>
         
        </Routes>
   
    </>
  )
}

export default Rootlayout