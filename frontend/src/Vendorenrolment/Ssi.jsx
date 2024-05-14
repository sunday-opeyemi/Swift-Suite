import React, { useEffect, useState } from 'react'
import { IoIosArrowUp } from 'react-icons/io'
import { IoChevronDown } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { handleNextStep, handlePreviousStep } from '../redux/vendor';
import { useNavigate } from 'react-router-dom';




const Cwr = () => {
  const store = useSelector(state => state.vendor.vendorData)

  const vendorName = JSON.parse(localStorage.getItem('vendorName'));
//   console.log(vendorName);

const navigate = useNavigate()

  const [checkBoxesCategory, setCheckBoxesCategory] = useState([
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
  const [inventory, setInventory] = useState(false);
  const [order, setOrder] = useState(false);
  const [tracking, setTracking] = useState(false);


  const [host, setHost] = useState(false)
  const [hostCategory, setHostCategory] = useState(false)

  const Schema = yup.object().shape({
    percentagemarkup: yup.string().required(),
    fixedmarkup: yup.string().required(),
    shippingcost: yup.string().required(),
    stockminimum: yup.string().required(),
    stockmaximum: yup.string().required(),
    costaverage: yup.string(),
    inventory: yup.string(),
    order: yup.string(),
    tracking: yup.string(),

  })

  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: yupResolver(Schema)
  })


  const handleCheckBoxCategory = (ids) => {
    if (!Array.isArray(ids)) {
      ids = [ids]; // Convert to array if single ID is provided
    }

    const updatedCheckboxes = checkBoxesCategory.map(checkbox => {
      if (ids.includes(checkbox.id)) {
        return { ...checkbox, checked: !checkbox.checked };
      }
      return checkbox;
    });

    setCheckBoxesCategory(updatedCheckboxes);
    const category = updatedCheckboxes.filter(checkbox => checkbox.checked).map(checkbox => checkbox.label);
    console.log(category);
    setCategoryChecked(category)
  };


  const selectallCategory = (e) => {
    e.preventDefault();
    const updatedCheckboxes = checkBoxesCategory.map(checkbox => ({ ...checkbox, checked: true }));
    setCheckBoxesCategory(updatedCheckboxes);
    const theSelectedCategories = updatedCheckboxes.filter(checkbox => checkbox.checked).map(checkbox => checkbox.label);
    setCategoryChecked(theSelectedCategories);
  };



  const deselectallCategory = (e) => {
    e.preventDefault()
    const deselect = checkBoxesCategory.map(checkbox => ({ ...checkbox, checked: false }));
    console.log(deselect);
    setCheckBoxesCategory(deselect)
  };




  const toggleUp = () => {
    setHost(false);
  };

  const toggleDown = () => {
    setHost(true);
  };

  let dispatch = useDispatch();

  const onSubmit = (data) => {
    // const formData = { ...store, ...data, selectedProducts, selectedCategories, selectedBrand, productChecked, categoryChecked, brandChecked };
    const formData = { ...store, ...data, categoryChecked };
    // console.log(formData);
    dispatch(handleNextStep(formData));
  };



  const handlePrevious=()=>{
    dispatch(handlePreviousStep())
  }
  return (
    <>
      <section className='bg-green-50 mb-10'>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className='bg-white lg:w-[100%] w-[130%] md:w-[90%] md:ms-[30%] lg:h-[20%] lg:ms-0 ms-3 py-10 lg:mt-8 mt-0'>
            <div>
              <h1 className='ms-5 lg:text-xl text-sm font-bold'>Product Type</h1>
            
              <div className='flex lg:ms-0 md:ms-0 ms-1 gap-[30%] md:gap-[21%] border-gray-300 border-b lg:p-5 p-4 focus:outline-border-gray-500'>
                <label className='mt-2 text-sm font-semibold h-8 md:w-[140px]' htmlFor="">Categories:</label>
                <div className='border border-gray-500 rounded p-1 text-sm lg:pe-20 h-8 lg:w-[230px] w-[160px] md:w-[200px]'>
                  <span className='text-gray-500 p-1'>Select Categories</span>
                  <p className="mt-[-10%] cursor-pointer lg:ms-[130%] md:ms-[90%] ms-32 hover:text-green-700">
                    <span onClick={toggleUp} className={host ? '' : 'hidden'}>
                      <IoIosArrowUp size={18}  />
                    </span>
                    <span onClick={toggleDown} className={host ? 'hidden' : ''}>
                      <IoChevronDown size={18}  className={(hostCategory) ? 'hidden' : 'block'}/>
                    </span>
                  </p>
                  <div className={`p-2 mt-[-4%] ${host ? 'block' : 'hidden'}`}>
                    <div className='bg-white shadow-lg z-100 lg:w-[250px] md:w-[250px] w-[200px] lg:ms-[-10px] md:ms-[-20%] ms-[-20%] p-3 mt-2'>
                      <div className='flex gap-6'>
                        <button className='border border-[#089451] font-semibold py-1 lg:px-4 px-2 rounded' onClick={selectallCategory}>Select All</button>
                        <button className='border border-[#089451] font-semibold py-1 lg:px-4 px-2 rounded' onClick={deselectallCategory}>Deselect All</button>
                      </div>
                      <div className='p-2'>
                        {checkBoxesCategory.map(checkbox => (
                          <div className='flex justify-between' key={checkbox.id}>
                            {checkbox.label}
                            <input
                              type="checkbox"
                              checked={checkbox.checked}
                              onChange={() => handleCheckBoxCategory(checkbox.id)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>


              <h1 className='ms-5 lg:text-xl font-bold mt-5'>Pricing Option</h1>
              <div>
                <div className='flex  mt-5 px-5'>
                  <h3 className='mt-2 text-sm font-semibold h-[35px] w-[55%] md:w-[52%] lg:w-[50%]'>Percentage Markup:</h3>
                  <input {...register("percentagemarkup")} type="text" className={host ? 'hidden' : `border h-[35px] w-[55%] p-3 md:w-[201px] lg:w-[230px] border-gray-500 focus:outline-none py-1 rounded`} />
                </div>
                <small className='text-red-600 ms-[42%] lg:ms-[55%]'>{errors.percentagemarkup?.message}</small>
              </div>

              <div>
                <div className='flex mt-5 px-5'>
                  <h3 className='mt-2 text-sm font-semibold h-[35px] w-[55%] md:w-[52%] lg:w-[50%]'>Fixed Markup:</h3>
                  <input {...register("fixedmarkup")} type="text" className={host ? 'hidden' : `border h-[35px] w-[55%] p-3 lg:w-[230px] md:w-[201px] border-gray-500 focus:outline-none py-1 rounded `} />
                </div>
                <small className='text-red-600 ms-[42%] lg:ms-[55%]'>{errors.fixedmarkup?.message}</small>
              </div>

              <div>
                <div className='flex mt-5 px-5'>
                  <h3 className='mt-2 text-sm font-semibold h-[35px] md:w-[52%] w-[55%] lg:w-[50%]'>Shipping Cost:</h3>
                  <input {...register("shippingcost")} type="text" className='border h-[35px] w-[55%] lg:w-[230px] p-3 md:w-[201px] border-gray-500 focus:outline-none py-1 rounded' />
                </div>
                <small className='text-red-600 ms-[42%] lg:ms-[55%]'>{errors.shippingcost?.message}</small>
              </div>
              <div className='flex gap-5 lg:gap-2 border-b md:gap-[70px] mt-5 h-10 px-5'>
                <h3 className='text-sm font-semibold'>Use Shipping Cost Average:</h3>
                <input {...register("costaverage")} type="checkbox" onChange={() => setIsChecked(!isChecked)} checked={isChecked} className='lg:mt-0 mt-2 md:mt-2 border h-[20px] w-[15%] lg:w-[40%] border-gray-500 focus:outline-none py-1 rounded' />
              </div>

              <h1 className='ms-5 lg:text-xl font-bold mt-5'>Inventory</h1>
              <div>
                <div className='flex mt-5 px-5'>
                  <h3 className='mt-2 text-sm font-semibold h-[35px] w-[55%] md:w-[52%] lg:w-[50%]'>Stock Minimum:</h3>
                  <input {...register("stockminimum")} type="text" className='border h-[35px] w-[55%] md:w-[201px] lg:w-[230px] border-gray-500 focus:outline-none p-3 py-1 rounded' />
                </div>
                <small className='text-red-600 ms-[42%] lg:ms-[55%]'>{errors.stockminimum?.message}</small>
              </div>

              <div>
                <div className='flex  mt-5 px-5 pb-5 border-b'>
                  <h3 className='mt-2 text-sm font-semibold h-[35px] w-[55%] md:w-[52%] lg:w-[50%]'>Stock Maximum:</h3>
                  <input {...register("stockmaximum")} type="text" className='border h-[35px] w-[55%] md:w-[201px] lg:w-[230px] border-gray-500 focus:outline-none p-3 py-1 rounded' />
                </div>
                <small className='text-red-600 ms-[42%] lg:ms-[55%]'>{errors.stockmaximum?.message}</small>
              </div>


              <h1 className='ms-5 lg:text-xl font-bold mt-5'>Integration Settings</h1>
              <div className='flex gap-20 md:gap-[70px] mt-5 h-10 px-5'>
                <h3 className='text-sm font-semibold md:w-[100px] w-[100px]'>Update Inventory:</h3>
                <input type="checkbox" {...register("inventory")} onChange={() => setInventory(!inventory)} checked={inventory} className='lg:mt-0 mt-2 md:mt-2 border h-[20px] w-[15%] lg:w-[40%] border-gray-500 focus:outline-none py-1 rounded' />
              </div>
              <div className='flex gap-20  md:gap-[70px]  mt-5 h-10 px-5'>
                <h3 className='text-sm font-semibold md:w-[100px] w-[100px]'>Send Orders:</h3>
                <input type="checkbox" {...register("orders")} onChange={() => setOrder(!order)} checked={order} className='lg:mt-0 mt-2 md:mt-2 border h-[20px] w-[15%] lg:w-[40%] border-gray-500 focus:outline-none py-1 rounded' />
              </div>
              <div className='flex gap-20 md:gap-[70px] mt-5 h-10 px-5'>
                <h3 className='text-sm font-semibold md:w-[100px] w-[100px]'>Update Tracking:</h3>
                <input type="checkbox" {...register("tracking")} onChange={() => setTracking(!tracking)} checked={tracking} className='lg:mt-0 mt-2 md:mt-2 border h-[20px] w-[15%] lg:w-[40%] border-gray-500 focus:outline-none py-1 rounded' />
              </div>
              <div className='flex gap-20 justify-center my-5'>
            <button type='submit' onClick={handlePrevious} className='bg-white text-[#089451] border py-1 px-3 rounded hover:bg-[#089451] font-bold hover:text-white border-[#089451]'>Previous</button>
              <button type='submit' className='bg-[#089451] text-white border py-1 px-5 rounded hover:bg-white font-bold hover:text-[#089451] border-[#089451]'>Submit</button>
            </div>
            </div>
          </div>
        </form>
      </section>
    </>

  );
};

export default Cwr