import React from "react";

const SortByPrices = ({
  setSelectedPriceRange,
  catalogueProduct,
  selectedPriceRange,
  setCurrentItems
}) => {
  const priceRanges = {
    "all": { min: 0, max: Infinity },
    "1-50": { min: 1, max: 50 },
    "51-100": { min: 51, max: 100 },
    "101-150": { min: 101, max: 150 },
    "151-200": { min: 151, max: 200 },
    "201+": { min: 201, max: Infinity }
  };

  // Function to handle price range selection
  const handlePriceRangeChange = (range) => {
    setSelectedPriceRange(range); // Set the selected price range
    console.log(range);
    const { min, max } = priceRanges[range];
    const filtered = catalogueProduct.filter(
        (item) => parseFloat(item.aud_price) >= min && parseFloat(item.aud_price) <= max
        );
    setCurrentItems(filtered); // Set the filtered items
  };

  return (
    <>
      <div className="flex flex-col gap-1">
        <div className="my-auto sm:text-xs lg:text-base mr-2">Price:</div>
        <select
          value={selectedPriceRange}
          onChange={(e) => handlePriceRangeChange(e.target.value)}
          className="rounded-md p-2 sm:text-xs lg:text-base bg-transparent border border-black w-[80%] focus:bg-black"
        >
          {Object.keys(priceRanges).map((range, index) => (
            <option key={index} value={range}>
              {range === "all" ? "All" : `$${priceRanges[range].min} - $${priceRanges[range].max}`}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default SortByPrices;