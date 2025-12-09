// frontend/src/components/PaginationControls.jsx
import React from "react";

const PaginationControls = ({ page, totalPages, onPageChange }) => {
  return (
    <div className="pagination">
      <button
        className="btn-secondary"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </button>
      <span className="pagination-info">
        Page {page} of {totalPages}
      </span>
      <button
        className="btn-secondary"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
