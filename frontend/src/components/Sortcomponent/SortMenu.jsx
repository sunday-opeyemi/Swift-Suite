import React, { useState } from "react";

const SortMenu = ({ catalogueProduct, setCurrentItems }) => {
  const [selectedMenu, setSelectedMenu] = useState("");
  const filterCollectionBySort = (value) => {
    console.log(value);
    setSelectedMenu(value);
    let sortedCollection = [...catalogueProduct];

    switch (value) {
      case "AZ":
        sortedCollection.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "ZA":
        sortedCollection.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "LowToHigh":
        sortedCollection.sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
        break;
      case "HighToLow":
        sortedCollection.sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        );
        break;
      default:
        break;
    }

    setCurrentItems(sortedCollection);
    // console.log(sortedCollection);
  };
  return (
    <>
      <div className="flex flex-col gap-1">
        <div className="my-auto sm:text-xs lg:text-base flex">
          <span className="mr-1">Sort </span> <span>by:</span>
        </div>
        <div className="flex">
          <select
            value={selectedMenu}
            onChange={(e) => filterCollectionBySort(e.target.value)}
            className="rounded-md p-2 sm:text-xs lg:text-base bg-transparent border border-black w-[80%] focus:bg-black"
          >
            <option value="All">All</option>
            <option value="AZ">A - Z</option>
            <option value="ZA">Z - A</option>
            <option value="LowToHigh">Price: Low to High</option>
            <option value="HighToLow">Price: High to Low</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default SortMenu;