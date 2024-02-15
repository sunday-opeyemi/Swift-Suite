import { Route, Routes } from 'react-router-dom'
import Rootlayout from './layout/Rootlayout'
import SignUp from './pages/SignUp'
import ErrorPage from './pages/Errorpage'
import EnterEmail from './pages/EnterEmail'
import Signin from './pages/Signin'
import Reset from './pages/Reset'
import Landingpage from './landingpage/Landingpage'
<<<<<<< HEAD
=======
import Regsuccess from './pages/Regsuccess'
import PassSuccess from './pages/PassSuccess'
>>>>>>> f3777b94b4498370d7a37a80ee0e9f1b335fde42




function App() {

  return (
  <>
      <Routes>
      <Route path='/'  element={<Landingpage/>}/>
      <Route path='/signup'  element={<SignUp/>}/>
      <Route path='layout/*' element={<Rootlayout/>}/>
      <Route path='/signin'  element={<Signin/>}/>
      <Route path='/enteremail'  element={<EnterEmail/>}/>
      <Route path='/reset'  element={<Reset/>}/>
<<<<<<< HEAD
=======
      <Route path='/success'  element={<Regsuccess/>}/>
      <Route path='passreg'   element={<PassSuccess/>}/>
>>>>>>> f3777b94b4498370d7a37a80ee0e9f1b335fde42
      <Route path="*" element={<ErrorPage/>}/>
    </Routes>
  </>
  )
}

export default App
