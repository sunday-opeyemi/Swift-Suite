import React from "react";
import { FaCaretDown } from "react-icons/fa";

const FilterComponent = ({
  filterOpen,
  setfilterOpen,
  open,
  toggleDropdown,
  handleOptionClick,
  symbolMap,
  filterType,
  filterValue,
  onFilterValueChange,
  handleFilterByUPCChange,
  formFilters,
  handleFormInputChange,
  handleSubmit,
  filterByUPC,
  openQuantity,
  toggleQuantityDropdown,
  handleQuantityClick,
  quantityMap,
  filterQuantityType,
  filterQuantityValue,
  onFilterQuantityChange,
}) => {

    
  return (
    <div className={filterOpen ? "ms-[2%] fixed text-white" : "hidden"}>
       {/* Forms */}
       <form
          className="w-full grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2 lg:gap-5 md:gap-10 my-4 lg:ms-[1%] "
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
           <label htmlFor="name">Name</label>
          <input
            className="rounded-md p-2 sm:text-xs lg:text-base bg-transparent bg-white border border-black h-[35px] w-[80%] outline-none text-black"
            type="text"
            placeholder=""
            name="name"
            value={formFilters.name}
            onChange={handleFormInputChange}
          />
          </div>
          <div className="flex flex-col">
           <label htmlFor="name">Brand</label>
          <input
            className="rounded-md p-2 sm:text-xs lg:text-base bg-transparent bg-white border border-black h-[35px] w-[80%] outline-none text-black"
            type="text"
            placeholder=""
            name="brand"
            value={formFilters.brand}
            onChange={handleFormInputChange}
          />
          </div>
          <div className="flex flex-col">
           <label htmlFor="name">Gender</label>
          <input
            className="rounded-md p-2 sm:text-xs lg:text-base bg-transparent bg-white border border-black h-[35px] w-[80%] outline-none text-black"
            type="text"
            placeholder=""
            name="gender"
            value={formFilters.gender}
            onChange={handleFormInputChange}
          />
          </div>
          <div>
            <p>Price</p>
            <div className="flex">
              <div className="relative w-[20%] bg-white border-r-1 border-black rounded-l-lg">
     
                  <div
                    className="flex text-black cursor-pointer px-1 py-1 border border-gray-300"
                    onClick={toggleQuantityDropdown}
                  >
                    <div>
                      <FaCaretDown className="mt-1" />
                    </div>
                  {symbolMap[filterType]}
                </div>
                {open && (
                  <div className="absolute py-1  w-[400%] bg-white text-black border">
                    {Object.keys(symbolMap).map((key) => (
                      <div
                        key={key}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                        onClick={() => handleOptionClick(key)}
                      >
                        {key}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <input
                className="text-black w-[60%] px-4 py-1 rounded-r-lg outline-none"
                type="number"
                value={filterValue}
                onChange={onFilterValueChange}
              />
            </div>

          </div>
          <div className="flex gap-1">
            <input
              className=""
              type="checkbox"
              checked={filterByUPC}
              onChange={handleFilterByUPCChange}
            />
            <label htmlFor="filterByUPC" className="mt-1">UPC</label>
          </div>
          {/* QUANTITY DROPDOWN */}
          <div>
              <div className="flex w-[100%]">
                <div className="relative w-[20%]">
                  <div
                    className="flex text-black cursor-pointer px-1 py-1 border border-gray-300"
                    onClick={toggleQuantityDropdown}
                  >
                    <div>
                      <FaCaretDown className="mt-1" />
                    </div>

                    <div>{quantityMap[filterQuantityType]}</div>
                  </div>
                  {openQuantity && (
                    <div className="absolute  w-[400%] bg-white text-black border border-gray-300">
                      {Object.keys(quantityMap).map((key) => (
                        <div
                          key={key}
                          className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                          onClick={() => handleQuantityClick(key)}
                        >
                          {key}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <input
                  className="text-black w-[60%] px-4 py-1 outline-none"
                  type="number"
                  value={filterQuantityValue}
                  onChange={onFilterQuantityChange}
                />
              </div>
            </div>
          <button
            className="bg-white rounded text-[#089451] w-[40%] h-[35px]"
            type="submit"
          >
            Search
          </button>
          
        </form>
      
    </div>
  );
};

export default FilterComponent;