"use client"
import { useEffect, useState } from "react";
import { getPatientInvoices } from "../functions";

export default function PatientInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchInvoices() {
      setLoading(true);
      const res = await getPatientInvoices();
      if (res.success) {
        setInvoices(res.invoices);
        setError("");
      } else {
        setError(res.message || "Failed to load invoices");
      }
      setLoading(false);
    }
    fetchInvoices();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading invoices...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;
  if (!invoices.length) return <div className="p-4 text-center text-gray-500">No invoices found.</div>;

  return (
    <section className="max-w-3xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--outer_space)" }}>
        My Invoices
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-[var(--mint_green)] text-[var(--outer_space)]">
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Treatment</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">DNI</th>
              <th className="py-2 px-4">Invoice #</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(inv => (
              <tr key={inv._id} className="border-t">
                <td className="py-2 px-4">{new Date(inv.createdAt).toLocaleDateString()}</td>
                <td className="py-2 px-4">{inv.treatmentId?.name}</td>
                <td className="py-2 px-4">${inv.amount}</td>
                <td className="py-2 px-4">{inv.patientId?.DNI}</td>
                <td className="py-2 px-4 font-mono">#{inv._id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}