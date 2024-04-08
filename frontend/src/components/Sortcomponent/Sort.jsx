import React, { useState } from "react";
import SortByPrices from "./SortByPrices";
import SortByNames from "./SortByNames";
import SortMenu from "./SortMenu";
import SortByBrand from "./SortByBrand";

const Sort = ({ currentItems, setCurrentItems, catalogueProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [selectedName, setSelectedName] = useState("all");


  return (
    <>
      <section
        className='w-full grid lg:grid-cols-4 gap-10 my-4'
      >
        <SortMenu
          setSelectedCategory={setSelectedCategory}
          catalogueProduct={catalogueProduct}
          selectedCategory={selectedCategory}
          setCurrentItems={setCurrentItems}
        />

        <SortByBrand
          setSelectedCategory={setSelectedCategory}
          catalogueProduct={catalogueProduct}
          selectedCategory={selectedCategory}
          setCurrentItems={setCurrentItems}
        />

        <SortByNames
          setSelectedName={setSelectedName}
          catalogueProduct={catalogueProduct}
          selectedName={selectedName}
          setCurrentItems={setCurrentItems} 
        />

        <SortByPrices
          setSelectedPriceRange={setSelectedPriceRange}
          setCurrentItems={setCurrentItems} 
          selectedPriceRange={selectedPriceRange} 
          catalogueProduct={catalogueProduct}
        />
      </section>
    </>
  );
};

export default Sort;