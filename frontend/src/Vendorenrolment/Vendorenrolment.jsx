import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { handleNextStep } from "../redux/vendor";
import { useDispatch, useSelector } from "react-redux";

const Vendorenrolment = () => {
  let vendorName = JSON.parse(localStorage.getItem("vendorName"));

  const store = useSelector((state) => state.vendor.vendorData);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [stateSelectDisabled, setStateSelectDisabled] = useState(true);

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
  // console.log(select);
  const Schema = yup.object().shape({
    // vendorName: yup.string().required(),
    street1: yup.string().required(),
    street2: yup.string().required(),
    city: yup.string().required(),
    postalCode: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    setValue,
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
      vendorName: vendorName,
      selectedCountry,
      selectedState,
    };
    console.log(form);
    dispatch(handleNextStep(form));
  };

  useEffect(() => {
    if (store) {
      // setValue("vendorName", store.vendorName)
      setValue("street1", store.street1);
      setValue("street2", store.street2);
      setValue("city", store.city);
      setValue("postalCode", store.postalCode);
    }
  }, []);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setSelectedState(""); // Reset state when country changes
    setStateSelectDisabled(false); // Enable state select when country is chosen
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
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
        <div className="">
          <div className="flex lg:gap-10 gap-3 border-gray-500 border-b lg:p-5 p-4">
            <label
              className="font-bold lg:mt-5 mt-2 lg:text-xl text-sm"
              htmlFor=""
            >
              Vendor Name:
            </label>
            <input
              {...register("vendorName")}
              type="text"
              disabled
              value={`${vendorName}`}
              className={`border p-3 border-black focus:outline-none py-2 lg:w-[52%] md:w-[46%] w-[58%] ms-12 lg:ms-6 md:ms-20 rounded lg:mt-3 mt-0 ${
                errors.vendorName?.message && "error"
              }`}
            />
          </div>
          <small className="text-red-600 ms-[42%]">
            {errors.vendorName?.message}
          </small>
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
                {...register("street1")}
                type="text"
                className={`border border-black focus:outline-none p-3 py-4 lg:w-[50%] md:w-[45%] rounded ${
                  errors.street1?.message && "error"
                }`}
              />
            </div>
            <small className="text-red-600 ms-[42%]">
              {errors.street1?.message}
            </small>
          </div>
          <div className="">
            <div className="flex lg:gap-10 md:gap-8 lg:mt-0 mt-5">
              <label className="font-bold w-[140px] mt-3" htmlFor="">
                Street 2:
              </label>
              <input
                {...register("street2")}
                type="text"
                className={`border border-black focus:outline-none p-3 py-4 lg:w-[50%] md:w-[45%] rounded ${
                  errors.street2?.message && "error"
                }`}
              />
            </div>
            <small className="text-red-600 ms-[42%]">
              {errors.street2?.message}
            </small>
          </div>
          <div className="">
            <div className="flex lg:gap-10 md:gap-8 gap-2  lg:mt-0 mt-5">
              <label className="font-bold  w-[140px] mt-3" htmlFor="">
                City:
              </label>
              <input
                {...register("city")}
                type="text"
                className={`border border-black focus:outline-none py-2 p-3  rounded ${
                  errors.street2?.message && "error"
                }`}
              />
            </div>
            <small className="text-red-600 ms-[42%]">
              {errors.city?.message}
            </small>
          </div>

          <div className="">
            <div className="flex lg:gap-10 md:gap-8 gap-2  lg:mt-0 mt-5">
              <label className="font-bold w-[140px] mt-3" htmlFor="">
                Postal Code (Zip):
              </label>
              <input
                {...register("postalCode")}
                type="text"
                className={`border border-black focus:outline-none py-2 p-3 rounded ${
                  errors.postalCode?.message && "error"
                }`}
              />
            </div>
            <small className="text-red-600 ms-[42%]">
              {errors.postalCode?.message}
            </small>
          </div>
          {/* <div className="container mx-auto"> */}
            <div className="flex flex-col">
              <div className="flex md:gap-[24%] lg:gap-[23%] gap-[28%]">
                <label className="font-bold mt-3" htmlFor="">
                  Country:
                </label>
                <select
                  className="px-4 py-3 mb-4 lg:w-[190px] md:w-[190px] w-[250px] bg-white border border-black rounded-md shadow-sm focus:outline-none focus:ring focus:ring-black"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.name} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex md:gap-[28%] gap-[33%] lg:gap-[27%]">
                <label className="font-bold  mt-3" htmlFor="">
                  State:
                </label>
                <select
                  className={`px-4 py-3 mb-4 md:w-[190px] lg:md:w-[190px] w-[190px] bg-white border border-black rounded-md shadow-sm focus:outline-none focus:ring focus:ring-black ${
                    stateSelectDisabled && "opacity-50 pointer-events-none"
                  }`}
                  value={selectedState}
                  onChange={handleStateChange}
                  disabled={stateSelectDisabled}
                >
                  <option value="">Select State</option>
                  {selectedCountry &&
                    countries
                      .find((country) => country.name === selectedCountry)
                      .states.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                </select>
              </div>
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
