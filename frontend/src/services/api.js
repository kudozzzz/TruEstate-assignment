// frontend/src/services/api.js

// Base API URL - read from Vercel environment variable OR fall back to Render backend URL
const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://truestate-assignment-pgbh.onrender.com";

export async function fetchSales(params = {}) {
  const url = new URL(`${API_BASE}/api/sales`);

  // Attach all filters / search params to URL
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "" && value !== null) {
      url.searchParams.append(key, value);
    }
  });

  // Fetch from backend
  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error("Failed to fetch sales");
  }

  return res.json();
}
