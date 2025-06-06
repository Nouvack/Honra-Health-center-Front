"use client"

import { useEffect, useState } from "react"
import { getAppointments } from "../functions"

export default function Appointments() {
    const [error, setError] = useState()
    const [appointments, setAppointments] = useState([])
    const [filteredAppointments, setFilteredAppointments] = useState([])

    useEffect(() => {
        const getData = async () => {
            const response = await getAppointments()
            if (!response) {
                setError("Could not fetch appointments data.")
            } else {
                setAppointments(response)
            }
        }
    }, [])
    return (
        <section>

        </section>
    )
}