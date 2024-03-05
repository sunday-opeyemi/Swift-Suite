import { checkbox } from '@nextui-org/react';
import React, { useState } from 'react'
import { IoIosArrowUp } from 'react-icons/io'
import { IoChevronDown } from 'react-icons/io5'


const Producttype = () => {
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




  const [checkBoxesProduct, setCheckBoxesProduct] = useState([
    { id: 1, label: 'RSR', checked: false },
    { id: 2, label: 'Shoes', checked: false },
    { id: 3, label: 'Heels', checked: false },
    { id: 4, label: 'Jackets', checked: false },

  ]);
  const [isChecked, setIsChecked] = useState(false);
  const [inventory, setInventory] = useState(false);
  const [order, setOrder] = useState(false);
  const [tracking, setTracking] = useState(false);

  console.log(isChecked);
  console.log(inventory);
  console.log(order);
  console.log(tracking);

  const [host, setHost] = useState(false)
  const [hostCategory, setHostCategory] = useState(false)
  const [brand, setBrand] = useState(false)


  // const onSubmit = (data) => {
  //   let form = { ...store, ...data }
  //   console.log(form);
  //   dispatch(handleNextStep(form))
  // }

  const SelectAll = (e) => {
    e.preventDefault()
    const updatedCheckboxes = checkboxes.map(checkbox => ({ ...checkbox, checked: true }));
    // console.log(checkboxes);
    setCheckboxes(updatedCheckboxes);
  };

  const DeselectAll = (e) => {
    e.preventDefault()
    const Deselect = checkboxes.map(checkbox => ({ ...checkbox, checked: false }));
    // console.log(Deselect);
    setCheckboxes(Deselect)
  };
  
  const handleCheckboxChange = (ids) => {
    if (!Array.isArray(ids)) {
        ids = [ids]; // Convert to array if single ID is provided
    }

    const updatedCheckboxes = checkboxes.map(checkbox => {
        if (ids.includes(checkbox.id)) {
            return { ...checkbox, checked: !checkbox.checked };
        }
        return checkbox;
    });

    setCheckboxes(updatedCheckboxes);

    ids.forEach(id => {
        const clickedCheckbox = updatedCheckboxes.find(checkbox => checkbox.id === id);
        if (clickedCheckbox) {
            console.log(clickedCheckbox.label + ': ' + clickedCheckbox.checked);
        } else {
            console.log('Checkbox not found');
        }
    });
};



const handleCheckboxProduct = (ids) => {
    if (!Array.isArray(ids)) {
        ids = [ids]; // Convert to array if single ID is provided
    }

    const updatedCheckboxes = checkBoxesProduct.map(checkbox => {
        if (ids.includes(checkbox.id)) {
            return { ...checkbox, checked: !checkbox.checked };
        }
        return checkbox;
    });

    setCheckBoxesProduct(updatedCheckboxes);
    ids.forEach(id => {
        const clickedCheckbox = updatedCheckboxes.find(checkbox => checkbox.id === id);
        if (clickedCheckbox) {
            console.log(clickedCheckbox.label + ': ' + clickedCheckbox.checked);
        } else {
            console.log('Checkbox not found');
        }
    });
};





  const toggleUp = () => {
    setHost(false);
  };

  const toggleDown = () => {
    setHost(true);
  };

  const toggleUpCategory = () => {
    setHostCategory(false);
  };

  const toggleDownCategory = () => {
    setHostCategory(true);
  };


  const toggleUpBrand = () => {
    setBrand(false);
  };

  const toggleDownBrand = () => {
    setBrand(true);
  };





  return (
    <>
      <section className='bg-blue-100 mb-10'>
        <form>

          <div className='bg-white lg:w-[100%] w-[130%] md:w-[90%] md:ms-[30%] lg:h-[20%] lg:ms-0 ms-3 py-10 lg:mt-8 mt-0'>
            <div>
              <h1 className='ms-5 lg:text-xl text-sm font-bold'>Product Type</h1>
              <div className='flex lg:ms-0 md:ms-0 ms-1 lg:gap-[32%] gap-8 md:gap-40 border-gray-300 border-b lg:p-5 p-4 focus:outline-border-gray-500'>
                <label className='mt-2 text-sm font-semibold h-8' htmlFor="">Select Products:</label>
                <div  className='border border-gray-500 rounded p-1 text-sm lg:pe-20 h-8 lg:w-[260px] w-[160px] md:w-[200px]'>
                <span className='text-gray-500 p-1'>Select Products</span>
                  <p className="mt-[-10%] cursor-pointer lg:ms-[130%] md:ms-[90%] ms-32 hover:text-green-700">
                    <span onClick={toggleUp} className={host ? '' : 'hidden'}>
                      <IoIosArrowUp   size={18}/>
                    </span>
                    <span onClick={toggleDown} className={host ? 'hidden' : ''}>
                      <IoChevronDown  size={18}/>
                    </span>
                  </p>
                  <div className={`p-2 mt-[-4%] ${host ? 'block' : 'hidden'}`}>
                    <div className='bg-white shadow-lg z-100 lg:w-[250px] md:w-[250px] w-[200px] lg:ms-[-10px] md:ms-[-20%] ms-[-20%] p-3 mt-2'>
                      <div className='flex gap-6'>
                        <button className='border border-[#089451] font-semibold py-1 lg:px-4 px-2 rounded' onClick={SelectAll}>Select All</button>
                        <button className='border border-[#089451] font-semibold py-1 lg:px-4 px-2 rounded' onClick={DeselectAll}>Deselect All</button>
                      </div>
                      <div className='p-2'>
                        {checkBoxesProduct.map(checkbox => (
                          <div className='flex justify-between' key={checkbox.id}>
                            {checkbox.label}
                            <input
                              type="checkbox"
                              checked={checkbox.checked}
                              onChange={() => handleCheckboxProduct(checkbox.id)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>



              
              <h1 className='ms-5 lg:text-xl font-bold mt-5'>Categories</h1>
              <div className='flex lg:gap-[30%] md:gap-[30%] lg:ms-0 md:ms-0 ms-1 gap-5 border-gray-300 border-b lg:p-5 p-4'>
                <label className=' text-sm font-semibold h-8' htmlFor="">Select Categories:</label>
                <div className={host ? '-z-1' : `border border-gray-500 rounded text-sm lg:pe-20 h-8 py-1 lg:w-[259px] w-[160px] md:w-[200px]`}>
                <span className={host ? 'hidden' : `text-gray-500 p-1`}>Select Categories</span>
                <p className="mt-[-10%] cursor-pointer lg:ms-[130%] md:ms-[90%] ms-[85%] hover:text-green-700">
                    <span onClick={toggleUpCategory} className={hostCategory ? '' : 'hidden'}>
                      <IoIosArrowUp className={host ? 'hidden' : ''} size={18}/>
                    </span>
                    <span onClick={toggleDownCategory} className={hostCategory ? 'hidden' : ''}>
                      <IoChevronDown className={host ? 'hidden' : ''} size={18}/>
                    </span>
                  </p>
                  <div className={`p-2 mt-[-4%] ${hostCategory ? 'block' : 'hidden'}`}>
                    <div className='bg-white shadow-lg z-100 lg:w-[250px] md:w-[250px] w-[200px] lg:ms-[-10px] md:ms-[-20%] ms-[-20%] p-3 mt-2'>
                      <div className='flex gap-6'>
                        <button className='border border-[#089451] font-semibold py-1 lg:px-4 px-2 rounded' onClick={SelectAll}>Select All</button>
                        <button className='border border-[#089451] font-semibold py-1 lg:px-4 px-2 rounded' onClick={DeselectAll}>Deselect All</button>
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
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              
              <h1 className='ms-5 mt-5 lg:text-xl font-bold'>Brand</h1>
              <div className='flex lg:gap-[36%] lg:ms-0 md:ms-0 ms-1 gap-12 md:gap-[36%] border-gray-300 border-b lg:p-5 p-4'>
                <label className='mt-2 text-sm font-semibold h-8' htmlFor="">Select Brand:</label>
                <div className={(host || hostCategory) ? '-z-1' : `border border-gray-500 rounded text-sm lg:pe-20 h-8 lg:w-[260px] py-1  w-[160px] md:w-[200px]`}>
                <span className={(host || hostCategory) ? 'hidden' : `text-gray-500 p-1`}>Select Brand</span>
                <p className="mt-[-10%] cursor-pointer lg:ms-[130%] md:ms-[90%] ms-32 hover:text-green-700">
                <span onClick={toggleUpBrand} className={brand ? '' : 'hidden'}>
                  <IoIosArrowUp  className={(host || hostCategory) ? 'hidden' : ''} size={18}/>
                </span>
                <span onClick={toggleDownBrand} className={brand ? 'hidden' : ''}>
                  <IoChevronDown className={(host || hostCategory) ? 'hidden' : ''} size={18}/>
                </span>
              </p>
              <div className={`p-2 mt-[-4%] ${brand ? 'block' : 'hidden'}`}>
                    <div className='bg-white shadow-lg z-100 lg:w-[250px] md:w-[250px] w-[200px] lg:ms-[-10px] md:ms-[-20%] ms-[-20%] p-3 mt-2'>
                      <div className='flex gap-6'>
                        <button className='border border-[#089451] font-semibold py-1 lg:px-4 px-2 rounded' onClick={SelectAll}>Select All</button>
                        <button className='border border-[#089451] font-semibold py-1 lg:px-4 px-2 rounded' onClick={DeselectAll}>Deselect All</button>
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>




              <h1 className='ms-5 lg:text-xl font-bold mt-2'>Pricing Option</h1>
              <div className='flex justify-between mt-5 px-5'>
                <h3 className='mt-2 text-sm font-semibold h-[35px] w-[55%] lg:w-[50%]'>Percentage Markup:</h3>
                <input type="text" className={brand || hostCategory ? 'hidden' : `border h-[35px] w-[55%] lg:w-[50%] border-gray-500 focus:outline-none py-1 rounded`} />
              </div>
              <div className='flex justify-between mt-5 px-5'>
                <h3 className='mt-2 text-sm font-semibold h-[35px] w-[55%] lg:w-[50%]'>Fixed Markup:</h3>
                <input type="text" className={brand || hostCategory ? 'hidden' : `border h-[35px] w-[55%] lg:w-[50%] border-gray-500 focus:outline-none py-1 rounded`} />
              </div>
              <div className='flex justify-between mt-5 px-5'>
                <h3 className='mt-2 text-sm font-semibold h-[35px] w-[55%] lg:w-[50%]'>Shipping Cost:</h3>
                <input type="text" className={ brand ? 'hidden' : `border h-[35px] w-[55%] lg:w-[50%] border-gray-500 focus:outline-none py-1 rounded`} />
              </div>
              <div className='flex gap-5 lg:gap-0 border-b md:gap-[70px] mt-5 h-10 px-5'>
                <h3 className='text-sm font-semibold'>Use Shipping Cost Average:</h3>
                <input type="checkbox" onChange={() => setIsChecked(!isChecked)} checked={isChecked} className='lg:mt-0 mt-2 md:mt-2 border h-[20px] w-[15%] lg:w-[40%] border-gray-500 focus:outline-none py-1 rounded' />
              </div>

              <h1 className='ms-5 lg:text-xl font-bold mt-10'>Inventory</h1>
              <div className='flex justify-between mt-5 px-5'>
              <h3 className='mt-2 text-sm font-semibold h-[35px] w-[55%] lg:w-[50%]'>Stock Minimum:</h3>
              <input type="text" className='border h-[35px] w-[55%] lg:w-[50%] border-gray-500 focus:outline-none py-1 rounded' />
            </div>
            <div className='flex justify-between mt-5 px-5 pb-5 border-b'>
              <h3 className='mt-2 text-sm font-semibold h-[35px] w-[55%] lg:w-[50%]'>Stock Maximum:</h3>
              <input type="text" className='border h-[35px] w-[55%] lg:w-[50%] border-gray-500 focus:outline-none py-1 rounded' />
            </div>
            <div className='flex gap-20 lg:gap-14 md:gap-[142px] mt-5 h-10 px-5'>
                <h3 className='text-sm font-semibold'>Update Inventory:</h3>
                <input type="checkbox" onChange={()=>setInventory(!inventory)} checked={inventory} className='lg:mt-0 mt-2 md:mt-2 border h-[20px] w-[15%] lg:w-[40%] border-gray-500 focus:outline-none py-1 rounded' />
              </div>
              <div className='flex gap-[38%] lg:gap-[90px] md:gap-[175px] mt-5 h-10 px-5'>
                <h3 className='text-sm font-semibold'>Send Orders:</h3>
                <input type="checkbox" onChange={() => setOrder(!order)} checked={order}  className='lg:mt-0 mt-2 md:mt-2 border h-[20px] w-[15%] lg:w-[40%] border-gray-500 focus:outline-none py-1 rounded' />
              </div>
              <div className='flex gap-[30%] lg:gap-[65px] md:gap-[150px] mt-5 h-10 px-5'>
                <h3 className='text-sm font-semibold'>Update Tracking:</h3>
                <input type="checkbox" onChange={()=> setTracking(!tracking)} checked={tracking}  className='lg:mt-0 mt-2 md:mt-2 border h-[20px] w-[15%] lg:w-[40%] border-gray-500 focus:outline-none py-1 rounded' />
              </div>
            </div>
          </div>
        </form>
      </section>
    </>

  );
};

export default Producttype