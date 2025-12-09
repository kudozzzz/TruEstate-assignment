// frontend/src/components/FiltersBar.jsx
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

const MultiSelectPillGroup = ({ label, options, values, onToggle }) => (
  <div className="filter-chip-group">
    <span className="filter-chip-label">{label}</span>
    <div className="filter-chip-options">
      {options.map((opt) => {
        const active = values.includes(opt);
        return (
          <button
            type="button"
            key={opt}
            className={`filter-chip ${active ? "filter-chip-active" : ""}`}
            onClick={() => onToggle(opt)}
          >
            {opt}
          </button>
        );
      })}
    </div>
  </div>
);

const FiltersBar = ({ filters, setFilters, onApplyFilters }) => {
  const toggleGroup = (groupName, value) => {
    setFilters((prev) => ({
      ...prev,
      [groupName]: toggleInArray(prev[groupName], value)
    }));
  };

  const handleFieldChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="filters-bar">
      <MultiSelectPillGroup
        label="Region"
        options={REGION_OPTIONS}
        values={filters.regions}
        onToggle={(opt) => toggleGroup("regions", opt)}
      />

      <MultiSelectPillGroup
        label="Gender"
        options={GENDER_OPTIONS}
        values={filters.genders}
        onToggle={(opt) => toggleGroup("genders", opt)}
      />

      <MultiSelectPillGroup
        label="Product Category"
        options={CATEGORY_OPTIONS}
        values={filters.categories}
        onToggle={(opt) => toggleGroup("categories", opt)}
      />

      <MultiSelectPillGroup
        label="Tags"
        options={TAG_OPTIONS}
        values={filters.tags}
        onToggle={(opt) => toggleGroup("tags", opt)}
      />

      <MultiSelectPillGroup
        label="Payment Method"
        options={PAYMENT_OPTIONS}
        values={filters.paymentMethods}
        onToggle={(opt) => toggleGroup("paymentMethods", opt)}
      />

      <div className="filters-bar-dates">
        <div className="filter-inline-field">
          <label>Date</label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => handleFieldChange("dateFrom", e.target.value)}
          />
        </div>
        <div className="filter-inline-field">
          <label>&nbsp;</label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => handleFieldChange("dateTo", e.target.value)}
          />
        </div>
      </div>

      <button className="btn-primary" onClick={onApplyFilters}>
        Apply Filters
      </button>
    </div>
  );
};

export default FiltersBar;
