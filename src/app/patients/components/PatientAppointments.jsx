"use client";

import { useEffect, useState } from "react";
import { cancelAppointment, getPatientAppointments } from "../functions";

export default function PatientAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      const res = await getPatientAppointments();
      if (res.success && Array.isArray(res.appointments)) {
        setAppointments(res.appointments);
      } else {
        setAppointments([]);
      }
      setLoading(false);
    };
    fetchAppointments();
  }, []);

  const handleCancel = async (id) => {
    setCancelingId(id);
    const res = await cancelAppointment(id);
    if (res.success) {
      setAppointments((prev) => prev.filter((a) => a.id !== id));
      alert("Appointment canceled.");
    } else {
      alert(res.message || "Failed to cancel appointment.");
    }
    setCancelingId(null);
  };

  if (loading) {
    return <div className="p-8 text-center">Loading appointments...</div>;
  }

  if (!appointments.length) {
    return <div className="p-8 text-center text-gray-500">No appointments found.</div>;
  }

  return (
    <div className="main-content bg-[var(--seasalt)] py-10 px-6">
      <h2 className="text-3xl font-bold mb-6" style={{ color: "var(--outer_space)" }}>
        Appointments
      </h2>
      <div className="flex flex-col gap-6">
        {appointments.map((a) => (
          <div
            key={a.id}
            className="bg-white rounded-lg shadow-sm border border-[var(--mint_green)] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div className="flex-1">
              <p>
                <strong>Date:</strong> {new Date(a.date).toLocaleString()}
              </p>
              <p>
                <strong>Doctor:</strong> Dr. {a.doctor.name} {a.doctor.surname}
              </p>
              <p>
                <strong>Patient:</strong> {a.patient.name} {a.patient.surname}
              </p>
              <p>
                <strong>Treatment:</strong> {a.treatment.name}
              </p>
              <p>
                <strong>Specialty:</strong> {a.treatment.type}
              </p>
              <p>
                <strong>Price:</strong> ${a.treatment.price}
              </p>
              {a.observation && (
                <p>
                  <strong>Observation:</strong> {a.observation}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                onClick={() => handleCancel(a.id)}
                disabled={cancelingId === a.id}
              >
                {cancelingId === a.id ? "Canceling..." : "Cancel Appointment"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}