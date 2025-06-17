"use server"

import { cookies, headers } from "next/headers";
const path = process.env.API_PATH

export async function sendAppointment(values) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("token")?.value

        const [hour, minute] = values.hour.split(":").map(Number);

        // Combine date and hour
        const fullDate = new Date(values.date);
        fullDate.setHours(hour, minute, 0, 0); // set hour, minute, second, ms

        // Now convert to ISO string
        const isoDate = fullDate.toISOString();
        
        const body = {
            treatmentId: values.treatment,
            doctorId: values.doctor,
            date: isoDate
        }

        const response = await fetch (`${path}/appointments`, {
            method:"POST",
            headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` },
            body: JSON.stringify(body)
        })
        console.log(response)
        return response.ok? true : false
    }catch (err) {
        return false
    }
    
}

export async function getAvailableHours(doctorId, date) {
    try {
        const formattedDate = date.toLocaleDateString("en-CA");
        const response = await fetch(`${path}/appointments/getAvailableHours/${doctorId}?date=${formattedDate}`, {
            method: "GET"
        })
        console.log(response)
        return response.ok? await response.json() : []
    } catch (err) {
        return false
    }
}

export async function filterData( doctorsList, filter ) {
    if (filter === "All") {
        return doctorsList
    }
    return doctorsList.filter(doctor => doctor.specialty === filter)
}

export async function getTreatments(specialty) {
    try {
        const response = await fetch (`${path}/treatments/byspecialty/${specialty}`, {
            method: "GET"
        })
        return response.ok? await response.json() : []
    } catch (err) {
        return false
    }
}


export async function getPatient() {
    try {
        const cookieStore = await cookies()
        const patient = cookieStore.get("token")?.value
        if (!patient) {
            return {status: false, msg: "You need to log in to make an appointment."}
        }
        const response = await fetch (`${path}/patients/profile`, {
            method: "GET",
            headers: {"Authorization": `Bearer ${patient}`}
        })
        if (!response) {
            return {status: false, msg: "An error has ocurred."}
        } else {
            if (response.ok) {
                const patient = await response.json()
                console.log(response)
                return {status: true, patient}
            } else {
                return {status: false, msg: "An error has ocurred."}
            }
        }
    } catch (err) {
        return {status: false, msg: "An error has ocurred."}
    }
}