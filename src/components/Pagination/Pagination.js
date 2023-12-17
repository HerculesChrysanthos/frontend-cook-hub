import React from "react";

const Pagination = ({ currentPage, totalRecipes, onPageChange }) => {
  const pageSize = 9;
  const totalPages = Math.ceil(totalRecipes / pageSize);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  console.log('totalPages',totalPages )
  console.log('currentPage',currentPage )

  return (
    <div>
      <span>
        Page {currentPage + 1} of {totalPages}
      </span>
      <button
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page - 1)}
          style={{ fontWeight: currentPage === page ? "bold" : "normal" }}
        >
          {page}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
