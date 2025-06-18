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
  } catch (error) {
    console.error('Error in registration:', error);
    return { success: false, message: error.message || "Network or server error" };
  }
}

export async function resendVerificationEmail(values) {
  try {
    const response = await fetch(`${path}/patients/resend-verification-email`, {
      method: "POST",
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify(values)
    })
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



