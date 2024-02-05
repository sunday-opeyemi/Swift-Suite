import { Route, Routes } from 'react-router-dom'
import Rootlayout from './layout/Rootlayout'
import SignUp from './pages/SignUp'
import ErrorPage from './pages/Errorpage'
import EnterEmail from './pages/EnterEmail'







function App() {

  return (
  <>
      <Routes>
      <Route path='/'  element={<SignUp/>}/>
      <Route path='layout/*' element={<Rootlayout/>}/>
      <Route path='/enteremail'  element={<EnterEmail/>}/>
      <Route path="*" element={<ErrorPage/>}/>
    </Routes>
  </>
  )
}

export default App
