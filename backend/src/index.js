import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import salesRouter from "./routes/salesRoutes.js";

dotenv.config();
connectDB(); // connect to MongoDB

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Retail Sales Management API running" });
});

app.use("/api/sales", salesRouter);

app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});
