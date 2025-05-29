"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "@/style/medicStuff.css";
import DoctorCard from "@/components/private/admin/DoctorCard";
import AuthAction from "@/components/private/auth";

export default function DoctorManagement() {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      firstName: "Alice",
      lastName: "Smith",
      email: "alice@example.com",
      specialty: "Cardiology",
      description: "10 years experience in cardiac care.",
      shifts: ["Morning"],
      workingDays: ["Monday", "Wednesday", "Friday"],
      photoUrl: "/images/doctor1.jpg",
    },
    {
      id: 2,
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      specialty: "Neurology",
      description: "5 years experience in neurology.",
      shifts: ["Night"],
      workingDays: ["Monday","Tuesday", "Wednesday", "Friday"],
      photoUrl: "/images/doctor2.jpg",
    },
  ]);

  const [showAuth, setShowAuth] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const router = useRouter();

  // Triggered when Delete is clicked
  const handleDeleteRequest = (id) => {
    setPendingDeleteId(id);
    setShowAuth(true);
  };

  // Auth successful
  const handleAuthSubmit = ({ email, password }) => {
    if (email === "admin@example.com" && password === "password123") {
      setDoctors(doctors.filter((doc) => doc.id !== pendingDeleteId));
      setShowAuth(false);
      setPendingDeleteId(null);
    } else {
      alert("Authentication failed. Please try again.");
    }
  };

  const handleEdit = (doctor) => {
    alert(`Edit doctor: ${doctor.firstName}`);
  };

  const handleRegisterDoctor = () => {
    router.push("/private/admin/doctors-admin/register-doctor");
  };

  return (
    <div className="doctor-management-container">
      <img src="/images/logo.png" alt="Logo" className="logo" />
      <h2 className="title">Doctor Management</h2>
      <button className="button primary" onClick={handleRegisterDoctor}>
        Register Doctor
      </button>

      <div className="doctor-list">
        {doctors.map((doc) => (
          <DoctorCard
            key={doc.id}
            doctor={doc}
            onDelete={handleDeleteRequest} // use secure delete
          />
        ))}
      </div>

      {showAuth && (
        <AuthAction
          onSubmit={handleAuthSubmit}
          onCancel={() => {
            setShowAuth(false);
            setPendingDeleteId(null);
          }}
        />
      )}
    </div>
  );
}
