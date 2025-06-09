"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Sidebar } from "./components/Sidebar"
import DoctorProfile from "./components/DoctorProfile"
import DoctorPatients from "./components/DoctorPatients"
import DoctorAppointments from "./components/DoctorAppointments"
import { getDoctor } from "./components/functions"
import { readShifts } from "../shared_components/functions"

export default function Doctor() {

    const [doctor, setDoctor] = useState({})
    const [section, setSection] = useState("Profile")
    const setDisplay = (path) => setSection(path)
    const [error, setError] = useState("")

    useEffect(() => {
        const getData = async () => {
            const response = await getDoctor()
            const readableShifts = await readShifts(response?.shift || [])
            readableShifts && response? setDoctor({...response, shift: readableShifts}) : setError("Could not retrieve Doctor data.")
        }
        getData()
    }, [])

    return (
        <section className="w-full h-screen flex justify-center items-center">
            <Image src={"/images/logo.png"} alt="logo" width={150} height={50} className="fixed top-5 right-5"/>
  
            <div className="h-5/6 left-0">
                <Sidebar setDisplay={setDisplay} selected={section} name={doctor.employeeId}/>
            </div>

            {error ? <p className="flex flex-col flex-1 w-full text-center">{error}</p> : 
            <div className="flex flex-col flex-1 w-full h-full pr-5 py-25 overflow-y-auto">
                {section === "Profile" && <DoctorProfile doctor={doctor} />}
                {section === "Appointments" && <DoctorAppointments />}
                {section === "Patients" && <DoctorPatients />}
            </div>
            }
            

        </section>
    )
}
