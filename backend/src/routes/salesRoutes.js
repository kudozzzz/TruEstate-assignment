import { Router } from "express";
import { getSales } from "../controllers/salesController.js";

const router = Router();

// GET /api/sales
router.get("/", getSales);

export default router;
