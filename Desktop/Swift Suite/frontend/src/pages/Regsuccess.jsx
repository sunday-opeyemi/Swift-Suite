import React from 'react'
import sucImage from '../Images/suc.png'

const Regsuccess = () => {
  return (
    <>
    <div className="flex flex-col items-center justify-center  h-[85vh]" >
      <div className='my-2'>
            <img src={sucImage} alt=""  width={150}/>
      </div>
      <div className='my-4 font-bold'>
        <p>Registration Successful</p>
      </div>
      <div className='my-2  lg:w-[280px] md:w-[200px] w-[180px]'>
        <button className='bg-[#089451]  text-white font-bold py-1 w-full rounded'>Sign In</button>
      </div>
    </div>
    </>
  )
}

export default Regsuccess