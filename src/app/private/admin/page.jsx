"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AuthAction from "@/components/private/auth";

export default function Admin({ id }) {
    const router = useRouter();

    // Modal control
    const [authModalFor, setAuthModalFor] = useState(null); // null, "bills", or "appointments"

    // Handle auth submit
    const handleAuthSubmit = (values) => {
        // TODO: Replace with real authentication logic
        console.log("Authenticated:", values);

        // Redirect based on which button triggered the modal
        if (authModalFor === "appointments") {
            router.push("/private/appointments");
        } else if (authModalFor === "bills") {
            router.push("/private/admin/bills");
        }

        // Close modal
        setAuthModalFor(null);
    };

    return (
        <section className="flex flex-col items-center justify-center h-screen text-center bg-white">
            {/* Logo */}
            <div className="mb-2">
                <Image src="/images/logo.png" alt="HONRA Health Center" width={150} height={50} />
            </div>

            {/* Admin ID */}
            <p className="text-sm text-gray-800 mb-8">ADMIN ID: {id}</p>

            {/* Button Grid */}
            <div className="grid grid-cols-2 gap-4">
                {/* Doctors link (no auth) */}
                <a href="/private/admin/doctors-admin">
                    <button className="bg-cyan-400 text-white px-6 py-2 rounded-md border border-black hover:bg-cyan-500 transition w-full">
                        Doctors
                    </button>
                </a>

                {/* Appointments (requires auth modal) */}
                <button
                    onClick={() => setAuthModalFor("appointments")}
                    className="bg-cyan-400 text-white px-6 py-2 rounded-md border border-black hover:bg-cyan-500 transition w-full"
                >
                    Appointments
                </button>

                {/* Bills (requires auth modal) */}
                <button
                    onClick={() => setAuthModalFor("bills")}
                    className="bg-cyan-400 text-white px-6 py-2 rounded-md border border-black hover:bg-cyan-500 transition w-full"
                >
                    Bills
                </button>

                {/* Logout (no auth required) */}
                <button className="bg-cyan-400 text-white px-6 py-2 rounded-md border border-black hover:bg-cyan-500 transition">
                    Log out
                </button>
            </div>

            {/* Render Auth Modal if needed */}
            {authModalFor && (
                <AuthAction
                    onSubmit={handleAuthSubmit}
                    onCancel={() => setAuthModalFor(null)}
                />
            )}
        </section>
    );
}
