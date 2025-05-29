import React from "react";

export default function BillCard({ bill }) {
  return (
    <div className="doctor-card">
      <div className="doctor-info">
        <h3 className="doctor-name">Bill #{bill.billNumber}</h3>
        <p className="doctor-detail"><strong>Patient ID:</strong> {bill.patientId}</p>
        <p className="doctor-detail"><strong>Treatment ID:</strong> {bill.treatmentId}</p>
        <p className="doctor-detail"><strong>Total Price:</strong> ${bill.totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
}
