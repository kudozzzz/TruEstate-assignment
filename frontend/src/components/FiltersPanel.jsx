import React from "react";

const REGION_OPTIONS = ["North", "South", "East", "West", "Central"];
const GENDER_OPTIONS = ["Male", "Female"];
const CATEGORY_OPTIONS = [
  "Electronics",
  "Clothing",
  "Home & Kitchen",
  "Beauty",
  "Sports",
  "Grocery"
];
const PAYMENT_OPTIONS = [
  "UPI",
  "Credit Card",
  "Debit Card",
  "Cash",
  "Net Banking",
  "Wallet"
];

const TAG_OPTIONS = ["New", "Sale", "Discount", "Popular", "Trending"];

function toggleInArray(list, value) {
  if (list.includes(value)) {
    return list.filter((v) => v !== value);
  }
  return [...list, value];
}

const FiltersPanel = ({ filters, setFilters, onApplyFilters }) => {
  const handleCheckboxChange = (groupName, value) => {
    setFilters((prev) => ({
      ...prev,
      [groupName]: toggleInArray(prev[groupName], value)
    }));
  };

  const handleInputChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="filters-panel">
      <h3 className="filters-title">Filters</h3>

      {/* Region */}
      <div className="filter-group">
        <div className="filter-label">Region:</div>
        <div className="filter-options">
          {REGION_OPTIONS.map((opt) => (
            <label key={opt} className="filter-row">
              <input
                type="checkbox"
                checked={filters.regions.includes(opt)}
                onChange={() => handleCheckboxChange("regions", opt)}
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Gender */}
      <div className="filter-group">
        <div className="filter-label">Gender:</div>
        <div className="filter-options">
          {GENDER_OPTIONS.map((opt) => (
            <label key={opt} className="filter-row">
              <input
                type="checkbox"
                checked={filters.genders.includes(opt)}
                onChange={() => handleCheckboxChange("genders", opt)}
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Age range */}
      <div className="filter-group filter-inline">
        <div className="filter-inline-field">
          <div className="filter-label">Age Min:</div>
          <input
            type="number"
            value={filters.ageMin}
            onChange={(e) => handleInputChange("ageMin", e.target.value)}
          />
        </div>
        <div className="filter-inline-field">
          <div className="filter-label">Age Max:</div>
          <input
            type="number"
            value={filters.ageMax}
            onChange={(e) => handleInputChange("ageMax", e.target.value)}
          />
        </div>
      </div>

      {/* Category */}
      <div className="filter-group">
        <div className="filter-label">Product Category:</div>
        <div className="filter-options">
          {CATEGORY_OPTIONS.map((opt) => (
            <label key={opt} className="filter-row">
              <input
                type="checkbox"
                checked={filters.categories.includes(opt)}
                onChange={() => handleCheckboxChange("categories", opt)}
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="filter-group">
        <div className="filter-label">Tags:</div>
        <div className="filter-options">
          {TAG_OPTIONS.map((opt) => (
            <label key={opt} className="filter-row">
              <input
                type="checkbox"
                checked={filters.tags.includes(opt)}
                onChange={() => handleCheckboxChange("tags", opt)}
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="filter-group">
        <div className="filter-label">Payment Method:</div>
        <div className="filter-options">
          {PAYMENT_OPTIONS.map((opt) => (
            <label key={opt} className="filter-row">
              <input
                type="checkbox"
                checked={filters.paymentMethods.includes(opt)}
                onChange={() => handleCheckboxChange("paymentMethods", opt)}
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Date range */}
      <div className="filter-group filter-inline">
        <div className="filter-inline-field">
          <div className="filter-label">Date From:</div>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => handleInputChange("dateFrom", e.target.value)}
          />
        </div>
        <div className="filter-inline-field">
          <div className="filter-label">Date To:</div>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => handleInputChange("dateTo", e.target.value)}
          />
        </div>
      </div>

      <button className="btn-primary btn-full" onClick={onApplyFilters}>
        Apply Filters
      </button>
    </div>
  );
};

export default FiltersPanel;
