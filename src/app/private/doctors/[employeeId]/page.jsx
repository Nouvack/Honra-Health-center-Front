"use client"

import Image from "next/image"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

export default function Doctor() {
    const { employeeId } = useParams()
    const pathname = usePathname()

    return (
        <section className="w-full h-screen flex flex-col justify-center items-center">
            <Image src={"/images/logo.png"} alt="logo" width={150} height={50}/>
  
            <div className="text-center">
                <p className="p-4 font-bold">Welcome: {employeeId}</p>
                <div className="grid grid-cols-2 gap-2">
                    <Link href={`${pathname}/profile`}
                        className="bg-[var(--mint_green)] px-4 py-1 rounded-3xl">My Profile</Link>
                    <Link href={`${pathname}/appointments`}
                        className="bg-[var(--mint_green)] px-4 py-1 rounded-3xl">Appointments</Link>
                    <Link href={`${pathname}/patients`}
                        className="bg-[var(--mint_green)] px-4 py-1 rounded-3xl">My Patients</Link>
                    <Link href={`/private`}
                        className="bg-[var(--mint_green)] px-4 py-1 rounded-3xl">Log Out</Link>
                </div>
            </div>

        </section>
    )
}
