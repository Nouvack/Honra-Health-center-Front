"use client"

import Footer from "@/app/shared_components/Footer"
import Header from "@/app/shared_components/Header"
import { Sidebar } from "@/app/patients/components/Sidebar"
import { useState } from "react"
import PatientData from "./components/PatientData"
import PatientAppointments from "./components/PatientAppointments"
import PatientsInvoices from "./components/PatientInvoices"

export default function Home() {
  
  const [section, setSection] = useState("Personal Data")
  const setDisplay = (path) => setSection(path)

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Header/>
      <div className="left-0 h-5/6">
        <Sidebar setDisplay={setDisplay} selected={section}/>
      </div>
      
      <main className="flex flex-col flex-1 w-full h-full pr-5 py-25 overflow-y-auto" >
        {section === "Personal Data" && <PatientData user={123}/>}
        {section === "Appointments" && <PatientAppointments/>}
        {section === "Invoices" && <PatientsInvoices/>}
      </main>

      <div className="absolute bottom-0 w-full">
        <Footer/>
      </div>
      
    </div>
  )
}



