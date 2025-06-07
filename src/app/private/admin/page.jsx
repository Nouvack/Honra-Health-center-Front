"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { logOut } from "@private/functions";

export default function Admin({ id }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logOut(); // Use your actual logout function
      router.push("/logout"); // Or redirect to login/home
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navigate = (path) => () => router.push(path);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-white px-4">
      {/* Logout Button */}
      <div className="absolute top-6 right-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-lg transition"
        >
          Log out
        </button>
      </div>

      {/* Logo */}
      <div className="mb-4">
        <Image src="/images/logo.png" alt="HONRA Health Center" width={160} height={60} />
      </div>

      {/* Admin ID */}
      <p className="text-sm text-gray-600 mb-10">ADMIN ID: {id}</p>

      {/* Button Grid */}
      <div className="grid grid-cols-2 gap-6 w-full max-w-md">
        <button
          onClick={navigate("/private/admin/doctors-admin")}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl text-lg font-semibold shadow-md transition"
        >
          Doctors
        </button>

        <button
          onClick={navigate("/private/appointments")}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl text-lg font-semibold shadow-md transition"
        >
          Appointments
        </button>

        <button
          onClick={navigate("/private/admin/patients-admin")}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl text-lg font-semibold shadow-md transition"
        >
          Patients
        </button>

        <button
          onClick={navigate("/private/admin/bills")}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl text-lg font-semibold shadow-md transition"
        >
          Bills
        </button>
      </div>
    </section>
  );
}
