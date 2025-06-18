"use server"

import { cookies } from 'next/headers'
const path = process.env.API_PATH

export async function deletePatient(id) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("userToken")?.value
        const response = await fetch(`${path}/patients/delete/?patient=${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        })
        return !!response.ok
    } catch (err) {
        return false
    }}

export async function registerPatient(values) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("userToken")?.value;

    const response = await fetch(`${path}/patients/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(values)
    });
    if (response.ok) {
      const data = await response.json();
      return { success: true, message: data.message };
    } else {
      const data = await response.json();
      const error =
        Array.isArray(data.errors) && data.errors.length > 0
          ? data.errors[0].msg
          : data?.message || `Registration failed (${response.status})`;

      return { success: false, message: error };
    }
  } catch (err) {
    return { success: false, message: err.message }
  }
}

export async function updatePatientById(id, values) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("userToken")?.value;
    console.log(id, values,token)
    const response = await fetch(`${path}/patients/update-patient?patient=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      const data = await response.json();
      return { success: true, message: data.message };
    } else {
      const data = await response.json();
      const error =
        Array.isArray(data.errors) && data.errors.length > 0
          ? data.errors[0].msg
          : data?.message || `Registration failed (${response.status})`;

      return { success: false, message: error };
    }
  } catch (err) {
    return { success: false, message: err.message }
  }
}