import React from 'react'
import Navbar from '../components/Navbar'
import Dropshipping from './Dropshipping'
import Features from './Features'
import Platforms from './Platforms'
import Choose from './Choose'
import Global from './Global'
import Pricing from './Pricing'

const Landingpage = () => {
  return (
    <div>
    <Navbar/>
    <Dropshipping/>
    <Features/>
    <Platforms/>
    <Choose/>
    <Global/>
    <Pricing/>
    </div>
  )
}

export default Landingpage