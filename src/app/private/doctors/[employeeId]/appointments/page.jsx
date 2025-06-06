"use client"

import { useEffect, useState } from "react"
import { filterAppointments, getAppointments } from "../functions"
import AppointmentCard from "@/app/private/components/AppointmentCard"
import Header from "@/app/private/components/Header"

export default function Appointments() {
    const [error, setError] = useState()
    const [appointments, setAppointments] = useState([])
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
            }
        }
        getData()
    }, [])

    useEffect(() => {
        const filterData = async () => {
            const result = await filterAppointments(appointments, filter);
            setFilteredAppointments(result);
        }
        filterData()
    }, [filter])
    
    return (
        <section className="w-full min-h-screen flex flex-col items-center">
            <Header />
            <div className="w-full flex flex-col items-center p-20">
                <p className="font-bold">APPOINTMENTS</p>
                <hr className="w-5/6 border-[var(--turquoise)] mb-10" />
                <div className="w-120">
                    <p className="text-[var(--turquoise)]">FILTER:</p>
                    <div className="flex justify-between">
                        {["All", "Today", "Upcoming", "Past"].map((f) => 
                            <button key={f} onClick={() => setFilter(f)}
                                className={`py-1 px-6 rounded-3xl hover:bg-[var(--turquoise)] transition ${filter === f ? "bg-[var(--turquoise)]" : "bg-[var(--mint_green)]"}`}   
                            >{f}</button>
                        )}
                    </div>
                </div>
                
                {filteredAppointments.length > 0 ? 
                    <div className="w-full m-10 gap-6 flex flex-col overflow-y-scroll p-5">
                        {filteredAppointments?.map((aptm) => <AppointmentCard appointment={aptm} key={aptm.id} />)}
                    </div> : <p className="m-20">You do not have any appointments.</p>
                }
                
            </div>

        </section>
    )
}