"use server"

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