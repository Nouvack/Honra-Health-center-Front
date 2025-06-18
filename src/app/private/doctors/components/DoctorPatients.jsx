"use client"

import { useEffect, useState } from "react"
import { getDoctorPatients } from "./functions"

export default function DoctorPatients( ) {

    const [patients, setPatients] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        const getData = async () => {
            const response = await getDoctorPatients()
            response ? setPatients(response) : setError("Could not get patients data")
        }
        getData()
    }, [])

    return (
        <section className="w-full flex flex-col items-center">
            <div className="w-full flex flex-col items-center p-20">
                <p className="font-bold">PATIENTS</p>
                <hr className="w-5/6 border-[var(--turquoise)] mb-10" />
                {patients.length > 0 ? 
                    <table  className="divide-y divide-[var(--turquoise)] w-5/6">
                        <thead className="bg-[var(--mint_green)]">
                            <tr>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Surname</th>
                                <th className="px-4 py-2 text-left">BirthDate</th>
                                <th className="px-4 py-2 text-left">Gender</th>
                                <th className="px-4 py-2 text-left">DNI</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--mint_green)]">
                            {patients.map((patient) => <PatientRows patient={patient} key={patient._id} /> )}
                        </tbody>
                       
                    </table> : <p className="m-20">You do not have any patients yet.</p>
                }
                
            </div>

        </section>
    )
}


export function PatientRows({patient}) {
    return (
        <tr className={`cursor-pointer hover:bg-[var(--mint_green)] `} >
          <td className="px-2">{patient.name}</td>
          <td className="px-2">{patient.surname}</td>
          <td className="px-2">{new Date(patient.birthDate).toLocaleDateString()}</td>
          <td className="px-2">{patient.gender}</td>
          <td className="px-2">{patient.DNI}</td>
        </tr>
      )
}