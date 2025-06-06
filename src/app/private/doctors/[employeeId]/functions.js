"use server"

import { cookies } from 'next/headers'
const path = process.env.API_PATH

export async function getAppointments() {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("userToken")?.value
        const response = await fetch(`${path}/appointments/doctor-appointments`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` } 
        })
        return response.ok? response.json() : false
    } catch (err) {
        return false
    }
}

export async function filterAppointments(appointments, filter) {
    try {
        if (filter === "All") {
            return appointments
        }
        let filteredData = []
        const today = new Date()
        switch (filter) {
            case "Today":
                filteredData = appointments.filter((aptm) => {
                    const aptmDate = new Date(aptm.date);
                    return (
                        aptmDate.getFullYear() === today.getFullYear() &&
                        aptmDate.getMonth() === today.getMonth() &&
                        aptmDate.getDate() === today.getDate()
                    );
                });
                break;

            case "Past":
                filteredData = appointments.filter((aptm) => {
                    const aptmDate = new Date(aptm.date);
                    return aptmDate < today;
                });
                break;

            case "Upcoming":
                filteredData = appointments.filter((aptm) => {
                    const aptmDate = new Date(aptm.date);
                    return aptmDate > today;
                });
                break;

            default:
                filteredData = appointments;
                break;
        }

        return filteredData;
    } catch (err) {
        return false
    }
}