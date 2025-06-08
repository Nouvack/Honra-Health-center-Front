"use client";

import { deleteDoctor } from "@/app/private/shared_components/functions";

export default function DoctorDetails({ doctor, onDelete, onEdit, onClose }) {
  if (!doctor) return null;

  const handleDelete = async () => {
    try {
      await deleteDoctor(doctor.id);
      onDelete(doctor.id);
      onClose();
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl font-bold text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>

        <div className="flex items-center gap-4 mb-4">
          <img
            src={doctor.photoUrl || "/images/default-doctor.png"}
            alt={`${doctor.firstName} ${doctor.lastName}`}
            className="w-24 h-24 rounded-full object-cover border"
          />
          <div>
            <h2 className="text-xl font-bold">
              {doctor.firstName} {doctor.lastName}
            </h2>
            <p className="text-gray-500">{doctor.specialty}</p>
            <p className="text-sm text-gray-700">{doctor.email}</p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          {doctor.description && (
            <p>
              <strong>Description:</strong> {doctor.description}
            </p>
          )}
          {doctor.shifts?.length > 0 && (
            <p>
              <strong>Shifts:</strong> {doctor.shifts.join(", ")}
            </p>
          )}
          {doctor.workingDays?.length > 0 && (
            <p>
              <strong>Working Days:</strong> {doctor.workingDays.join(", ")}
            </p>
          )}

          <div className="doctor-actions">
            {onEdit && (
              <button className="button primary" onClick={() => onEdit(doctor)}>
                Edit
              </button>
            )}
            {onDelete && (
              <button className="delete-btn" onClick={handleDelete}>
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
