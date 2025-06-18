"use client"

import AppointmentCard from "../../shared_components/AppointmentCard"
import { filterAppointments } from "../../shared_components/functions"
import { getAppointments } from "./functions"
import { useState, useEffect } from "react"

export default function Appointments() {
    const [error, setError] = useState()
    const [appointments, setAppointments] = useState([])
    const [search, setSearch] = useState("")
    const [filteredAppointments, setFilteredAppointments] = useState([])
    const [filter, setFilter] = useState()

    useEffect(() => {
        const getData = async () => {
            const response = await getAppointments()
            if (!response) {
                setError("Could not fetch appointments data.")
            } else {
                setAppointments(response)
                setFilter("All")
                console.log(response)
            }
        }
        getData()
    }, [])

    useEffect(() => {
        const timeout = setTimeout( async() => {
            const response = await filterAppointments(appointments, search, filter)
            response ? setFilteredAppointments(response) : setError("Could not search appointments. Try again later.")
            console.log(response)
        }, 300)
        return () => clearTimeout(timeout)
    }, [search, filter])
    
    return (
        <section className="w-full flex flex-col items-center">
            <div className="w-full flex flex-col items-center p-20">
                <p className="font-bold">APPOINTMENTS</p>
                <hr className="w-5/6 border-[var(--turquoise)] mb-10" />
                <div className="w-120">
                    <p className="text-[var(--turquoise)]">SEARCH:</p>
                    <input type="text" onChange={(e) => setSearch(e.target.value)}
                        className="bg-[var(--mint_green)] rounded-3xl py-1 px-3 w-full" placeholder="PATIENT DNI / DOCTOR EMPLOYEE ID"/>
                    <p className="text-[var(--turquoise)]">FILTER:</p>
                    <div className="flex justify-between">
                        {["All", "Today", "Upcoming", "Past"].map((f) => 
                            <button key={f} onClick={() => setFilter(f)}
                                className={`py-1 px-6 rounded-3xl hover:bg-[var(--turquoise)] transition ${filter === f ? "bg-[var(--turquoise)]" : "bg-[var(--mint_green)]"}`}   
                            >{f}</button>
                        )}
                    </div>
                </div>

                {filteredAppointments?.length > 0 ? 
                    <div className="w-full m-10 gap-6 flex flex-col overflow-y-scroll p-5">
                        {filteredAppointments?.map((aptm) => <AppointmentCard appointment={aptm} key={aptm._id} />)}
                    </div> : <p className="m-20">You do not have any appointments.</p>
                }
                
            </div>

        </section>
    )
}