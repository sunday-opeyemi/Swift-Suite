import React from 'react'
import Vendorenrolment from './Vendorenrolment'
import Fpicredential from './Fpicredential'
import Fpioption from './Fpioption'
import Cataloguefilter from './Cataloguefilter'
import { useSelector } from 'react-redux'

const Enrolment = () => {
  const currentIndex = useSelector(state => state.vendor.vendorData.currentStep)

  return (
    <section className='bg-blue-100 h-screen'>
    <div className='lg:ms-[20%]'>
     
      <div className='stepContainer'>
        {currentIndex === 0 &&
          (<Vendorenrolment />
          )}
        {currentIndex === 1 &&
          (<Fpicredential />
          )}
        {currentIndex === 2 &&
          (<Fpioption />
          )}
        {currentIndex === 3 &&
          (<Cataloguefilter />
          )}
          {currentIndex === 4 &&
            (<Thank />
            )}
      </div>
    </div>
    </section>
  )
}

export default Enrolment