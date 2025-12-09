import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { fileURLToPath } from "url";
import { applyFiltersAndSearch } from "../utils/filterUtils.js";
import { paginate } from "../utils/paginationUtils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let SALES_DATA = [];
let loaded = false;

const loadData = () => {
  return new Promise((resolve, reject) => {
    if (loaded) return resolve(SALES_DATA);

    const results = [];
    const csvPath = path.resolve(__dirname, "../data/sales.csv");
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (row) => {
        // Normalize field names as needed according to your CSV headers
        results.push({
          customerId: row["Customer ID"],
          customerName: row["Customer Name"],
          phoneNumber: row["Phone Number"],
          gender: row["Gender"],
          age: Number(row["Age"]) || null,
          customerRegion: row["Customer Region"],
          customerType: row["Customer Type"],
          productId: row["Product ID"],
          productName: row["Product Name"],
          brand: row["Brand"],
          productCategory: row["Product Category"],
          tags: row["Tags"], // assumed comma-separated
          quantity: Number(row["Quantity"]) || 0,
          pricePerUnit: Number(row["Price per Unit"]) || 0,
          discountPercentage: Number(row["Discount Percentage"]) || 0,
          totalAmount: Number(row["Total Amount"]) || 0,
          finalAmount: Number(row["Final Amount"]) || 0,
          date: row["Date"],
          paymentMethod: row["Payment Method"],
          orderStatus: row["Order Status"],
          deliveryType: row["Delivery Type"],
          storeId: row["Store ID"],
          storeLocation: row["Store Location"],
          salespersonId: row["Salesperson ID"],
          employeeName: row["Employee Name"]
        });
      })
      .on("end", () => {
        SALES_DATA = results;
        loaded = true;
        resolve(SALES_DATA);
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

export const fetchFilteredSales = async (queryParams) => {
  const data = await loadData();

  const filtered = applyFiltersAndSearch(data, queryParams);

  const { pageItems, totalItems, totalPages, currentPage } = paginate(
    filtered,
    queryParams.page
  );

  return {
    data: pageItems,
    totalItems,
    totalPages,
    page: currentPage
  };
};
