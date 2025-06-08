"use client";

import { useState } from "react";
import "@/style/medicStuff.css";
import BillCard from "@/app/private/components/BillCard";

export default function BillsPage() {
    const [search, setSearch] = useState("");
    const [bills, setBills] = useState([]);

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
