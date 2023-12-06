import React from "react";
import "../Pagination/Pagination.css";

const Pagination = ({
  total,
  totalPages,
  currentPage,
  hasNextPage,
  hasPreviousPage,
  setPage,
  setLimit,
  page,
  limit,
}) => {
  const handlePageChange = (newPage) => {
    if (newPage !== page) {
      setPage(newPage);
    }
  };

  const handleLimitChange = (newLimit) => {
    if (newLimit !== limit) {
      setLimit(newLimit);
    }
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  // const pageLimits = Array.from({ length: total }, (_, index) => index + 1);
  const pageLimits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="pagination">
      <div className="pagination_buttons">
        <button
          className="paginate_btn"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!hasPreviousPage}
        >
          Previous
        </button>

        <div className="page_number">
          {pageNumbers.map((pageNumber) => (
            <button
              id="buttonNumber"
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`${pageNumber === currentPage ? "active" : ""}`}
            >
              {pageNumber}
            </button>
          ))}
        </div>

        <button
          className="paginate_btn"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!hasNextPage}
        >
          Next
        </button>
      </div>
      <div className="item_per_page">
        <span>
          Items per page:{" "}
          <select
            onChange={(e) => handleLimitChange(Number(e.target.value))}
            value={limit}
          >
            {pageLimits.map((pageLimit) => (
              <option key={pageLimit} value={pageLimit}>
                {pageLimit}
              </option>
            ))}
          </select>
        </span>
      </div>
    </div>
  );
};

export default Pagination;
