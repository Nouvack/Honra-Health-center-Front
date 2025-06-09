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
    return  await response.json()
  } catch (err) {
    console.log("Error", err);
    return false
  }
}

export async function updatePatientById(id, values) {
  console.log(id)
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
    console.log(response)
    return !!response.ok
  } catch (err) {
    console.error("Error updating patient:", err);
    return false
  }
}