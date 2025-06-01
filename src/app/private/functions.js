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
            const res = await response.json()
            //const cookieStore = await cookies()
            //cookieStore.set("userToken", res.token)
            return res
        } else {
            return false
        }
    } catch (err) {
        console.log("error")
    }
}

export async function logOut() {
    try {
        const cookieStore = await cookies()
        cookieStore.delete("userToken")
        return true
    } catch (err) {
        return false
    }
}