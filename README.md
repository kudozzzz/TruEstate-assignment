# Retail Sales Management System

## 1. Overview 

This project is a full-stack Retail Sales Management System built for the TruEstate SDE Intern assignment. It loads a structured sales dataset and exposes a backend API that supports combined search, multi-select filters, sorting, and pagination. The React frontend provides a clean UI (search bar, filter panel, transaction table, sorting dropdown, and pagination controls) aligned with the provided structure.

## 2. Tech Stack

- **Backend**: Node.js, Express, csv-parser
- **Frontend**: React, Vite
- **Other**: Fetch API, CSS

## 3. Search Implementation Summary

- Full-text search is implemented server-side over Customer Name and Phone Number.
- Search is **case-insensitive** and works in combination with all filters and sorting.
- Search logic lives in `backend/src/utils/filterUtils.js`, used by `salesService`.

## 4. Filter Implementation Summary

- Multi-select / range filters:
  - Customer Region, Gender, Product Category, Tags, Payment Method.
  - Age (min/max) and Date (from/to) as numeric and date ranges.
- Multi-select values are passed as comma-separated query parameters and parsed on the backend.
- Filters are composable and maintained alongside search and sorting.

## 5. Sorting Implementation Summary

- Sorting is server-side on:
  - Date (default: newest first)
  - Quantity
  - Customer Name (A–Z)
- Sort field and order are controlled via `sortBy` and `sortOrder` query parameters.
- Sorting is applied after filtering/searching to avoid duplicate logic.

## 6. Pagination Implementation Summary

- Pagination is implemented server-side with a fixed **page size of 10**.
- The backend returns `data`, `totalItems`, `totalPages`, and `page` for each request.
- The frontend renders Next/Previous controls while preserving search, filters, and sorting state.

## 7. Setup Instructions

### Backend

```bash
cd backend
npm install
# Place dataset as src/data/sales.csv
npm run start
# API at http://localhost:4000
