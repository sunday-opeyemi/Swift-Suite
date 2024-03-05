import React, { useState } from 'react'
import { IoIosArrowUp } from 'react-icons/io'
import { IoChevronDown } from 'react-icons/io5'


const Cataloguefilter = () => {
  const [checkboxes, setCheckboxes] = useState([
    { id: 1, label: 'RSR', checked: false },
    { id: 2, label: 'Shoes', checked: false },
    { id: 3, label: 'Heels', checked: false },
    { id: 4, label: 'Jackets', checked: false },
    { id: 5, label: 'Stationeries', checked: false },
    { id: 6, label: 'Shoes', checked: false },
    { id: 7, label: 'Shoes', checked: false },
    { id: 8, label: 'Glasses', checked: false },
  ]);
  const [isChecked, setIsChecked] = useState(false);
  console.log(isChecked);
  const [host, setHost] = useState(false)

  // const onSubmit = (data) => {
  //   let form = { ...store, ...data }
  //   console.log(form);
  //   dispatch(handleNextStep(form))
  // }

  const SelectAll = (e) => {
    e.preventDefault()
    const updatedCheckboxes = checkboxes.map(checkbox => ({ ...checkbox, checked: true }));
    // console.log(updatedCheckboxes);
    setCheckboxes(updatedCheckboxes);
  };

  const handleCheckboxChange = (id) => {
    console.log(id);
    // checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox: In this part, it checks if the id of the current checkbox is equal to the id being searched for.
    // If it is, a new checkbox object is created with all the properties of the current checkbox 
    // // each item has id and once clicked it generates an id. so here we check if the id are the same
    const updatedCheckboxes = checkboxes.map(checkbox => checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox
    );
    setCheckboxes(updatedCheckboxes);
  };

  const DeselectAll = (e) => {
    e.preventDefault()
    const Deselect = checkboxes.map(checkbox => ({ ...checkbox, checked: false }));
    // console.log(Deselect);
    setCheckboxes(Deselect)
  };



  const toggleUp = () => {
    setHost(false);
  };

  const toggleDown = () => {
    // setHosting(false);
    setHost(true);
  };





  return (
    <>
      <section className='bg-blue-100 mb-10'>
        <form>

          <div className='bg-white lg:w-[100%] w-[130%] md:w-[90%] md:ms-[30%] lg:h-[20%] lg:ms-0 ms-3 py-10 lg:mt-8 mt-0'>
            <div>
              <h1 className='ms-5 lg:text-xl text-sm font-bold'>Product Type</h1>
              <div className='flex lg:ms-0 md:ms-0 ms-1 lg:gap-48 gap-10 md:gap-40 border-gray-300 border-b lg:p-5 p-4 focus:outline-border-gray-500'>
                <label className='mt-2 text-sm font-semibold' htmlFor="">Select Products:</label>
                <div className='border border-gray-500 rounded-lg text-sm lg:pe-20 h-8 lg:w-[220px] w-[150px] md:w-[200px]'>


                  <p className="mt-2 cursor-pointer lg:ms-48 md:ms-[90%] ms-32 hover:text-green-700">
                    <span onClick={toggleUp} className={host ? '' : 'hidden'}>
                      <IoIosArrowUp  />
                    </span>
                    <span onClick={toggleDown} className={host ? 'hidden' : ''}>
                      <IoChevronDown />
                    </span>
                  </p>


                  <div className={` p-2 mt-[-4%] ${host ? 'block' : 'hidden'}`}>

                    <div className='bg-white shadow-lg z-100 lg:w-[250px] md:w-[250px] w-[200px] lg:ms-[-20px] md:ms-[-20%] ms-[-20%] p-3 mt-2'>
                      <div className='flex gap-6'>
                        <button className='border border-[#089451] font-semibold py-1 lg:px-3 px-2 rounded' onClick={SelectAll}>SelectAll</button>
                        <button className='border border-[#089451] font-semibold py-1 lg:px-3 px-2 rounded' onClick={DeselectAll}>DeselectAll</button>
                      </div>
                      <div className='p-2'>
                        {checkboxes.map(checkbox => (
                          <div className='flex justify-between' key={checkbox.id}>
                            {checkbox.label}
                            <input
                              type="checkbox"
                              checked={checkbox.checked}
                              onChange={() => handleCheckboxChange(checkbox.id)}
                            />
                          </div>
                        ))}
                        <button type='submit' className='text-white lg:mt-5 md:mt-5 mt-1 bg-[#089451] font-semibold py-1 px-3 rounded'>submit</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h1 className='ms-5 lg:text-xl font-bold mt-5'>Categories</h1>
              <div className='flex lg:gap-48 lg:ms-0 md:ms-0 ms-1 gap-10 md:gap-40 border-gray-300 border-b lg:p-5 p-4'>
                <label className='mt-2 text-sm font-semibold' htmlFor="">Select Products:</label>
                <div className={host ? '-z-1' : `border border-gray-500 rounded-lg text-sm lg:pe-20 h-8 lg:w-[220px] w-[150px] md:w-[200px]`}>
                 
                </div>
              </div>
              <h1 className='ms-5 lg:text-xl font-bold mt-2'>Brand</h1>
              <div className='flex lg:gap-48 lg:ms-0 md:ms-0 ms-1 gap-10 md:gap-40 border-gray-300 border-b lg:p-5 p-4'>
                <label className='mt-2 text-sm font-semibold' htmlFor="">Select Products:</label>
                <div className={host ? '-z-1' : `border border-gray-500 rounded-lg text-sm lg:pe-20 h-8 lg:w-[220px] w-[150px] md:w-[200px]`}>
                 
                </div>
              </div>
              <h1 className='ms-5 lg:text-xl font-bold mt-2'>Pricing Option</h1>
              <div className='flex justify-between mt-5 px-5'>
                <h3 className='mt-2 text-sm font-semibold'>Percentage Markup:</h3>
                <input type="text" className='border h-[35px] w-[55%] lg:w-[50%] border-gray-500 focus:outline-none py-1 rounded' />
              </div>
              <div className='flex justify-between mt-5 px-5'>
                <h3 className='mt-2 text-sm font-semibold'>Fixed Markup:</h3>
                <input type="text" className='border h-[35px] w-[55%] lg:w-[50%] border-gray-500 focus:outline-none py-1 rounded' />
              </div>
              <div className='flex justify-between mt-5 px-5'>
                <h3 className='mt-2 text-sm font-semibold'>Shipping Cost:</h3>
                <input type="text" className='border h-[35px] w-[55%] lg:w-[50%] border-gray-500 focus:outline-none py-1 rounded' />
              </div>
              <div className='flex gap-5 lg:gap-0 md:gap-5 mt-5 px-5'>
                <h3 className='mt-2 text-sm font-semibold'>Use Shipping Cost Average:</h3>
                <input type="checkbox" onChange={() => setIsChecked(!isChecked)} checked={isChecked} className='lg:mt-0 mt-2 md:mt-2 border h-[20px] w-[15%] lg:w-[40%] border-gray-500 focus:outline-none py-1 rounded' />
              </div>
            </div>

          </div>

          <div className='bg-white lg:w-[400px] md:w-[300px] w-[270px] lg:ms-0 md:ms-[30%] ms-6 p-5 mt-10'>
            <div className='flex gap-6'>
              <button className='border border-[#089451] font-semibold py-1 lg:px-3 px-2 rounded' onClick={SelectAll}>SelectAll</button>
              <button className='border border-[#089451] font-semibold py-1 lg:px-3 px-2 rounded' onClick={DeselectAll}>DeselectAll</button>
            </div>
            <div className='p-2'>
              {checkboxes.map(checkbox => (
                <div className='flex justify-between' key={checkbox.id}>
                  {checkbox.label}
                  <input
                    type="checkbox"
                    checked={checkbox.checked}
                    onChange={() => handleCheckboxChange(checkbox.id)}
                  />
                </div>
              ))}
              <button type='submit' className='text-white mt-5 bg-[#089451] font-semibold py-1 px-3 rounded'>submit</button>
            </div>
          </div>
        </form>

      </section>
    </>

  );
};

export default Cataloguefilter