"use server"

import { cookies } from 'next/headers'
const path = process.env.API_PATH

export async function getDoctor() {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("userToken")?.value
        const response = await fetch (`${path}/doctors/doctor`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` } 
        })
        return response.ok? await response.json() : false
    } catch (err) {
        return false
    }
}

export async function getAppointments() {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("userToken")?.value
        const response = await fetch(`${path}/appointments/doctor-appointments`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` } 
        })
        return response.ok? await response.json() : false
    } catch (err) {
        return false
    }
}

export async function getDoctorPatients() {
    try {
        const appointments = await getAppointments();
        const patients = [];
        const seenIds = new Set();

        for (const appointment of appointments) {
            const patient = appointment.patientId;
            if (!seenIds.has(patient._id)) {
                seenIds.add(patient._id);
                patients.push(patient);
            }
        }
        return patients;
    } catch (err) {
        console.error("Failed to get doctor patients:", err);
        return false;
    }
}
