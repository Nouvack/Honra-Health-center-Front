"use server"
const path = process.env.API_PATH
import { cookies } from 'next/headers'

export async function logInDoctor(values) {
    try {
        const response = await fetch(`${path}/doctors/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values)
        });
        if (response.ok) {
            const res = await response.json()
            const cookieStore = await cookies()
            return true
        } else {
            return false
        }
    } catch (err) {
        console.log("error")
    }
}