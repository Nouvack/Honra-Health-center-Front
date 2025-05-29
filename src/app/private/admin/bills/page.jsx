"use client";

import { useState } from "react";
import "@/style/medicStuff.css";
import BillCard from "@/app/private/components/BillCard";

export default function BillsPage() {
  const [search, setSearch] = useState("");
  const [bills, setBills] = useState([
    {
      billNumber: "B001",
      patientId: "P123",
      totalPrice: 350.0,
      treatmentId: "T001",
    },
    {
      billNumber: "B002",
      patientId: "P124",
      totalPrice: 540.5,
      treatmentId: "T002",
    },
    {
      billNumber: "B003",
      patientId: "P125",
      totalPrice: 120.0,
      treatmentId: "T003",
    },
  ]);

  const filteredBills = bills.filter((bill) =>
    bill.billNumber.toLowerCase().includes(search.toLowerCase()) ||
    bill.patientId.toLowerCase().includes(search.toLowerCase()) ||
    bill.treatmentId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="doctor-management-container">
      <img src="/images/logo.png" alt="Logo" className="logo" />
      <h2 className="title">Bill Management</h2>

      <input
        type="text"
        placeholder="Search by Bill #, Patient ID, or Treatment ID"
        className="form-field"
        style={{ maxWidth: "400px", marginBottom: "20px" }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="doctor-list">
        {filteredBills.map((bill) => (
          <BillCard key={bill.billNumber} bill={bill} />
        ))}
        {filteredBills.length === 0 && (
          <p style={{ color: "#6b7280", marginTop: "1rem" }}>
            No bills found.
          </p>
        )}
      </div>
    </div>
  );
}
