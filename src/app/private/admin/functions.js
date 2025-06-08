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

export async function updateTreatment(values, id) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("userToken")?.value
        const response = await fetch (`${path}/treatments/update/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`},
            body: JSON.stringify(values),
        })
        return !!response.ok
    } catch (err) {
        return false
    }
}

export async function deleteTreatment(id) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("userToken")?.value
        const response = await fetch (`${path}/treatments/delete/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}`}
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
        const cookieStore = await cookies();
        const token = cookieStore.get("userToken")?.value;
        const response = await fetch (`${path}/invoices`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        })
        return response.ok? await response.json() : false
    } catch (err) {
        return false
    }
}

export async function getDoctors() {
    try {   
        const cookieStore = await cookies()
        const token = cookieStore.get("userToken")?.value
        const response = await fetch(`${path}/doctors`, {
            method: "GET",  
            headers: { "Authorization": `Bearer ${token}` }
        })
        if (response.ok) {
            const res = await response.json()
            return res
        } else {
            return false    
        }
    }
    catch (err) {
        console.log("Error", err)
    }
}

export async function registerDoctor(values) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("userToken")?.value;

        const response = await fetch(`${path}/doctors/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(values)
        });

        return !!response.ok

    } catch (err) {
        console.error("Fetch error:", err);
        return { success: false, error: "Network or server error" };
    }
}


export async function getAllPatients(){
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
            return false
        }
    } catch (err) {
        console.log("Error", err)
    }
}

export async function deletePatient(id) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("userToken")?.value
        const response = await fetch(`${path}/patients/delete/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        })
        if (response.ok) {
            return true
        } else {
            return false
        }
    } catch (err) {
        console.log("Error", err)
    }}

export async function registerPatient(values) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("userToken")?.value;

    if (!values?.email || !values?.password) {
      return { success: false, message: "Email and password are required." };
    }

    const response = await fetch(`${path}/patients/register-admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(values)
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: data.message };
    } else {
      console.error("Registration error:", data);
      return { success: false, message: data?.message || "Registration failed." };
    }
  } catch (err) {
    console.log("Error", err);
    return { success: false, message: "Unexpected error occurred." };
  }
}


export async function updatePatientById(id, values) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("userToken")?.value;

    const response = await fetch(`${path}/patients/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      const error = await response.json();
      return { success: false, message: error.message || "Update failed." };
    }
  } catch (err) {
    console.error("Error updating patient:", err);
    return { success: false, message: "Unexpected error occurred." };
  }
}


export async function deleteDoctor(id) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("userToken")?.value
        const response = await fetch(`${path}/doctors/delete/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        })
        if (response.ok) {
            return true
        } else {
            return false
        }
    } catch (err) {
        console.log("Error", err)
    }
}