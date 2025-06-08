"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { logOut } from "@private/functions";
import './style.css'

export default function Admin() {
  const router = useRouter();

  const handleLogout = async () => {
    await logOut()
    router.push("/private")
  };

  const navigate = (path) => () => router.push(path);

  return (
    <section className="admin-home w-full h-screen flex flex-col justify-center items-center">
      <Image src={"/images/logo.png"} alt="logo" width={150} height={50}/>

      {/* Admin ID */}
      <p className="text-sm text-gray-600 p-4 font-bold">WELCOME ADMIN</p>

      {/* Button Grid */}
      <div className="grid grid-cols-3 gap-2">
        <button onClick={navigate("/private/admin/doctors-admin")} > Doctors </button>
        <button onClick={navigate("/private/appointments")} > Appointments </button>
        <button onClick={navigate("/private/admin/patients-admin")} > Patients </button>
        <button onClick={navigate("/private/admin/bills")} > Invoices </button>
        <button onClick={navigate("/private/admin/treatments")}>Treatments</button>
        <button onClick={navigate("/private/admin/logs")}>Logs</button>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </section>
  );
}
