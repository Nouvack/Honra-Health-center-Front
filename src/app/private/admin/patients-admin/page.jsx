"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllPatients, deletePatient } from "@private/functions";
import Header from "../../components/Header";

export default function PatientManager() {
  const [patients, setPatients] = useState([]);
  const [selected, setSelected] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllPatients();
      setPatients(data);
    };
    fetchData();
  }, []);

  const formatDate = (iso) =>
    iso ? new Date(iso).toLocaleDateString() : "—";

  const handleSelect = (patient) => {
    setSelected(patient);
  };

  const handleEdit = () => {
    if (selected) {
      router.push(`/private/admin/patients-admin/update-patient/${selected._id}`);
    }
  };

  const handleDelete = async () => {
    if (!selected) return;

    const confirmDelete = confirm(
      `Are you sure you want to delete ${selected.name}?`
    );
    if (!confirmDelete) return;

    try {
      await deletePatient(selected._id);
      setPatients((prev) =>
        prev.filter((p) => p._id !== selected._id)
      );
      setSelected(null);
    } catch (error) {
      console.error("Error deleting patient:", error);
      alert("Failed to delete patient.");
    }
  };

  const handleRegister = () => {
    router.push("./patients-admin/register-patient");
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <Header />
      <p className="font-bold">PATIENTS</p>
      <hr className="w-5/6 border-[var(--turquoise)] mb-10" />
      
      <button
        onClick={handleRegister}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Register Patient
      </button>
    

      <div className="overflow-x-auto rounded border border-gray-200 shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">DNI</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Registered</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {patients.map((p) => (
              <tr
                key={p._id}
                className={`cursor-pointer hover:bg-gray-100 ${
                  selected?._id === p._id ? "bg-blue-100" : ""
                }`}
                onClick={() => handleSelect(p)}
              >
                <td className="px-4 py-2">{p.name} {p.surname}</td>
                <td className="px-4 py-2">{p.email}</td>
                <td className="px-4 py-2">{p.DNI}</td>
                <td className="px-4 py-2">{p.phoneNumber}</td>
                <td className="px-4 py-2">{formatDate(p.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleEdit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
