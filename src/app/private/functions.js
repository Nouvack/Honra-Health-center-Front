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
            return {
                doctorId: res.doctorId ?? null,
                employeeId: res.employeeId
            };        
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

export async function updatePassword(newpassword, id) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("userToken")?.value
        const response = await fetch(`${path}/doctors/update/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` },
            body: JSON.stringify({password: newpassword})
        })
        if (response.ok) {
            const res = await response.json()
            console.log(res)
            return res.employeeId
        } else if (response.status === 400) {
            return "Error 400"
        } 
        return false
    } catch (err) {
        return false
    }
}

export async function submitObservation(values, id) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("userToken")?.value
        const response = await fetch (`${path}/appointments/${id}/observation`, {
            method: "PUT",
            headers: { "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` },
            body: JSON.stringify(values)
        })
        return response.ok? true : false
    } catch (err) {
        return false
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

export async function getPatientById(id) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("userToken")?.value
        const response = await fetch(`${path}/patients/${id}`, {
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

export async function updatePatient(values) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("userToken")?.value
        const response = await fetch(`${path}/patients/update`, {
            method: "PUT",
            headers: { "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` },
            body: JSON.stringify(values)
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
export async function registerPatient(values) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("userToken")?.value;

        if (!values?.email || !values?.password) {
            return { error: true, message: "Email and password are required." };
        }

        const response = await fetch(`${path}/patients/register-admin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(values)
        });

        if (response.ok) {
            return await response.json();
        } else {
            const errorData = await response.json();
            console.error("Registration error:", errorData);
            return { error: true, message: errorData?.message || "Registration failed." };
        }
    } catch (err) {
        console.log("Error", err);
        return { error: true, message: "Unexpected error occurred." };
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

