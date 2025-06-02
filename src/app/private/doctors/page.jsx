"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { getDoctor } from "../functions"

export default function Doctor() {
    const pathname = usePathname()
    const [doctor, setDoctor] = useState()

    useEffect(() => {
        const getData = async () => {
            const data = await getDoctor()
            if (!data) {
                console.log("Error later set error")
            } else {
                console.log("doctor", doctor)
                setDoctor(data)
            }
        }
        getData()
    }, [])

    return (
        <section className="w-full h-screen flex flex-col justify-center items-center">
            <Image src={"/images/logo.png"} alt="logo" width={150} height={50}/>
            {/** 
            <p>Welcome {doctor.firstname} {doctor.lastname} </p>*/}
            <div className="grid grid-cols-2">
                <Link href={`${pathname}/profile`}>My Profile</Link>
                <Link href={`${pathname}/appointments`}>Appointments</Link>
                <Link href={`${pathname}/patients`}>My Patients</Link>
                <Link href={`/private`}>Log Out</Link>
            </div>
        </section>
    )
}
