// frontend/src/components/SummaryCards.jsx
import React from "react";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value || 0);

const SummaryCards = ({ sales }) => {
  const totalUnits = sales.reduce((sum, s) => sum + (s.quantity || 0), 0);
  const totalAmount = sales.reduce(
    (sum, s) => sum + (s.finalAmount ?? s.totalAmount ?? 0),
    0
  );
  const avgOrder = sales.length ? totalAmount / sales.length : 0;

  return (
    <div className="summary-cards">
      <div className="summary-card">
        <div className="summary-label">Total units sold</div>
        <div className="summary-value">{totalUnits}</div>
      </div>
      <div className="summary-card">
        <div className="summary-label">Total amount</div>
        <div className="summary-value">{formatCurrency(totalAmount)}</div>
      </div>
      <div className="summary-card">
        <div className="summary-label">Avg order amount</div>
        <div className="summary-value">{formatCurrency(avgOrder)}</div>
      </div>
    </div>
  );
};

export default SummaryCards;
