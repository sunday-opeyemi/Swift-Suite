// CustomPagination.js
import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CustomPagination = ({ pageCount, onPageChange, currentPage, itemsPerPage, totalItems }) => {
  const displayPageNumbers = () => {
    const pageNumbers = [];

    const maxPage = Math.min(currentPage + 5, pageCount);
    for (let i = currentPage; i < maxPage; i++) {
      pageNumbers.push(
        <li key={i} className={`inline-block mx-1 ${currentPage === i ? 'font-bold bg-primary-600' : ''}`}>
          <button
            className="px-3 py-2 rounded-full focus:outline-none focus:ring focus:border-blue-300 transition-colors duration-300"
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
    <nav className="flex items-center lg:gap-[65%] mt-[-2%]  text-white text-sm  justify-center">
      <ul className="flex space-x-2">
        {currentPage > 0 && (
          <li className="inline-block mx-1 text-sm ">
            <button
              className="px-1 py-2 rounded-full bg-white-500 text-white text-sm focus:outline-none focus:ring focus:border-blue-300 hover:bg-blue-600 transition-colors duration-300"
              onClick={() => onPageChange({ selected: currentPage - 1 })}
            >
              <FaChevronLeft />
            </button>
          </li>
        )}
        {displayPageNumbers()}
        {currentPage < pageCount - 1 && (
          <li className="inline-block mx-1">
            <button
              className="px-3 py-3  rounded-full text-sm bg-white-500 text-white focus:outline-none focus:ring focus:border-blue-300 hover:bg-blue-600 transition-colors duration-300"
              onClick={() => onPageChange({ selected: currentPage + 1 })}
            >
              <FaChevronRight />
            </button>
          </li>
        )}
      </ul>
      <div className="ml-4 text-sm border p-2 text-white">
        Showing {Math.min((currentPage + 1) * itemsPerPage, totalItems)} of {totalItems}
      </div>
    </nav>
  );
};

export default CustomPagination;
