import fs from "fs";
import path from "path";
import csv from "csv-parser";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import Sale from "../models/Sale.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csvPath = path.join(__dirname, "..", "data", "sales.csv");

// how many docs to insert in one batch
const BATCH_SIZE = 500;

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Optional: clear existing data
    await Sale.deleteMany({});
    console.log("🧹 Cleared existing sales collection");

    let docs = [];
    let totalInserted = 0;

    const stream = fs.createReadStream(csvPath).pipe(csv());

    await new Promise((resolve, reject) => {
      stream
        .on("data", async (row) => {
          // build one document
          const doc = {
            customerId: row["Customer ID"],
            customerName: row["Customer Name"],
            phoneNumber: row["Phone Number"],
            gender: row["Gender"],
            age: row["Age"] ? Number(row["Age"]) : undefined,
            customerRegion: row["Customer Region"],
            customerType: row["Customer Type"],
            productId: row["Product ID"],
            productName: row["Product Name"],
            brand: row["Brand"],
            productCategory: row["Product Category"],
            tags: (row["Tags"] || "")
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean),
            quantity: row["Quantity"] ? Number(row["Quantity"]) : 0,
            pricePerUnit: row["Price per Unit"]
              ? Number(row["Price per Unit"])
              : 0,
            discountPercentage: row["Discount Percentage"]
              ? Number(row["Discount Percentage"])
              : 0,
            totalAmount: row["Total Amount"]
              ? Number(row["Total Amount"])
              : 0,
            finalAmount: row["Final Amount"]
              ? Number(row["Final Amount"])
              : 0,
            date: row["Date"] ? new Date(row["Date"]) : null,
            paymentMethod: row["Payment Method"],
            orderStatus: row["Order Status"],
            deliveryType: row["Delivery Type"],
            storeId: row["Store ID"],
            storeLocation: row["Store Location"],
            salespersonId: row["Salesperson ID"],
            employeeName: row["Employee Name"]
          };

          docs.push(doc);

          // if we reached batch size, pause stream, insert, then resume
          if (docs.length >= BATCH_SIZE) {
            stream.pause();
            try {
              await Sale.insertMany(docs);
              totalInserted += docs.length;
              console.log(`Inserted ${totalInserted} documents so far...`);
              docs = []; // clear memory
            } catch (err) {
              return reject(err);
            }
            stream.resume();
          }
        })
        .on("end", async () => {
          // insert remaining docs
          if (docs.length > 0) {
            await Sale.insertMany(docs);
            totalInserted += docs.length;
          }
          console.log(`✅ Done. Inserted total ${totalInserted} documents.`);
          resolve();
        })
        .on("error", (err) => {
          reject(err);
        });
    });

    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

seed();
