"use client";

import React from "react";

export default function DoctorCard({ doctor, onEdit, onDelete }) {
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

        {doctor.shifts?.length > 0 && (
          <p className="doctor-detail"><strong>Shifts:</strong> {doctor.shifts.join(", ")}</p>
        )}

        {doctor.workingDays?.length > 0 && (
          <p className="doctor-detail"><strong>Working Days:</strong> {doctor.workingDays.join(", ")}</p>
        )}
      </div>

      <div className="doctor-actions">
        <button onClick={() => onDelete(doctor.id)} className="action-btn delete-btn">Delete</button>
      </div>
    </div>
  );
}
