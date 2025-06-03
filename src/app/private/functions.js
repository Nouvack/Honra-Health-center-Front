"use server"

import { cookies } from 'next/headers'
const path = process.env.API_PATH

export async function logInDoctor(values) {
    try {
        const response = await fetch(`${path}/doctors/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values)
        });
        if (response.ok) {
            return await response.json()
        } else {
            return false
        }
    } catch (err) {
        console.log("error")
    }
}

export async function verify2Fa(token, code) {
    try {
        const response = await fetch(`${path}/doctors/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` },
            body: JSON.stringify({code})
        })
        if (response.ok) {
            const res = await response.json()
            const cookieStore = await cookies()
            cookieStore.set("userToken", res.token)
            return res.name
        } else {
            return false
        }
    } catch (err) {
        console.log("error", err)
    }
}

export async function getDoctor() {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("userToken")?.value
        const response = await fetch(`${path}/doctors/doctor`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        })
        if (response.ok) {
            const res = await response.json()
            return res
        }
        return false
    } catch (err) {
        console.log("Error", err)
    }
}

export async function logOut() {
    try {
        const cookieStore = await cookies()
        cookieStore.delete("userToken")
        cookieStore.delete("userData")
        return true
    } catch (err) {
        return false
    }
}

