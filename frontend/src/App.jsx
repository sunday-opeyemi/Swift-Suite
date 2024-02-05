import { Route, Routes } from 'react-router-dom'
import Rootlayout from './layout/Rootlayout'
import SignUp from './pages/SignUp'
import ErrorPage from './pages/Errorpage'
import Reset from './pages/Reset'
import EnterEmail from './pages/EnterEmail'
import Signin from './pages/Signin'






function App() {

  return (
  <>
      <Routes>

      <Route path='/'  element={<SignUp/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='layout/*' element={<Rootlayout/>}/>
      <Route path='/reset'  element={<Reset/>}/>
      <Route path='/enteremail' element={<EnterEmail/>}/>
      <Route path="*" element={<ErrorPage/>}/>
    </Routes>
  </>
  )
}

export default App
