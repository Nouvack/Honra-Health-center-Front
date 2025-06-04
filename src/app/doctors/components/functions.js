"use server" 

const path = process.env.API_PATH

export async function getDoctor(employeeId) {
    try {
        const response = await fetch(`${path}/doctors/getpublic/${employeeId}`, {
            method: "GET"
        })
        if (response.ok) {
            return await response.json()
        } else {
            return false
        }
    } catch (err) {
        console.log("error")
    }
}

export async function getTreatments(specialty) {
    try {
        const response = await fetch(`${path}/treatments/byspecialty/${specialty}`, {
            method: "GET"
        })
        if (response.ok) {
            return await response.json()
        } else {
            return false
        }
    } catch (err) {
        console.log("error")
    }
}