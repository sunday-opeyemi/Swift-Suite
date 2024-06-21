import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { handleNextStep } from "../redux/vendor";
import { useDispatch, useSelector } from "react-redux";

const Vendorenrolment = () => {
  let vendor_name = JSON.parse(localStorage.getItem("vendor_name"));
  // console.log(vendor_name);

  const store = useSelector((state) => state.vendor.vendorData);

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [stateSelectDisabled, setStateSelectDisabled] = useState(true);
  const [errorsVisible, setErrorsVisible] = useState(false);

  const countries = [
    {
      name: "United States",
      states: [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming",
      ],
    },
    {
      name: "Canada",
      states: [
        "Alberta",
        "British Columbia",
        "Manitoba",
        "New Brunswick",
        "Newfoundland and Labrador",
        "Nova Scotia",
        "Ontario",
        "Prince Edward Island",
        "Quebec",
        "Saskatchewan",
      ],
    },
    {
      name: "Nigeria",
      states: [
        "Abia",
        "Adamawa",
        "Akwa Ibom",
        "Anambra",
        "Bauchi",
        "Bayelsa",
        "Benue",
        "Borno",
        "Cross River",
        "Delta",
        "Ebonyi",
        "Edo",
        "Ekiti",
        "Enugu",
        "FCT (Federal Capital Territory)",
        "Gombe",
        "Imo",
        "Jigawa",
        "Kaduna",
        "Kano",
        "Katsina",
        "Kebbi",
        "Kogi",
        "Kwara",
        "Lagos",
        "Nasarawa",
        "Niger",
        "Ogun",
        "Ondo",
        "Osun",
        "Oyo",
        "Plateau",
        "Rivers",
        "Sokoto",
        "Taraba",
        "Yobe",
        "Zamfara",
      ],
    },
  ];

  const Schema = yup.object().shape({
    // vendor_name: yup.string().required(),
    address_street1: yup.string().required(),
    address_street2: yup.string().required(),
    city: yup.string().required(),
    postal_code: yup.string().required(),
    country: yup.string().required(),
    state: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
  });

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    console.log(data);
    let form = {
      ...store,
      ...data,
      vendor_name: vendor_name,
      country,
      state,
    };
    console.log(form);
    dispatch(handleNextStep(form));
  };



  const handleCountryChange = (event) => {
    setCountry(event.target.value);
    setState(""); // Reset state when country changes
    setStateSelectDisabled(false); // Enable state select when country is chosen
    setErrorsVisible(false)
  };
  

  const handleStateChange = (event) => {
    setState(event.target.value);
    setErrorsVisible(false)

  };

  const handleFocus = () => {
    setErrorsVisible(true); // Show errors when a field is focused
  };

  return (
    <section className="bg-green-50 mb-10">
      <form
        className="bg-white lg:w-[100%] w-[130%] md:w-[90%] md:ms-[30%] lg:ms-0 ms-5  py-10 lg:mt-8 mt-0"
        action=""
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="lg:text-xl text-sm font-bold font-sans border-gray-500 border-b lg:p-4 p-0 py-2 px-4">
          Vendor Enrollment
        </h1>
        
          <div className="flex lg:gap-10 gap-3 border-gray-500 border-b lg:p-5 p-4">
            <label
              className="font-bold lg:mt-5 mt-2 lg:text-xl text-sm"
              htmlFor=""
            >
              Vendor Name:
            </label>
            <input
              // {...register("vendor_name"   , {required : true})}
              type="text" disabled value={`${vendor_name}`}
              className='border p-3 border-black focus:outline-none py-2 lg:w-[52%] md:w-[46%] w-[58%] ms-12 lg:ms-6 md:ms-20 rounded lg:mt-3 mt-0'
            />
          </div>
        
        <h1 className="lg:text-xl text-sm font-bold font-sans border-gray-500 border-b lg:0 p-5 px-5">
          Vendor Address
        </h1>
        <div className="px-5">
          <div className="mt-5">
            <div className="flex lg:gap-10 md:gap-8 lg:mt-0 mt-5">
              <label className="font-bold w-[140px] mt-3" htmlFor="">
                Street 1:
              </label>
              <input
                {...register("address_street1"   , {required : true})}
                type="text"
                className={`border border-black focus:outline-none p-3 py-4 lg:w-[50%] md:w-[45%] rounded ${
                  errors.address_street1 && <span>This field is required</span>
                }`}
              />
            </div>
            <small className="text-red-600 ms-[42%]">
              {errors.address_street1 && <span>This field is required</span>}
            </small>
          </div>
          <div className="">
            <div className="flex lg:gap-10 md:gap-8 lg:mt-0 mt-5">
              <label className="font-bold w-[140px] mt-3" htmlFor="">
                Street 2:
              </label>
              <input
                {...register("address_street2", {required : true})}
                type="text"
                className={`border border-black focus:outline-none p-3 py-4 lg:w-[50%] md:w-[45%] rounded ${
                  errors.address_street2 && <span>This field is required</span>
                }`}
              />
            </div>
            <small className="text-red-600 ms-[42%]">
              {errors.address_street2 && <span>This field is required</span>}
            </small>
          </div>
          <div className="">
            <div className="flex lg:gap-10 md:gap-8 gap-2  lg:mt-0 mt-5">
              <label className="font-bold  w-[140px] mt-3" htmlFor="">
                City:
              </label>
              <input
                {...register("city", {required : true})}
                type="text"
                className={`border border-black focus:outline-none py-2 p-3  rounded ${
                  errors.city?.message && "error"
                }`}
              />
            </div>
            <small className="text-red-600 ms-[42%]">
              {errors.city && <span>This field is required</span>}
            </small>
          </div>

          <div className="">
            <div className="flex lg:gap-10 md:gap-8 gap-2 lg:mt-0 mt-5">
              <label className="font-bold w-[140px] mt-3" htmlFor="">
                Postal Code (Zip):
              </label>
              <input
                {...register("postal_code", {required : true})}
                type="number"
                className={`border border-black focus:outline-none py-2 p-3 rounded ${
                  errors.postal_code && <span>This field is required</span>
                }`}
              />
            </div>
            <small className="text-red-600 ms-[42%]">
              {errors.postal_code && <span>This field is required</span>}
            </small>
          </div>
          {/* <div className="container mx-auto"> */}
            <div className="flex flex-col">
              <div className="flex md:gap-8 lg:gap-10 gap-2">
                <label className="font-bold mt-3 w-[140px]" htmlFor="">
                  Country:
                </label>
                <select
                  className="px-4 py-3 mb-4 lg:w-[50%] md:w-[45%] w-[250px] bg-white border border-black rounded-md shadow-sm focus:outline-none"
                  value={country} onFocus={handleFocus} {...register("country")}
                  onChange={handleCountryChange}
                >
                  <option value="">Select Country</option>
                  {countries.map((selectedCountry) => (
                    <option key={selectedCountry.name} value={selectedCountry.name}>
                      {selectedCountry.name}
                    </option>
                  ))}
                </select>
              </div>
              <small className="text-red-600 ms-[42%]">
              {(errors.country && errorsVisible) && <span>This field is required</span>}
            </small>

              <div className="flex md:gap-8 lg:gap-10 gap-2">
                <label className="font-bold  mt-3 w-[140px]" htmlFor="">
                  State:
                </label>
                <select
                  className={`px-4 py-3 mb-4 lg:w-[50%] md:w-[45%] w-[250px] bg-white border border-black rounded-md shadow-sm focus:outline-none  ${
                    stateSelectDisabled && "opacity-50 pointer-events-none"
                  }`}
                  value={state} onFocus={handleFocus} {...register ("state")}
                  onChange={handleStateChange}
                  disabled={stateSelectDisabled}
                >
                  <option value="">Select State</option>
                  {country &&
                    countries
                      .find((selectedCountry) => selectedCountry.name === country)
                      .states.map((selectedState) => (
                        <option key={selectedState} value={selectedState}>
                          {selectedState}
                        </option>
                      ))}
                </select>
              </div>
              <small className="text-red-600 ms-[42%]">
              {(errors.state && errorsVisible) && <span>This field is required</span>}
            </small>
            </div>
          </div>
        {/* </div> */}
        <button
          type="submit"
          className="bg-[#089451] hover:border hover:border-[#089451] hover:bg-white text-white hover:text-[#089451] rounded lg:ms-[50%] ms-[49%] lg:mt-1 mt-10  lg:p-2 p-2 lg:w-[20%] w-[105px]"
        >
          Next
        </button>
      </form>
    </section>
  );
};

export default Vendorenrolment;
