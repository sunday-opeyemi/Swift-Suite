import React from 'react'

const Fpicredential = () => {
  return (
    <>
      <div className='bg-white h-full py-3 shadow'>
          <section>
              <h1 className='ps-16 py-2 border-b border-gray-500 font-bold '>FTP/API Credentials</h1>
              <form action="" className='lg:mx-20  mx-10'>
                <div className='flex justify-between my-5'> 
                  <h3 className='font-semibold'>FTP Username:</h3>
                  <input type="text" className='border border-black focus:outline-none py-1 rounded'/>
                </div>
                <div className='flex justify-between my-5'>
                  <h3 className='font-semibold'>FTP Password:</h3>
                  <input type="text" className='border border-black focus:outline-none py-1 rounded' />
                </div>
                <div className='flex flex-col my-10 gap-5 w-1/2 mx-auto'>
                  <button className='bg-[#089451] text-white font-semibold py-1 rounded'>Test Connect</button>
                  <button className='border border-[#089451] font-semibold py-1 rounded'>Next</button>
                </div>
              </form>
          </section>
      </div>
    </>
  )
}

export default Fpicredential