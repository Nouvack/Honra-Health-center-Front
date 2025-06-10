"use server"

import { cookies } from 'next/headers'
const path = process.env.API_PATH

export async function loginPatient(values) {
  

  try {
    const response = await fetch(`${path}/patients/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (response.ok && data.token) {
      const cookieStore = await cookies()
      cookieStore.set('token', data.token);
      return { success: true, ...data };
    }

    return {
      success: false,
      message: data?.message || `Login failed (${response.status})`,
    };
  } catch (error) {
    console.error('Error in login:', error);
    return {
      success: false,
      message: error.message || 'Network or server error',
    };
  }
}


export async function registerAPatient(values) {

  try {
    const response = await fetch(`${path}/patients/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values)
    });

    let data = {};
    try {
      data = await response.json();
    } catch {
      data = {};
    }

    if (response.ok) {
    
      return { success: true, ...data };
    } else {
      return { success: false, message: data?.message || `Registration failed (${response.status})` };
    }
  } catch (error) {
    console.error('Error in registration:', error);
    return { success: false, message: error.message || "Network or server error" };
  }
}


export async function getPatientInvoices() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('userToken')?.value;

    if (!token) {
      return { success: false, message: "Authentication token not found" };
    }

    const response = await fetch(`${path}/patients/invoices`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, invoices: data };
    } else {
      return {
        success: false,
        message: data?.message || `Failed to fetch invoices (${response.status})`,
      };
    }
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return {
      success: false,
      message: error.message || "Network or server error",
    };
  }
}



