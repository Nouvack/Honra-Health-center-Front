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
                    <table className="w-full m-10 gap-6 flex flex-col overflow-y-scroll p-5">
                        <thead>
                            <tr>
                                <td>Name</td>
                            </tr>
                        </thead>
                       
                    </table> : <p className="m-20">You do not have any patients yet.</p>
                }
                
            </div>

        </section>
    )
}