import React, { useState, useEffect } from "react";

const SortByNames = ({ setCurrentItems, catalogueProduct }) => {
  const [selectedName, setSelectedName] = useState(""); // State for selected name
  const [uniqueNames, setUniqueNames] = useState([]); // State for unique product names

  useEffect(() => {
    if (catalogueProduct) {
      const names = [...new Set(catalogueProduct.map(item => item.name))];
      setUniqueNames(names);
    }
  }, [catalogueProduct]);

  // Filter products by name
  const filterCollectionByName = (name) => {
    setSelectedName(name);
    const filtered = catalogueProduct.filter(
      (item) => name === "all" || item.name === name
    );
    setCurrentItems(filtered);
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="my-auto sm:text-xs lg:text-base mr-2">Name:</div>
      <select
        value={selectedName}
        onChange={(e) => filterCollectionByName(e.target.value)}
        className="rounded-md p-2 sm:text-xs lg:text-base bg-transparent border border-black w-[80%] focus:bg-black"
      >
        <option value="all">All Names</option>
        {uniqueNames.map((name, index) => (
          <option key={index} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortByNames;