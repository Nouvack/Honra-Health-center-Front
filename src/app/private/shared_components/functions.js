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
            if (res?.verified === false) {
                return false
            }
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
        return false
    }
}

export async function readShifts(shifts) {
    try {
        const newArray = []
        for (const shift of shifts) {
            newArray.push(shift.name)
        }
        return newArray
    } catch (err) {
        return false
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

export async function updateDoctor(values, id) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("userToken")?.value
        const response = await fetch (`${path}/doctors/update/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` },
            body: JSON.stringify(values)
        })
        
        let image = false
        if (values.img) {
            const formData = new FormData();
            formData.append("image", values.img);

            image = await fetch (`${path}/doctors/img/${id}`, {
                method: "PATCH",
                headers: { "Authorization": `Bearer ${token}` },
                body: formData
            })
        }

        return {data: !!response.ok, picture: !!image.ok}
    } catch (err) {
        console.log(err)
        return false
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

export async function sendInvoice(email, treatment) {
    try {
        const response = await fetch (`${path}/invoices/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({patientId: email, treatmentId: treatment})
        })
        return response.ok? true : false
    } catch (err) {
        return false
    }
}

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

export async function filterAppointments(appointments, search, filter) {
    try {
        if (!search && filter === "All") {
            return appointments
        }

        let searchedData = [];
        for (const aptm of appointments) {
            const patientDNI = aptm?.patientId?.DNI.toUpperCase() || "";
            const doctorEmpId = aptm?.doctorId?.employeeId.toUpperCase() || "";

            if (patientDNI.includes(search.toUpperCase()) ||
                doctorEmpId.includes(search.toUpperCase())) {
                    console.log("true")
                    searchedData.push(aptm)
                }
        }
            
        let filteredData = []
        const today = new Date()
        switch (filter) {
            case "Today":
                filteredData = searchedData.filter((aptm) => {
                    const aptmDate = new Date(aptm.date);
                    return (
                        aptmDate.getFullYear() === today.getFullYear() &&
                        aptmDate.getMonth() === today.getMonth() &&
                        aptmDate.getDate() === today.getDate()
                    );
                });
                break;

            case "Past":
                filteredData = searchedData.filter((aptm) => {
                    const aptmDate = new Date(aptm.date);
                    return aptmDate < today;
                });
                break;

            case "Upcoming":
                filteredData = searchedData.filter((aptm) => {
                    const aptmDate = new Date(aptm.date);
                    return aptmDate > today;
                });
                break;

            default:
                filteredData = searchedData;
                break;
        }
        console.log(filteredData)
        return filteredData;
    } catch (err) {
        return false
    }
}