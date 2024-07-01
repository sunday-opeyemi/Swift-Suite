import React from 'react'
import Lipsey from './Lipsey';
import Fragrancex from './Fragrancex';
import Zanders from './Zanders';
import Cwr from './Cwr';
import Ssi from './Ssi';
import Rsr from './Rsr';

const Editvendors = () => {
        const editVendor = JSON.parse(localStorage.getItem('editVendor'));
        // console.log(editVendor);

  return (
    <section className='bg-green-50'>
    <div className='lg:ms-[32%] lg:me-[15%] pb-10'>
          {(editVendor === 'Lipsey' ? <Lipsey /> : editVendor === 'Fragrancex' ? <Fragrancex /> : editVendor === 'Zanders' ? <Zanders/> : editVendor === 'CWR' ? <Cwr/> : editVendor === 'SSI' ? <Ssi/> : <Rsr />)}
    </div>
    </section>
  )
}

export default Editvendors