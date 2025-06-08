"use server"

import { cookies } from 'next/headers'
const path = process.env.API_PATH

export async function getTreatments() {
    try {
        const response = await fetch (`${path}/treatments`, {
            method: "GET"
        })
        if (response.ok) {
            const res = await response.json()
            const filtered = {}
            for (const treat of res) {
                if (!filtered[treat.type]) {
                    filtered[treat.type] = []
                }
                filtered[treat.type].push(treat)
            }
            return filtered
        }
        return false
    } catch (err) {
        return false
    }
}

export async function createTreatment(values) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("userToken")?.value;
        const response = await fetch (`${path}/treatments/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`},
            body: JSON.stringify(values),
        })
        return !!response.ok
    } catch (err) {
        return false
    }
}

export async function getLogs() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("userToken")?.value;
        const response = await fetch (`${path}/logs`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        })
        return response.ok? await response.json() : false
    } catch (err) {
        return false
    }
}

export async function getInvoices() {
    try {
        const response = await fetch (`${path}/invoices`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        })
        return response.ok? await response.json() : false
    } catch (err) {
        return false
    }
}