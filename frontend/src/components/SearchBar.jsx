// frontend/src/components/SearchBar.jsx
import React from "react";

const SearchBar = ({ value, onChange, onSearch }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by customer name or phone..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="btn-primary" onClick={onSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
