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

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend server listening on port ${PORT}`);
});


app.use("/api/sales", salesRouter);

// simple error handler so app doesn't crash silently
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});
