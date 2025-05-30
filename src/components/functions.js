"use server"

const path = process.env.API_PATH;

export async function getDoctors() {
    try {
        const response = await fetch(`${path}/doctors`, {
            method: "GET"
        });
        if (response.ok) {
            const res = await response.json()
            return res
        } else {
            return false
        }
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