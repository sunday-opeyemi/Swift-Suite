import React, { useEffect, useState } from "react";

const SortByBrand = ({setCurrentItems, catalogueProduct}) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const  [currentPage, setCurrentPage]   = useState([]);
const [uniqueBrand, setUniqueBrand] = useState([])


  useEffect(() => {
    if (catalogueProduct) {
      const brand = [...new Set(catalogueProduct.map(item => item.brand))];
      setUniqueBrand(brand);
    }
  }, [catalogueProduct]);


  const filterCollection = (brand) => {
    console.log(brand);
    setSelectedCategory(brand);

    if (brand === "all") {
      setCurrentPage(catalogueProduct);
    } else {
      const filtered = catalogueProduct.filter((item) => item.brand === brand);
      setCurrentItems(filtered);
      console.log(filtered);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-1">
        <div className="my-auto sm:text-xs lg:text-base mr-2">Brand:</div>
        <select
          value={selectedCategory}
          onChange={(e) => filterCollection(e.target.value)}
          className="rounded-md p-2 sm:text-xs lg:text-base bg-transparent w-[80%] border border-black focus:bg-black"
        >
          <option value="All">All Brands</option>
          {uniqueBrand.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default SortByBrand;