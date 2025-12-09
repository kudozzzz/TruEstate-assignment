import React from "react";

const SortDropdown = ({ sort, onChange, onApply }) => {
  const handleSortByChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="sort-dropdown">
      <label>
        Sort by:{" "}
        <select value={sort.sortBy} onChange={handleSortByChange}>
          <option value="date">Date (Newest First)</option>
          <option value="quantity">Quantity</option>
          <option value="customerName">Customer Name (A–Z)</option>
        </select>
      </label>
      <button onClick={onApply}>Apply Sort</button>
    </div>
  );
};

export default SortDropdown;
