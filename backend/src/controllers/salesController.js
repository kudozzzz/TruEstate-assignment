import { fetchFilteredSales } from "../services/salesService.js";

export const getSales = async (req, res) => {
  try {
    const {
      search,
      phone,
      region,
      gender,
      ageMin,
      ageMax,
      category,
      tags,
      paymentMethod,
      dateFrom,
      dateTo,
      sortBy,
      sortOrder,
      page
    } = req.query;

    const queryParams = {
      search,
      phone,
      region,
      gender,
      ageMin,
      ageMax,
      category,
      tags,
      paymentMethod,
      dateFrom,
      dateTo,
      sortBy,
      sortOrder,
      page
    };

    const result = await fetchFilteredSales(queryParams);

    return res.json(result);
  } catch (err) {
    console.error("Error in getSales:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
