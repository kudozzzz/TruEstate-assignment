// frontend/src/App.jsx
import React from "react";
import "./styles/global.css";
import useSalesData from "./hooks/useSalesData";
import SearchBar from "./components/SearchBar";
import SortDropdown from "./components/SortDropdown";
import FiltersBar from "./components/FiltersBar";
import SummaryCards from "./components/SummaryCards";
import TransactionsTable from "./components/TransactionsTable";
import PaginationControls from "./components/PaginationControls";

function App() {
  const {
    filters,
    setFilters,
    sort,
    setSort,
    search,
    setSearch,
    sales,
    loading,
    error,
    page,
    totalPages,
    handleApplyFilters,
    handleApplySort,
    handleSearchSubmit,
    handlePageChange
  } = useSalesData();

  return (
    <div className="app-root">
      <header className="app-header">
        <h1 className="app-title">Retail Sales Management System</h1>
      </header>

      <main className="app-main">
        <div className="top-row">
          <SearchBar
            value={search}
            onChange={setSearch}
            onSearch={handleSearchSubmit}
          />
          <SortDropdown
            sort={sort}
            setSort={setSort}
            onApplySort={handleApplySort}
          />
        </div>

        <SummaryCards sales={sales} />

        <FiltersBar
          filters={filters}
          setFilters={setFilters}
          onApplyFilters={handleApplyFilters}
        />

        <TransactionsTable sales={sales} loading={loading} error={error} />

        <PaginationControls
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
    </div>
  );
}

export default App;
