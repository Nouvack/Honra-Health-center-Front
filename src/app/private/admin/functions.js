"use server"

import { cookies } from 'next/headers'
const path = process.env.API_PATH

export async function registerDoctor(values) {
    try {
        const response = await fetch(`${path}/doctors/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values), // convert JS object to JSON string
        });

        const result = await response.json();

        if (response.ok) {
            return { success: true, data: result };
        } else {
            console.error("Server responded with error:", result);
            return { success: false, data: result };
        }
    } catch (err) {
        console.error("Error during doctor registration:", err);
        return { success: false };
    }
}


export async function getDoctors() {
    try {
        const response = await fetch(`${path}/doctors`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error("Failed to fetch doctors:", response.statusText);
            return [];
        }
    } catch (err) {
        console.error("Error fetching doctors:", err);
        return [];
    }
} 

export async function deleteDoctor(id) {
    try {
        const response = await fetch(`${path}/doctors/delete/${id}`, {
            authorization: `Bearer ${cookies().get("userToken")?.value}`,
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            return { success: true };
        } else {
            console.error("Failed to delete doctor:", response.statusText);
            return { success: false };
        }
    } catch (err) {
        console.error("Error deleting doctor:", err);
        return { success: false };
    }
}

export async function updateDoctor(id, values) {
    try {
        const response = await fetch(`${path}/doctors/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });

        if (response.ok) {
            return { success: true };
        } else {
            console.error("Failed to update doctor:", response.statusText);
            return { success: false };
        }
    } catch (err) {
        console.error("Error updating doctor:", err);
        return { success: false };
    }
}
