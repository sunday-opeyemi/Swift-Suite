import React from "react";

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
}) => {

    
  return (
    <div className={filterOpen ? "ms-[2%] fixed text-white" : "hidden"}>
       {/* Forms */}
       <form
          className="w-full grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2 lg:gap-5 md:gap-10 my-4 lg:ms-[1%] "
          onSubmit={handleSubmit}
        >
          <input
            className="rounded-md p-2 sm:text-xs lg:text-base bg-transparent border border-black h-[35px] w-[80%] focus:bg-black"
            type="text"
            placeholder="Search by name"
            name="name"
            value={formFilters.name}
            onChange={handleFormInputChange}
          />

          <input
            className="rounded-md p-2 sm:text-xs lg:text-base bg-transparent border h-[35px] border-black w-[80%] focus:bg-black"
            type="text"
            placeholder="Filter by brand"
            name="brand"
            value={formFilters.brand}
            onChange={handleFormInputChange}
          />

          <input
            className="rounded-md p-2 sm:text-xs lg:text-base bg-transparent border h-[35px] border-black w-[80%] focus:bg-black"
            type="text"
            placeholder="Filter by gender"
            name="gender"
            value={formFilters.gender}
            onChange={handleFormInputChange}
          />

          <div>
            <div className="flex w-[100%]">
              <div className="relative w-[20%]">
                <div
                  className="text-black cursor-pointer px-4 py-1 border border-gray-300"
                  onClick={toggleDropdown}
                >
                  {symbolMap[filterType]}
                </div>
                {open && (
                  <div className="absolute  w-[400%] bg-white text-black border border-gray-300">
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
                className="text-black w-[60%] px-4 py-1"
                type="number"
                value={filterValue}
                onChange={onFilterValueChange}
              />
            </div>

          </div>
          <div>
            <input
              className="flex gap-2"
              type="checkbox"
              checked={filterByUPC}
              onChange={handleFilterByUPCChange}
            />
            <label htmlFor="filterByUPC">Filter by UPC</label>
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
