import React from 'react'
import { useNavigate } from 'react-router-dom';
// import Lipsey from './Lipsey';
// import Fragrancex from './Fragrancex';




const Productype = () => {
 

  const vendorName = JSON.parse(localStorage.getItem('vendorName'));
  console.log(vendorName);

  // const navigate = useNavigate()


  // useEffect(() => {
  //   if(vendorName === 'Lipseys'){
  //     navigate('/layout/lipseys')
  //   } else if (vendorName === 'FragranceX') {
  //     navigate('/layout/fragrancx')
  //   }
  // }, [vendorName])
  



  return (
    <>
    <div>Hello world</div>
    </>

  );
};

export default Productype