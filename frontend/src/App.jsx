import { Route, Routes } from 'react-router-dom'
import Rootlayout from './layout/Rootlayout'
import SignUp from './pages/SignUp'
import ErrorPage from './pages/Errorpage'
import EnterEmail from './pages/EnterEmail'
import Signin from './pages/Signin'
import Reset from './pages/Reset'
import Landingpage from './landingpage/Landingpage'
import Regsuccess from './pages/Regsuccess'
import PassSuccess from './pages/PassSuccess'
import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Upbar from './components/Upbar'
import Auth from './pages/Auth'
import Api from './Vendorenrolment/Api'
import StateAPi from './Vendorenrolment/StateAPi'






function App() {
  const [isOpen, setIsOpen] = useState(false)


  const toggleIsOpen = () => {
    setIsOpen(!isOpen)
  }

  const handleClose = () => {
    setIsOpen(false)
  }
  return (
  <> 
  <div className='font-[Mirza]'>
      <Navbar openToggle={toggleIsOpen}/>
      {isOpen && <Upbar onClickHandler={handleClose} />}
      <Routes>
      <Route path='/'  element={<Landingpage/>}/>
      <Route path='/signup'  element={<SignUp/>}/>
      <Route path='layout/*' element={<Rootlayout/>}/>
      <Route path='/signin'  element={<Signin/>}/>
      <Route path='/enteremail'  element={<EnterEmail/>}/>
      <Route path='/reset'  element={<Reset/>}/>
      <Route path='/success'  element={<Regsuccess/>}/>
      <Route path='passreg'   element={<PassSuccess/>}/>
      <Route path='/auth'   element={<Auth/>}/>
      <Route path='/api'   element={<Api/>}/>
      <Route path='/state'   element={<StateAPi/>}/>
      <Route path="*" element={<ErrorPage/>}/>
    </Routes>
  </div>
  </>
  )
}

export default App
