"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Doctor() {
    const pathname = usePathname()

    return (
        <section className="w-full h-screen flex flex-col justify-center items-center">
            <Image src={"/images/logo.png"} alt="logo" width={150} height={50}/>
            <p></p>
            <div className="grid grid-cols-2">
                <Link href={`${pathname}/profile`}>My Profile</Link>
                <Link href={`${pathname}/appointments`}>Appointments</Link>
                <Link href={`${pathname}/patients`}>My Patients</Link>
                <Link href={`/private`}>Log Out</Link>
            </div>
        </section>
    )
}
