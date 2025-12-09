// backend/src/controllers/salesController.js
import { getSales } from "../services/salesService.js";

export async function getSalesHandler(req, res, next) {
  try {
    const result = await getSales(req.query);
    res.json(result);
  } catch (err) {
    console.error("Error in getSalesHandler:", err);
    next(err);
  }
}
