"use server"

import { cookies } from "next/headers";
const path = process.env.API_PATH
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

dayjs.extend(utc)
dayjs.extend(timezone)

export async function sendAppointment(values) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("token")?.value

        const datetime = dayjs.tz(values.date, "Europe/Madrid") // set date only
            .hour(Number(values.hour.split(":")[0]))
            .minute(Number(values.hour.split(":")[1]))
            .second(0)
            .millisecond(0)

        const isoDate = datetime.toISOString()
        
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
        return response.ok? true : false
    }catch (err) {
        return false
    }
}

export async function getAvailableHours(doctorId, date) {
    try {
        const formattedDate = dayjs(date).format("YYYY-MM-DD")
        const response = await fetch(`${path}/appointments/getAvailableHours/${doctorId}?date=${formattedDate}`, {
            method: "GET"
        })
        return response.ok? await response.json() : []
    } catch (err) {
        return false
    }
}

export async function filterData( doctorsList, filter ) {
    if (filter === "All") {
        return doctorsList
    }
    return doctorsList?.filter(doctor => doctor.specialty === filter)
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