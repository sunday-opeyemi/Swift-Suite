// CustomPagination.js
import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CustomPagination = ({ pageCount, onPageChange, currentPage, itemsPerPage, totalItems }) => {
  const displayPageNumbers = () => {
    const pageNumbers = [];

    const maxPage = Math.min(currentPage + 5, pageCount);
    for (let i = currentPage; i < maxPage; i++) {
      pageNumbers.push(
        <li key={i} className={`inline-block ${currentPage === i ? 'rounded-[100%] font-bold bg-white text-[#089451] px-[2px]' : ''}`}>
          <button
            className="px-3 py-2 rounded-full focus:outline-none focus:ring focus:border-blue-900 transition-colors duration-300"
            onClick={() => onPageChange({ selected: i })}
          >
            {i + 1}
          </button>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-between me-10 text-sm  z-[100000]">
      <ul className="flex  space-x-2">
        {currentPage > 0 && (
          <li className="inline-block mx-1 text-sm ">
            <button
              className="px-1 py-1 rounded-full bg-white-500 text-white text-sm transition-colors duration-300"
              onClick={() => onPageChange({ selected: currentPage - 1 })}
            >
              <FaChevronLeft />
            </button>
          </li>
        )}
        <div className='mt-[-9px]'>

        {displayPageNumbers()}
        </div>
        {currentPage < pageCount - 1 && (
          <li className="inline-block mx-1">
            <button
              className="px-3 py-1  rounded-full text-sm bg-white-500 text-white  transition-colors duration-300"
              onClick={() => onPageChange({ selected: currentPage + 1 })}
            >
              <FaChevronRight />
            </button>
          </li>
        )}
      </ul>
      {/* <div className="w-40 text-sm border text-red-500 p-2">
      </div> */}
        
      <div className=''>
      Viewing {Math.min((currentPage + 1) * itemsPerPage, totalItems)} of {totalItems}
      </div>
    </div>
  );
};

export default CustomPagination;