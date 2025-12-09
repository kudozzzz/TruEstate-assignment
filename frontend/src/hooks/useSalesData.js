// frontend/src/hooks/useSalesData.js
import { useState } from "react";
import { fetchSales } from "../services/api";

const initialFilters = {
  regions: [],
  genders: [],
  categories: [],
  tags: [],
  paymentMethods: [],
  ageMin: "",
  ageMax: "",
  dateFrom: "",
  dateTo: ""
};

export default function useSalesData() {
  const [filters, setFilters] = useState(initialFilters);
  const [sort, setSort] = useState({ sortBy: "date", sortOrder: "desc" });
  const [search, setSearch] = useState("");
  const [sales, setSales] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadSales = async (targetPage = 1, extraParams = {}) => {
    setLoading(true);
    setError("");

    try {
      const params = {
        page: targetPage,
        search: search || undefined,
        region: filters.regions.join(",") || undefined,
        gender: filters.genders.join(",") || undefined,
        category: filters.categories.join(",") || undefined,
        tags: filters.tags.join(",") || undefined,
        paymentMethod: filters.paymentMethods.join(",") || undefined,
        ageMin: filters.ageMin || undefined,
        ageMax: filters.ageMax || undefined,
        dateFrom: filters.dateFrom || undefined,
        dateTo: filters.dateTo || undefined,
        sortBy: sort.sortBy,
        sortOrder: sort.sortOrder,
        ...extraParams
      };

      const result = await fetchSales(params);
      setSales(result.data || []);
      setTotalPages(result.totalPages || 1);
      setPage(result.page || 1);
    } catch (err) {
      console.error("Error fetching sales:", err);
      setError("Failed to load sales");
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilters = () => {
    loadSales(1);
  };

  const handleApplySort = () => {
    loadSales(page);
  };

  const handleSearchSubmit = () => {
    loadSales(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    loadSales(newPage);
  };

  return {
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
  };
}
