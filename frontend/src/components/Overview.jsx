import React from 'react';

const Overview = () => {
  const womenPercentage = 80;
  const menPercentage = 30;
  const kidsPercentage = 20;

  return (
    <section className='rounded-lg p-5 h-[100%] lg:h-[100%] bg-white shadow-lg'>
      <div style={{ position: 'relative' }}>
        <p className='font-bold text-xl '>Stats Overview</p>
        <p className=' mt-2'>Information about store visits</p>
        <div style={{ padding: '20px' }}>
          <h1 className=' mt-5'>Women</h1>
          <div
            className='lg:w-[430px] md:w-[500px] w-[220px]'
            style={{
              height: '10px',
              backgroundColor: 'gray',
              margin: '2px',
              borderRadius: '10px',
              border: '1px solid gray',
              position: 'absolute',
              top: '130px',
            }}
          ></div>
          <div
            className='lg:w-[380px] md:w-[250px] w-[180px]'
            style={{
              height: '10px',
              backgroundColor: 'green',
              margin: '2px',
              borderRadius: '10px',
              position: 'absolute',
              zIndex: 1,
              top: '130px',
            }}
          ></div>

          <h1 className='mt-10'>Men</h1>
          <div
            className='lg:w-[430px] md:w-[300px] w-[220px]'
            style={{
              height: '10px',
              backgroundColor: 'gray',
              margin: '2px',
              borderRadius: '10px',
              border: '1px solid #ccc',
              position: 'absolute',
              top: '190px',
            }}
          ></div>
          <div
            className='lg:w-[250px] md:w-[150px] w-[100px]'
            style={{
              height: '10px',
              backgroundColor: 'orange',
              margin: '2px',
              borderRadius: '10px',
              position: 'absolute',
              zIndex: 1,
              top: '190px',
            }}
          ></div>

          <h1 className='mt-10'>Kids</h1>
          <div
            className='lg:w-[430px] md:w-[300px] w-[200px]'
            style={{
              height: '10px',
              backgroundColor: 'gray',
              margin: '2px',
              borderRadius: '10px',
              border: '1px solid #ccc',
              position: 'absolute',
              top: '250px',
            }}
          ></div>
          <div
            className='lg:w-20 md:w-10 w-[50px]'
            style={{
              height: '10px',
              backgroundColor: 'green',
              margin: '2px',
              borderRadius: '10px',
              position: 'absolute',
              zIndex: 1,
              top: '250px',
            }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
