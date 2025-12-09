// frontend/src/services/api.js

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export async function fetchSales(params = {}) {
  const url = new URL(`${API_BASE_URL}/api/sales`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "" && value !== null) {
      url.searchParams.append(key, value);
    }
  });

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error("Failed to fetch sales");
  }

  return res.json();
}
