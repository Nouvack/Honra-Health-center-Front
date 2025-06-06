//D
"use client";

import React from "react";
import "@/style/medicStuff.css";

export default function DoctorCard({ doctor, onEdit, onClick }) {
  return (
    <div className="doctor-card">
      <img
        src={doctor.photoUrl || "/images/default-doctor.png"}
        alt={`${doctor.firstName} ${doctor.lastName}`}
        className="doctor-photo"
      />

      <div className="doctor-info">
        <h3 className="doctor-name" style={{ textAlign: "center" }}>
          {doctor.firstName} {doctor.lastName}
        </h3>

        <p className="doctor-detail"><strong>Email:</strong> {doctor.email}</p>
        <p className="doctor-detail"><strong>Specialty:</strong> {doctor.specialty}</p>

        {doctor.description && (
          <p className="doctor-detail"><strong>Description:</strong> {doctor.description}</p>
        )}
      </div>

      <div className="doctor-actions">
        <button className="action-btn" onClick={() => onClick(doctor.id)}>
          Details
        </button>
       
      </div>
    </div>
  );
}
