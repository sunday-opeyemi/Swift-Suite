import React, { useEffect, useState } from 'react'
import { IoIosArrowUp } from 'react-icons/io'
import { IoChevronDown } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { handleNextStep, handlePreviousStep } from '../redux/vendor';
import { useNavigate } from 'react-router-dom';




const Shopify = () => {
  const store = useSelector(state => state.vendor.vendorData)

  const vendorName = JSON.parse(localStorage.getItem('vendorName'));
//   console.log(vendorName);

const navigate = useNavigate()




  const [checkBoxesProduct, setCheckBoxesProduct] = useState([
    { id: 1, label: 'RSR', checked: false },
    { id: 2, label: 'Shoes', checked: false },
    { id: 3, label: 'Heels', checked: false },
    { id: 4, label: 'Jackets', checked: false },
    { id: 5, label: 'Stationeries', checked: false },
    { id: 6, label: 'Shoes', checked: false },
    { id: 7, label: 'Shoes', checked: false },
    { id: 8, label: 'Glasses', checked: false },
  ]);




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


  const [checkBoxesBrand, setCheckBoxesBrand] = useState([
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
  const [brand, setBrand] = useState(false)
  const [productChecked, setProductChecked] = useState([])
  const [categoryChecked, setCategoryChecked] = useState([])
  const [brandChecked, setBrandChecked] = useState([])


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



  const handleCheckBoxBrand = (ids) => {
    if (!Array.isArray(ids)) {
      ids = [ids]; // Convert to array if single ID is provided
    }

    const updatedCheckboxes = checkBoxesBrand.map(checkbox => {
      if (ids.includes(checkbox.id)) {
        return { ...checkbox, checked: !checkbox.checked };
      }
      return checkbox;
    });

    setCheckBoxesBrand(updatedCheckboxes);
    const brand = updatedCheckboxes.filter(checkbox => checkbox.checked).map(checkbox => checkbox.label);
    console.log(brand);
    setBrandChecked(brand)
  };


  const selectallBrand = (e) => {
    e.preventDefault();
    const updatedCheckboxes = checkBoxesBrand.map(checkbox => ({ ...checkbox, checked: true }));
    setCheckBoxesBrand(updatedCheckboxes);
    const theSelectedBrand = updatedCheckboxes.filter(checkbox => checkbox.checked).map(checkbox => checkbox.label);
    setBrandChecked(theSelectedBrand);
  };



  const deselectallBrand = (e) => {
    e.preventDefault()
    const deselect = checkBoxesBrand.map(checkbox => ({ ...checkbox, checked: false }));
    setCheckBoxesBrand(deselect)
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





  let dispatch = useDispatch();

  const onSubmit = (data) => {
    // const formData = { ...store, ...data, selectedProducts, selectedCategories, selectedBrand, productChecked, categoryChecked, brandChecked };
    const formData = { ...store, ...data, productChecked, categoryChecked, brandChecked };
    // console.log(formData);
    dispatch(handleNextStep(formData));
  };



  const handlePrevious=()=>{
    dispatch(handlePreviousStep())
  }
  return (
    <>
    <p>Edit Shopify Account</p>
      <section className='bg-green-50 mb-10 md:px-22'>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className='bg-white lg:w-[100%] w-[130%] md:w-[90%] md:ms-[30%] lg:h-[20%] lg:ms-0 ms-3 py-10 lg:mt-8 mt-0'>
            <div>
              <h1 className='ms-5 lg:text-xl text-sm font-bold'>Account Information</h1>
              <div className='flex  mt-5 px-5'>
                  <h3 className='mt-2 text-sm font-semibold h-[35px] w-[55%] md:w-[52%] lg:w-[50%]'>Marketplace Name:</h3>
                  <input {...register("percentagemarkup")} type="text" className={brand || hostCategory ? 'hidden' : `border h-[35px] w-[55%] p-3 md:w-[201px] lg:w-[230px] border-gray-500 focus:outline-none py-1 rounded`} />
                </div>
              <div className='flex lg:ms-0 md:ms-0 ms-1 gap-[30%] md:gap-[30%] border-gray-300 lg:p-5 p-4 focus:outline-border-gray-500'>
                <label className='mt-2 text-sm font-semibold h-8 md:w-[140px]' htmlFor="">Marketplace Region:</label>
                <div className='border border-gray-500 rounded p-1 text-sm lg:pe-20 h-8 lg:w-[230px] w-[160px] md:w-[200px]'>
                  <span className='text-gray-500 p-1'>Please Select Countries</span>
                  <p className="mt-[-10%] cursor-pointer lg:ms-[130%] md:ms-[90%] ms-32 hover:text-green-700">
                    <span onClick={toggleUp} className={host ? '' : 'hidden'}>
                      <IoIosArrowUp size={18}  />
                    </span>
                    <span onClick={toggleDown} className={host ? 'hidden' : ''}>
                      <IoChevronDown size={18}  className={(hostCategory || brand) ? 'hidden' : 'block'}/>
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
              <div className='flex  mt-2 px-5'>
                  <h3 className='mt-2 text-sm font-semibold h-[25px] w-[55%] md:w-[52%] lg:w-[50%]'>Store ID:</h3>
                  <input {...register("percentagemarkup")} type="text" className={brand || hostCategory ? 'hidden' : `border h-[35px] w-[55%] p-3 md:w-[201px] lg:w-[230px] border-gray-500 focus:outline-none py-1 rounded`} />
                </div>
                <div className='flex  mt-7 px-5'>
                  <h3 className='mt-2 text-sm font-semibold h-[25px] w-[55%] md:w-[52%] lg:w-[50%]'>Store Logo:</h3>
                  <input {...register("percentagemarkup")} type="file" className={brand || hostCategory ? 'hidden' : ` h-[35px] w-[55%] lg:ms-[-13px] p-3 md:w-[201px] lg:w-[230px] border-gray-500 focus:outline-none py-1 rounded`} />
                </div>
                <div className='flex  mt-7 px-5 border-b  pb-5'>
                  <h3 className='mt-2 text-sm font-semibold h-[35px] w-[55%] md:w-[52%] lg:w-[50%]'>PayPal Email:</h3>
                  <input {...register("percentagemarkup")} type="text" className={brand || hostCategory ? 'hidden' : `border h-[35px] w-[55%] p-3 md:w-[201px] lg:w-[230px] border-gray-500 focus:outline-none py-1 rounded`} />
                </div>


              <h1 className='ms-5 lg:text-xl font-bold mt-5'>Marketplace Fees</h1>
              <div>
                <div className='flex  mt-5 px-5'>
                  <h3 className='mt-2 text-sm font-semibold h-[25px] w-[55%] md:w-[52%] lg:w-[50%]'>Fixed %:</h3>
                  <input {...register("percentagemarkup")} type="text" className={brand || hostCategory ? 'hidden' : `border h-[35px] w-[55%] p-3 md:w-[201px] lg:w-[230px] border-gray-500 focus:outline-none py-1 rounded`} />
                </div>
                <small className='text-red-600 ms-[42%] lg:ms-[55%]'>{errors.percentagemarkup?.message}</small>
              </div>

              <div>
                <div className='flex mt-5 px-5'>
                  <h3 className='mt-2 text-sm font-semibold h-[25px] w-[55%] md:w-[52%] lg:w-[50%]'>Fixed $:</h3>
                  <input {...register("fixedmarkup")} type="text" className={brand || hostCategory ? 'hidden' : `border h-[35px] w-[55%] p-3 lg:w-[230px] md:w-[201px] border-gray-500 focus:outline-none py-1 rounded `} />
                </div>
                <small className='text-red-600 ms-[42%] lg:ms-[55%]'>{errors.fixedmarkup?.message}</small>
              </div>
              <div className='flex gap-5 lg:gap-[60px] md:gap-[70px] mt-5 h-10 px-5'>
                <h3 className='text-sm font-semibold w-40'>Enable Price Update:</h3>
                <input {...register("costaverage")} type="checkbox" onChange={() => setIsChecked(!isChecked)} checked={isChecked} className='lg:mt-0 mt-2 md:mt-2 border h-[20px] w-[15%] lg:w-[40%] border-gray-500 focus:outline-none py-1 rounded' />
              </div>
              <div className='flex gap-5 lg:gap-[60px] md:gap-[70px] mt-5 h-10 px-5'>
                <h3 className='text-sm font-semibold w-40'>Enable Quantity Update:</h3>
                <input {...register("costaverage")} type="checkbox" onChange={() => setIsChecked(!isChecked)} checked={isChecked} className='lg:mt-0 mt-2 md:mt-2 border h-[20px] w-[15%] lg:w-[40%] border-gray-500 focus:outline-none py-1 rounded' />
              </div>
              <div className='flex gap-5 lg:gap-[60px]  md:gap-[70px] mt-5 h-10 px-5'>
                <h3 className='text-sm font-semibold w-40'>Enable Business Pricing:</h3>
                <input {...register("costaverage")} type="checkbox" onChange={() => setIsChecked(!isChecked)} checked={isChecked} className='lg:mt-0 mt-2 md:mt-2 border h-[20px] w-[15%] lg:w-[40%] border-gray-500 focus:outline-none py-1 rounded' />
              </div>

              <div>
                <div className='flex mt-5 px-5'>
                  <h3 className='mt-2 text-sm font-semibold h-[25px] w-[55%] md:w-[52%] lg:w-[50%]'>Business Price Margin Type:</h3>
                  <input {...register("stockminimum")} type="text" className='border h-[35px] w-[55%] md:w-[201px] lg:w-[230px] border-gray-500 focus:outline-none p-3 py-1 rounded' />
                </div>
                <small className='text-red-600 ms-[42%] lg:ms-[55%]'>{errors.stockminimum?.message}</small>
              </div>

              <div>
                <div className='flex  mt-5 px-5'>
                  <h3 className='mt-2 text-sm font-semibold h-[35px] w-[55%] md:w-[52%] lg:w-[50%]'>ROI strategy:</h3>
                  <input {...register("stockmaximum")} type="text" className='border h-[35px] w-[55%] md:w-[201px] lg:w-[230px] border-gray-500 focus:outline-none p-3 py-1 rounded' />
                </div>
                <small className='text-red-600 ms-[42%] lg:ms-[55%]'>{errors.stockmaximum?.message}</small>
              </div>
              <div>
                <div className='flex px-5'>
                  <h3 className='mt-2 text-sm font-semibold h-[35px] w-[55%] md:w-[52%] lg:w-[50%]'>Min Profit Margin:</h3>
                  <input {...register("stockmaximum")} type="text" className='border h-[35px] w-[55%] md:w-[201px] lg:w-[230px] border-gray-500 focus:outline-none p-3 py-1 rounded' />
                </div>
                <small className='text-red-600 ms-[42%] lg:ms-[55%]'>{errors.stockmaximum?.message}</small>
              </div>
              <div>
                <div className='flex px-5'>
                  <h3 className='mt-2 text-sm font-semibold h-[35px] w-[55%] md:w-[52%] lg:w-[50%]'>Margin:</h3>
                  <input {...register("stockmaximum")} type="text" className='border h-[35px] w-[55%] md:w-[201px] lg:w-[230px] border-gray-500 focus:outline-none p-3 py-1 rounded' />
                </div>
                <small className='text-red-600 ms-[42%] lg:ms-[55%]'>{errors.stockmaximum?.message}</small>
              </div>
              <div className='flex px-5 md:gap-[38%]'>
                <p className='text-sm font-semibold'>Send Min Price?</p>
                <div className='flex gap-5'>
                    <div className='flex'>
                    <p>Yes</p>
                    <input type="checkbox"  className='my-1 ms-2'/>
                    </div>
                    <div className='flex'>
                        <p>No</p>
                    <input type="checkbox"  className='ms-2'/>
                    </div>
                </div>
              </div>
              <div>
                <div className='flex px-5 mt-5 pb-5'>
                  <h3 className='mt-2 text-sm font-semibold h-[35px] w-[55%] md:w-[52%] lg:w-[50%]'>Maximum Quantity:</h3>
                  <input {...register("stockmaximum")} type="text" className='border h-[35px] w-[55%] md:w-[201px] lg:w-[230px] border-gray-500 focus:outline-none p-3 py-1 rounded' />
                </div>
                <small className='text-red-600 ms-[42%] lg:ms-[55%]'>{errors.stockmaximum?.message}</small>
              </div>
              <div className='flex gap-20 justify-center my-5'>
              <button type='submit' className='bg-[#089451] text-white border py-1 px-5 rounded hover:bg-white font-bold hover:text-[#089451] border-[#089451]'>Submit</button>
            </div>
            </div>
          </div>
        </form>
      </section>
    </>

  );
};

export default Shopify