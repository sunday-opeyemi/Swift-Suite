import React, { useEffect, useState } from 'react'
import { IoIosArrowUp } from 'react-icons/io'
import { IoChevronDown } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { handleNextStep, handlePreviousStep } from '../redux/vendor';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import gif from '../Images/gif.gif'




const Lipsey = () => {
  const store = useSelector(state => state.vendor.vendorData)

  let token = JSON.parse(localStorage.getItem('token'))
  // console.log(token);
  const vendor_name = JSON.parse(localStorage.getItem('vendor_name'));
  // console.log(vendor_name);


  const connection = JSON.parse(localStorage.getItem('connection'));
  // console.log(connection);


  const [checkBoxesProduct, setCheckBoxesProduct] = useState([])
  const [checkBoxesManufacturer, setCheckBoxesManufacturer] = useState([])
  const [myLoader, setMyLoader] = useState(false)
  const [selectedOption, setSelectedOption] = useState('');



  // const [checkBoxesProduct, setCheckBoxesProduct] = useState([
  //   { id: 1, label: 'RSR', checked: false },
  //   { id: 2, label: 'Shoes', checked: false },
  //   { id: 3, label: 'Heels', checked: false },
  //   { id: 4, label: 'Jackets', checked: false },
  //   { id: 5, label: 'Stationeries', checked: false },
  //   { id: 6, label: 'Shoes', checked: false },
  //   { id: 7, label: 'Shoes', checked: false },
  //   { id: 8, label: 'Glasses', checked: false },
  // ]);


  useEffect(() => {
    setCheckBoxesProduct(connection.productType)
  }, [])

  useEffect(() => {
    setCheckBoxesManufacturer(connection.manufacturer)
  }, [])




  // const [checkBoxesManufacturer, setCheckBoxesManufacturer] = useState([
  //   { id: 1, label: 'RSR', checked: false },
  //   { id: 2, label: 'Shoes', checked: false },
  //   { id: 3, label: 'Heels', checked: false },
  //   { id: 4, label: 'Jackets', checked: false },
  //   { id: 5, label: 'Stationeries', checked: false },
  //   { id: 6, label: 'Shoes', checked: false },
  //   { id: 7, label: 'Shoes', checked: false },
  //   { id: 8, label: 'Glasses', checked: false },
  // ]);



  const [isChecked, setIsChecked] = useState(false);
  const [inventory, setInventory] = useState(false);
  const [order, setOrder] = useState(false);
  const [tracking, setTracking] = useState(false);
  const [hostCategory, setHostCategory] = useState(false)


  const [host, setHost] = useState(false)
  const [hostManufacturer, setHostManufacturer] = useState(false)
  const [productChecked, setProductChecked] = useState([])
  const [manufacturerChecked, setManufacturerChecked] = useState([])




  const Schema = yup.object().shape({
    percentage_markup: yup.string().required(),
    fixed_markup: yup.string().required(),
    shipping_cost: yup.string().required(),
    stock_minimum: yup.string().required(),
    stock_maximum: yup.string().required(),
    costaverage: yup.string(),
    inventory: yup.string(),
    send_orders: yup.string(),
    update_tracking: yup.string(),
    update_inventory: yup.string(),
    cost_average: yup.string(),
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








  const handleCheckBoxProduct = (ids) => {
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

    const product = updatedCheckboxes.filter(checkbox => checkbox.checked).map(checkbox => checkbox.label);
    // console.log(product);
    setProductChecked(product)
  };


  const selectallProducts = (e) => {
    e.preventDefault();
    const updatedCheckboxes = checkBoxesProduct.map(checkbox => ({ ...checkbox, checked: true }));
    // Here we get all the info in our checkBoxesProduct
    // console.log(updatedCheckboxes);
    // we update our checkBoxesBrand here by setting the new value inside it at setCheckBoxesBrand
    setCheckBoxesProduct(updatedCheckboxes);
    // we filter it here and save it in theSelectedProducts
    const theSelectedProducts = updatedCheckboxes.filter(checkbox => checkbox.checked).map(checkbox => checkbox.label);
    // console.log(theSelectedProducts);
    setProductChecked(theSelectedProducts);
  };



  const deselectallProducts = (e) => {
    e.preventDefault()
    const Deselect = checkBoxesProduct.map(checkbox => ({ ...checkbox, checked: false }));
    // console.log(Deselect);
    setCheckBoxesProduct(Deselect)
  };





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
    // console.log(manufacturer);
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


 



  let dispatch = useDispatch();
  let endpoint = 'https://service.swiftsuite.app/vendor/vendor-enrolment/'

  const onSubmit = (data) => {
    const formData = { ...store, ...data, product_filter: productChecked, manufacturer: manufacturerChecked, product_category: [] };
    console.log(formData);
    setMyLoader(true)

    axios.post(endpoint, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        setMyLoader(false)
        console.log(response);
        toast.success('Enrolment successful')
        dispatch(handleNextStep(formData));
      }).catch((err) => {
        console.log(err);
        setMyLoader(false)
        toast.error('duplicate Enrolment')
      })
    // console.log(formData);
  };



  const handlePrevious=()=>{
    dispatch(handlePreviousStep())
  }

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value)
  }

  return (
    <>
      <section className='bg-green-50 mb-10'>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className='bg-white lg:w-[100%] w-[130%] md:w-[90%] md:ms-[30%] lg:h-[20%] lg:ms-0 ms-3 py-10 lg:mt-8 mt-0'>
            <div>
              <h1 className='ms-5 lg:text-xl text-sm font-bold'>Product Type</h1>
              <div className='flex lg:ms-0 md:ms-0 ms-1 lg:gap-[32%] gap-[25%] md:gap-[32%] border-gray-300 border-b lg:p-5 p-4 focus:outline-border-gray-500'>
                <label className='mt-2 text-sm font-semibold h-8' htmlFor="">Select Products:</label>
                <div className='border border-gray-500 rounded p-1 text-sm lg:pe-20 h-8 lg:w-[230px] w-[160px] md:w-[200px]'>
                  <span className='text-gray-500 p-1'>Select Products</span>
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
                        <button className='border border-[#089451] font-semibold py-1 lg:px-4 px-2 rounded' onClick={selectallProducts}>Select All</button>
                        <button className='border border-[#089451] font-semibold py-1 lg:px-4 px-2 rounded' onClick={deselectallProducts}>Deselect All</button>
                      </div>
                      <div className='p-2'>
                        {checkBoxesProduct.map(checkbox => (
                          <div className='flex justify-between' key={checkbox.id}>
                            {checkbox.label}
                            <input
                              type="checkbox"
                              checked={checkbox.checked}
                              onChange={() => handleCheckBoxProduct(checkbox.id)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>




              <h1 className='ms-5 lg:text-xl font-bold mt-5'>Manufacturer</h1>
              <div className='flex lg:gap-[30%] md:gap-[30%] lg:ms-0 md:ms-0 ms-1 gap-[23%] border-gray-300 border-b lg:p-5 p-4'>
                <label className=' text-sm font-semibold h-8' htmlFor="">Select Manufacturer:</label>
                <div className={host ? '-z-1' : `border border-gray-500 rounded text-sm lg:pe-20 h-8 py-1 lg:w-[230px] w-[160px] md:w-[200px]`}>
                  <span className={host ? 'hidden' : `text-gray-500 p-1`}>Select Manufacturer</span>
                  <p className="mt-[-10%] cursor-pointer lg:ms-[130%] md:ms-[90%] ms-[85%] hover:text-green-700">
                    <span onClick={toggleUpCategory} className={hostCategory ? '' : 'hidden'}>
                      <IoIosArrowUp className={host ? 'hidden' : ''} size={18} />
                    </span>
                    <span onClick={toggleDownCategory} className={hostCategory ? 'hidden' : ''}>
                      <IoChevronDown className={(host)? 'hidden' : ''} size={18} />
                    </span>
                  </p>
                  <div className={`p-2 mt-[-4%] ${hostCategory ? 'block' : 'hidden'}`}>
                    <div className='relative max-h-[50vh] overflow-y-auto bg-white shadow-lg z-100 lg:w-[250px] md:w-[250px] w-[200px] lg:ms-[-10px] md:ms-[-20%] ms-[-20%] p-3 mt-2'>
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
              <div className='flex  mt-5 px-5'>
                    <h3 className='mt-2 text-sm font-semibold h-[35px] w-[55%] md:w-[52%] lg:w-[50%]'>Select Markup Type</h3>
              <select className='border h-[35px] w-[50%] md:w-[201px] lg:w-[230px] border-gray-500 focus:outline-none p-3 py-1 rounded' onChange={handleSelectChange} value={selectedOption}>
                <option  value="">Select Markup Type</option>
                <option value="fixed">Fixed Markup</option>
                <option value="percentage">Percentage Markup</option>
              </select>
              </div>
              {selectedOption === 'percentage' && (
                <div>
                  <div className='flex  mt-5 px-5'>
                    <h3 className='mt-2 text-sm font-semibold h-[35px] w-[55%] md:w-[52%] lg:w-[50%]'>Percentage Markup:</h3>
                    <input {...register("percentage_markup", { required: true })} type="text" className='border h-[35px] w-[55%] p-3 md:w-[201px] lg:w-[230px] border-gray-500 focus:outline-none py-1 rounded' />
                  </div>
                  <small className='text-red-600 ms-[42%] lg:ms-[55%]'>{errors.percentage_markup && <span>This field is required</span>}</small>
                </div>
              )}

              {selectedOption === 'fixed' && (
                <div>
                  <div className='flex mt-5 px-5'>
                    <h3 className='mt-2 text-sm font-semibold h-[35px] w-[55%] md:w-[52%] lg:w-[50%]'>Fixed Markup:</h3>
                    <input {...register("fixed_markup", { required: true })} type="text" className='border h-[35px] w-[55%] p-3 lg:w-[230px] md:w-[201px] border-gray-500 focus:outline-none py-1 rounded' />
                  </div>
                  <small className='text-red-600 ms-[42%] lg:ms-[55%]'>{errors.fixed_markup && <span>This field is required</span>}</small>
                </div>
              )}
              <div>
                <div className='flex mt-5 px-5'>
                  <h3 className='mt-2 text-sm font-semibold h-[35px] md:w-[52%] w-[55%] lg:w-[50%]'>Shipping Cost:</h3>
                  <input {...register("shipping_cost", { required: true })} type="text" className='border h-[35px] w-[55%] lg:w-[230px] p-3 md:w-[201px] border-gray-500 focus:outline-none py-1 rounded' />
                </div>
                <small className='text-red-600 ms-[42%] lg:ms-[55%]'>{errors.shipping_cost && <span>This field is required</span>}</small>
              </div>


              <div className='flex gap-5 lg:gap-5 border-b md:gap-[70px] mt-5 h-10 px-5'>
                <h3 className='text-sm font-semibold'>Use Shipping Cost Average:</h3>
                <input {...register("cost_average")} type="checkbox" onChange={() => setIsChecked(!isChecked)} checked={isChecked} className='lg:mt-0 mt-2 ms-0 lg:ms-0 md:ms-5 md:mt-2 border h-[20px] w-[15%] lg:w-[40%] border-gray-500 focus:outline-none py-1 rounded' />
              </div>

              <h1 className='ms-5 lg:text-xl font-bold mt-10'>Inventory</h1>
              <div>
                <div className='flex mt-5 px-5'>
                  <h3 className='mt-2 text-sm font-semibold h-[35px] w-[55%] md:w-[52%] lg:w-[50%]'>Stock Minimum:</h3>
                  <input {...register("stock_minimum", { required: true })} type="text" className='border h-[35px] w-[55%] md:w-[201px] lg:w-[230px] border-gray-500 focus:outline-none p-3 py-1 rounded' />
                </div>
                <small className='text-red-600 ms-[42%] lg:ms-[55%]'>{errors.stock_minimum && <span>This field is required</span>}</small>
              </div>

              <div>
                <div className='flex  mt-5 px-5 pb-5 border-b'>
                  <h3 className='mt-2 text-sm font-semibold h-[35px] w-[55%] md:w-[52%] lg:w-[50%]'>Stock Maximum:</h3>
                  <input {...register("stock_maximum", { required: true })} type="text" className='border h-[35px] w-[55%] md:w-[201px] lg:w-[230px] border-gray-500 focus:outline-none p-3 py-1 rounded' />
                </div>
                <small className='text-red-600 ms-[42%] lg:ms-[55%]'>{errors.stock_maximum && <span>This field is required</span>}</small>
              </div>
              <div className='flex gap-20 lg:gap-[70px] md:gap-[142px] mt-5 h-10 px-5'>
                <h3 className='text-sm font-semibold'>Update Inventory:</h3>
                <input type="checkbox" {...register("update_inventory")} onChange={() => setInventory(!inventory)} checked={inventory} className='lg:mt-0 mt-2 md:mt-2 border h-[20px] w-[15%] lg:w-[40%] border-gray-500 focus:outline-none py-1 rounded' />
              </div>
              <div className='flex gap-[32%] lg:gap-[100px] md:gap-[170px]  mt-5 h-10 px-5'>
                <h3 className='text-sm font-semibold'>Send Orders:</h3>
                <input type="checkbox" {...register("send_orders")} onChange={() => setOrder(!order)} checked={order} className='lg:mt-0 mt-2 md:mt-2 border h-[20px] w-[15%] lg:w-[40%] border-gray-500 focus:outline-none py-1 rounded' />
              </div>
              <div className='flex gap-[26%] lg:gap-[80px] md:gap-[150px] mt-5 h-10 px-5'>
                <h3 className='text-sm font-semibold'>Update Tracking:</h3>
                <input type="checkbox" {...register("update_tracking")} onChange={() => setTracking(!tracking)} checked={tracking} className='lg:mt-0 mt-2 md:mt-2 border h-[20px] w-[15%] lg:w-[40%] border-gray-500 focus:outline-none py-1 rounded' />
              </div>
              <div className='flex gap-20 justify-center my-5'>
                <button type='submit' onClick={handlePrevious} className='bg-white text-[#089451] border py-1 px-3 rounded hover:bg-[#089451] font-bold hover:text-white border-[#089451]'>Previous</button>
                <button type='submit' className='bg-[#089451] text-white border py-1 px-5 rounded hover:bg-white font-bold hover:text-[#089451] border-[#089451]'>{myLoader ? <img src={gif} alt="" className='w-[25px] ' /> : 'Submit'}</button>
              </div>
            </div>
          </div>
        </form>
        <ToastContainer />
      </section>
    </>

  );
};

export default Lipsey