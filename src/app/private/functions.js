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

export async function registerDoctor(values) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("userToken")?.value;
        console.log("Token:", token);
        console.log("Values being sent:", values);

        const response = await fetch(`${path}/doctors/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(values)
        });

        console.log("Response status:", response.status);

        const data = await response.json().catch(() => null);
        console.log("Response data:", data);

        if (response.ok) return data;
        return { success: false, error: data?.error || "Unknown error" };

    } catch (err) {
        console.error("Fetch error:", err);
        return { success: false, error: "Network or server error" };
    }
}

export async function getDoctorById(id) {
        const cookieStore = await cookies()
        const token = cookieStore.get("userToken")?.value
        const response = await fetch(`${path}/doctors/${id}`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        })
        if (response.ok) {
            return await response.json()
        } else {
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

export async function updatePatientProfile(values) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("userToken")?.value;

        const response = await fetch(`${path}/patients/profile`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(values)
        });

        if (response.ok) {
            return await response.json();
        } else {
            const data = await response.json();
            return { success: false, message: data?.message || "Update failed." };
        }
    } catch (err) {
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

