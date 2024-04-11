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
    "201-250": { min: 201, max: 250 },
    "251-300": { min: 251, max: 300 },
    "301-350": { min: 301, max: 350 },
    "351-400": { min: 351, max: 400 },
    "401-450": { min: 401, max: 450 },
    "451-500": { min: 451, max: 500 },
    "501-550": { min: 501, max: 550 },
    "551-600": { min: 551, max: 600 },
    "601-650": { min: 601, max: 650 },
    "651-700": { min: 651, max: 700 },
    "701-750": { min: 701, max: 750 },
    "751-800": { min: 751, max: 800 },
    "801-850": { min: 801, max: 850 },
    "851-900": { min: 851, max: 900 },
    "901-950": { min: 901, max: 950 },
    "951-1000": { min: 951, max: 1000 },
    "1001-1050": { min: 1001, max: 1050 },
    "1051-1100": { min: 1051, max: 1100 },
    "1101-1150": { min: 1101, max: 1150 },
    "1151-1200": { min: 1151, max: 1200 },
    "1201-1250": { min: 1201, max: 1250 },
    "1251-1300": { min: 1251, max: 1300 },
    "1300+": { min: 1300, max: Infinity }
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