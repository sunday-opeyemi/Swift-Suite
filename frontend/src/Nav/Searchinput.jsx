import React from "react";
import { BsSearch } from "react-icons/bs";

const Searchinput = () => {
  return (
    <div>
      <div className="flex lg:w-[140%] md:w-[100%] lg:ms-0 md:ms-0 ms-5 items-center lg:gap-[100px] md:gap-[100px] bg-green-50 rounded  ">
        <input
          className="lg:block hidden bg-transparent px-3 outline-none  w-[150px] md:w-[100%] lg:w-[100%]"
          type="text"
          placeholder="Search..."
        />
        <button
          type="submit"
          className="lg:block hidden text-white bg-green-800 rounded p-3 cursor-pointer lg:ms-28"
        >
          <BsSearch className="lg:block hidden" />
        </button>
      </div>
    </div>
  );
};

export default Searchinput;
