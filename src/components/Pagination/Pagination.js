import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

const Pagination = ({ currentPage, totalRecipes, onPageChange }) => {
  const pageSize = 9;
  const totalPages = Math.ceil(totalRecipes / pageSize);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  console.log("totalPages", totalPages);
  console.log("currentPage", currentPage);

  return (
    <div className="pagination">
      {/* <span>
        Page {currentPage + 1} of {totalPages}
      </span> */}
      <button
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <IoIosArrowBack />
      </button>
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page - 1)}
          className={currentPage + 1 === page && "pagination-selected"}
        >
          {page}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default Pagination;
