// frontend/src/components/TransactionsTable.jsx
import React from "react";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value || 0);

const formatDate = (value) =>
  value ? new Date(value).toISOString().slice(0, 10) : "";

const TransactionsTable = ({ sales, loading, error }) => {
  if (loading) {
    return <div className="table-status">Loading sales...</div>;
  }

  if (error) {
    return <div className="table-status table-error">Error: {error}</div>;
  }

  if (!sales.length) {
    return (
      <div className="table-status">No data yet. Apply filters or search.</div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="sales-table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Phone Number</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Product Category</th>
            <th>Quantity</th>
            <th>Total Amount</th>
            <th>Customer Region</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale._id}>
              <td>{sale.transactionId || sale._id?.slice(-6)}</td>
              <td>{formatDate(sale.date)}</td>
              <td>{sale.customerId}</td>
              <td>{sale.customerName}</td>
              <td>{sale.phoneNumber}</td>
              <td>{sale.gender}</td>
              <td>{sale.age}</td>
              <td>{sale.productCategory}</td>
              <td>{sale.quantity}</td>
              <td>{formatCurrency(sale.finalAmount ?? sale.totalAmount)}</td>
              <td>{sale.customerRegion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
