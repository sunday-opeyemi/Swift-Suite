import React, { useEffect, useState } from 'react'
import { IoIosArrowUp } from 'react-icons/io'
import { IoChevronDown } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { handleNextStep, handlePreviousStep } from '../redux/vendor';




const Zanders = () => {
  const store = useSelector(state => state.vendor.vendorData)

  const vendorName = JSON.parse(localStorage.getItem('vendorName'));
//   console.log(vendorName);




  const [checkBoxesManufacturer, setCheckBoxesManufacturer] = useState([
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
  const [hostManufacturer, setHostManufacturer] = useState(false)
  const [manufacturerChecked, setManufacturerChecked] = useState([])




  const Schema = yup.object().shape({
    percentagemarkup: yup.string().required(),
    fixedmarkup: yup.string().required(),
    shippingcost: yup.string().required(),
    stockminimum: yup.string().required(),
    stockmaximum: yup.string().required(),
    serialized: yup.string(),
    inventory: yup.string(),
    order: yup.string(),
    tracking: yup.string(),

  })

  const { register, handleSubmit, setValue, formState: { errors }, } = useForm({
    resolver: yupResolver(Schema)
  })

  useEffect(() => {
    if (store) {
      setValue("percentagemarkup", store.percentagemarkup)
      setValue("fixedmarkup", store.fixedmarkup)
      setValue("shippingcost", store.shippingcost)
      setValue("stockminimum", store.stockminimum)
      setValue("stockmaximum", store.stockmaximum)
    }
  }, [])




  const handleCheckBoxManufacturer = (ids) => {
    if (!Array.isArray(ids)) {
      ids = [ids]; // Convert to array if single ID is provided
    }

    const updatedCheckboxes = checkBoxesManufacturer.map(checkbox => {
      if (ids.includes(checkbox.id)) {
        return { ...checkbox, checked: !checkbox.checked };
      }
      return checkbox;
    });

    setCheckBoxesManufacturer(updatedCheckboxes);
    const manufacturer = updatedCheckboxes.filter(checkbox => checkbox.checked).map(checkbox => checkbox.label);
    console.log(manufacturer);
    setManufacturerChecked(manufacturer)
  };


  const selectallManufacturer = (e) => {
    e.preventDefault();
    const updatedCheckboxes = checkBoxesManufacturer.map(checkbox => ({ ...checkbox, checked: true }));
    setCheckBoxesManufacturer(updatedCheckboxes);
    const theSelectedManufacturer = updatedCheckboxes.filter(checkbox => checkbox.checked).map(checkbox => checkbox.label);
    setManufacturerChecked(theSelectedManufacturer);
  };



  const deselectallManufacturer = (e) => {
    e.preventDefault()
    const deselect = checkBoxesManufacturer.map(checkbox => ({ ...checkbox, checked: false }));
    console.log(deselect);
    setCheckBoxesManufacturer(deselect)
  };


  const toggleUpManufacturer = () => {
    setHostManufacturer(false);
  };

  const toggleDownManufacturer = () => {
    setHostManufacturer(true);
  };






  let dispatch = useDispatch();

  const onSubmit = (data) => {
    const formData = { ...store, ...data, manufacturerChecked };
    console.log(formData);
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

          <div className='flex border-b gap-[36%] lg:gap-[100px] md:gap-[160px] mt-5 h-10 px-5'>
                <h3 className='text-sm font-semibold'>Serialized:</h3>
                <input {...register("serialized")} type="checkbox" onChange={() => setIsChecked(!isChecked)} checked={isChecked} className='lg:mt-0 mt-2 ms-0 lg:ms-0 md:ms-5 md:mt-2 border h-[20px] w-[15%] lg:w-[40%] border-gray-500 focus:outline-none py-1 rounded' />
              </div>
            <div>
              <h1 className='ms-5 lg:text-xl font-bold mt-5'>Manufacturer</h1>
              <div className='flex lg:gap-[26%] md:gap-[29%] lg:ms-0 md:ms-0 ms-1 gap-[13%] border-gray-300 border-b lg:p-5 p-4'>
                <label className='text-sm font-semibold h-8' htmlFor="">Select Manufacturer:</label>
                <div className='border border-gray-500 rounded text-sm lg:pe-20 h-8 py-1 lg:w-[240px] w-[180px] md:w-[210px]'>
                  <span className='text-gray-500 p-1'>Select Manufacturer</span>
                  <p className="mt-[-10%] cursor-pointer lg:ms-[130%] md:ms-[90%] ms-[85%] hover:text-green-700">
                    <span onClick={toggleUpManufacturer} className={hostManufacturer ? '' : 'hidden'}>
                      <IoIosArrowUp  size={18} />
                    </span>
                    <span onClick={toggleDownManufacturer} className={hostManufacturer ? 'hidden' : ''}>
                      <IoChevronDown size={18} />
                    </span>
                  </p>
                  <div className={`p-2 mt-[-4%] ${hostManufacturer ? 'block' : 'hidden'}`}>
                    <div className='bg-white shadow-lg z-100 lg:w-[250px] md:w-[250px] w-[200px] lg:ms-[-10px] md:ms-[-20%] ms-[-20%] p-3 mt-2'>
                      <div className='flex gap-6'>
                        <button className='border border-[#089451] font-semibold py-1 lg:px-4 px-2 rounded' onClick={selectallManufacturer}>Select All</button>
                        <button className='border border-[#089451] font-semibold py-1 lg:px-4 px-2 rounded' onClick={deselectallManufacturer}>Deselect All</button>
                      </div>
                      <div className='p-2'>
                        {checkBoxesManufacturer.map(checkbox => (
                          <div className='flex justify-between' key={checkbox.id}>
                            {checkbox.label}
                            <input
                              type="checkbox"
                              checked={checkbox.checked}
                              onChange={() => handleCheckBoxManufacturer(checkbox.id)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h1 className='ms-5 lg:text-xl font-bold mt-2'>Pricing Option</h1>
              <div>
                <div className='flex  mt-5 px-5'>
                  <h3 className='mt-2 text-sm font-semibold h-[35px] w-[55%] md:w-[52%] lg:w-[50%]'>Percentage Markup:</h3>
                  <input {...register("percentagemarkup")} type="text" className={(hostManufacturer ) ? 'hidden' : `border h-[35px] w-[55%] p-3 md:w-[201px] lg:w-[230px] border-gray-500 focus:outline-none py-1 rounded`} />
                </div>
                <small className='text-red-600 ms-[42%] lg:ms-[55%]'>{errors.percentagemarkup?.message}</small>
              </div>

              <div>
                <div className='flex mt-5 px-5'>
                  <h3 className='mt-2 text-sm font-semibold h-[35px] w-[55%] md:w-[52%] lg:w-[50%]'>Fixed Markup:</h3>
                  <input {...register("fixedmarkup")} type="text" className={hostManufacturer ? 'hidden' : `border h-[35px] w-[55%] p-3 lg:w-[230px] md:w-[201px] border-gray-500 focus:outline-none py-1 rounded `} />
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

              <h1 className='ms-5 lg:text-xl font-bold mt-10'>Inventory</h1>
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
              <h1 className='ms-5 lg:text-xl font-bold'>Integration Settings</h1>
              <div className='flex gap-20 lg:gap-[70px] md:gap-[142px] mt-5 h-10 px-5'>
                <h3 className='text-sm font-semibold'>Update Inventory:</h3>
                <input type="checkbox" {...register("inventory")} onChange={() => setInventory(!inventory)} checked={inventory} className='lg:mt-0 mt-2 md:mt-2 border h-[20px] w-[15%] lg:w-[40%] border-gray-500 focus:outline-none py-1 rounded' />
              </div>
              <div className='flex gap-[32%] lg:gap-[100px] md:gap-[170px]  mt-5 h-10 px-5'>
                <h3 className='text-sm font-semibold'>Send Orders:</h3>
                <input type="checkbox" {...register("orders")} onChange={() => setOrder(!order)} checked={order} className='lg:mt-0 mt-2 md:mt-2 border h-[20px] w-[15%] lg:w-[40%] border-gray-500 focus:outline-none py-1 rounded' />
              </div>
              <div className='flex gap-[26%] lg:gap-[80px] md:gap-[150px] mt-5 h-10 px-5'>
                <h3 className='text-sm font-semibold'>Update Tracking:</h3>
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

export default Zanders