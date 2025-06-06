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

export async function logInAdmin(values) {
    try {
        const response = await fetch(`${path}/admin/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values)
        })
        if (response.ok) {
            return await response.json()
        } 
        return false
    } catch (err) {
        console.log("error")
    }
}

export async function verify2Fa(token, code, role) {
    try {
        let thisPath
        if (role === "doctor") {
            thisPath = `${path}/doctors/verify`
        } else if (role === "admin") {
            thisPath = `${path}/admin/verify`
        }
        const response = await fetch(thisPath, {
            method: "POST",
            headers: { "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` },
            body: JSON.stringify({code})
        })
        if (response.ok) {
            const res = await response.json()
            const cookieStore = await cookies()
            cookieStore.set("userToken", res.token)
            return res.name || res.employeeId
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
        const cookieStore = await cookies()
        const token = cookieStore.get("userToken")?.value
        const response = await fetch(`${path}/doctors/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            },
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


export async function getAllpacients() {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("userToken")?.value
        const response = await fetch(`${path}/patients/all`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        })
        if (response.ok) {
            return await response.json()
        } else {
            return []
        }
    } catch (err) {
        console.log("Error", err)
    }
}

export async function deletePacient(id) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("userToken")?.value
        const response = await fetch(`${path}/patients/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });

        if (response.ok) {
            return { success: true };
        } else {
            console.error("Failed to delete pacient:", response.statusText);
            return { success: false };
        }
    } catch (err) {
        console.error("Error deleting pacient:", err);
        return { success: false };
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

