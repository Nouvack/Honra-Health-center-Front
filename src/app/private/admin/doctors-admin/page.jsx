"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "@/style/medicStuff.css";
import DoctorCard from "@/app/private/components/DoctorCard";
import DoctorDetails from "@/app/private/components/DoctorDetails"; // import modal
import { getDoctors } from "../functions";

export default function DoctorManagement() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchDoctors() {
      const data = await getDoctors();

      const transformed = data.map((doc) => ({
        id: doc._id,
        firstName: doc.firstname,
        lastName: doc.lastname,
        email: doc.email,
        specialty: doc.specialty,
        description: doc.description,
        shifts: doc.shift,
        workingDays: doc.workdays,
        photoUrl: doc.img || "/images/default-doctor.png",
      }));

      setDoctors(transformed);
    }

    fetchDoctors();
  }, []);

  const handleDetails = (id) => {
    const doc = doctors.find((d) => d.id === id);
    if (doc) setSelectedDoctor(doc);
  };

  const handleCloseModal = () => setSelectedDoctor(null);

  const handleDelete = (id) => {
    setDoctors((prev) => prev.filter((doc) => doc.id !== id));
    setSelectedDoctor(null);
  };

  const handleEdit = (doctor) => {
     router.push(`/private/admin/doctors-admin/edit-doctor/${doctor.id}`);
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
            onClick={handleDetails}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Show doctor details modal if selected */}
      {selectedDoctor && (
        <DoctorDetails
          doctor={selectedDoctor}
          onDelete={handleDelete}
          onClose={handleCloseModal}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
}
