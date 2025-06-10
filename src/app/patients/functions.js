"use server";
import { cookies } from 'next/headers';

const path = process.env.API_PATH;

export async function getPatientProfile() {
  const cookieStore = await cookies();

  try {
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return { success: false, message: 'No authentication token found' };
    }

    const response = await fetch(`${path}/patients/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    let data;
    try {
      data = await response.json();
    } catch {
      return { success: false, message: `Failed to parse response (${response.status})` };
    }

    if (!response.ok) {
      return { success: false, message: data?.message || `Failed to fetch profile (${response.status})` };
    }

    return { success: true, ...data };
  } catch (error) {
    console.error('Error fetching patient profile:', error);
    return { success: false, message: error.message || 'Network or server error' };
  }
}

export async function getPatientAppointments() {
  const cookieStore = await cookies();

  try {
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return { success: false, message: 'No authentication token found' };
    }

    const response = await fetch(`${path}/appointments/patient-appointments`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data?.message || `Failed to fetch appointments (${response.status})`,
      };
    }

    return {
      success: true,
      appointments: data, 
    };
  } catch (error) {
    console.error('Error fetching patient appointments:', error);
    return { success: false, message: error.message || 'Network or server error' };
  }
}


export async function cancelAppointment(appointmentId) {
  const cookieStore = await cookies();

  try {
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return { success: false, message: 'No authentication token found' };
    }

    const response = await fetch(`${path}/appointments/${appointmentId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data?.message || `Failed to cancel appointment (${response.status})`,
      };
    }

    return {
      success: true,
      message: data.message || 'Appointment canceled successfully',
    };
  } catch (error) {
    console.error('Error canceling appointment:', error);
    return {
      success: false,
      message: error.message || 'Network or server error',
    };
  }
}

export async function patientLogOut() {
  try {
    const cookieStore = await cookies(); 
    cookieStore.set("token", "", {
      path: "/",
      httpOnly: true,
      expires: new Date(0),
    });

    return { success: true, message: "Logged out successfully." };
  } catch (error) {
    console.error("Error during logout:", error);
    return { success: false, message: "Logout failed." };
  }
}


export async function signOut() {
  const cookieStore = cookies();

  try {
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return { success: false, message: "No authentication token found" };
    }

    const response = await fetch(`${path}/patients/delete`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data?.message || `Failed to delete account (${response.status})`,
      };
    }

    cookieStore.set("token", "", {
      path: "/",
      httpOnly: true,
      expires: new Date(0),
    });

    return {
      success: true,
      message: data.message || "Account deleted successfully",
    };
  } catch (error) {
    console.error("Error during account deletion:", error);
    return {
      success: false,
      message: error.message || "Account deletion failed",
    };
  }
}

export async function updateProfile(values) {


  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;


    if (!token) {
      return { success: false, message: "No authentication token found" };
    }

    const response = await fetch(`${path}/patients/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });


    const data = await response.json();
  

    if (!response.ok) {
      console.error(" Update failed with status:", response.status);
      return {
        success: false,
        message: data?.message || "Update failed",
        errors: data?.errors || null,
      };
    }

    return {
      success: true,
      message: "Profile updated successfully",
      patient: data.patient,
    };
  } catch (error) {
    console.error(" Error updating profile:", error);
    return {
      success: false,
      message: error.message || "Server error",
    };
  }
}

export async function getPatientInvoices() {
  const cookieStore = await cookies();

  try {
    const token = cookieStore.get('token')?.value;
    console.log("🔑 Token:", token);

    if (!token) {
      return { success: false, message: 'No authentication token found' };
    }

    // Step 1: Get patient ID from profile
    const profileRes = await fetch(`${path}/patients/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log("📡 Profile response status:", profileRes.status);

    const profileData = await profileRes.json();
    console.log("🧾 Profile data:", profileData);

    if (!profileRes.ok) {
      return {
        success: false,
        message: profileData?.message || `Failed to fetch profile (${profileRes.status})`,
      };
    }

    const patientId = profileData?.id || profileData?._id;
    console.log("🆔 Patient ID:", patientId);

    if (!patientId) {
      return { success: false, message: 'Patient ID not found in profile' };
    }

    // Step 2: Fetch invoices
    const invoicesRes = await fetch(`${path}/invoices/client/${patientId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log("📡 Invoices response status:", invoicesRes.status);

    const invoicesData = await invoicesRes.json();
    console.log("💸 Invoices data:", invoicesData);

    if (!invoicesRes.ok) {
      return {
        success: false,
        message: invoicesData?.message || `Failed to fetch invoices (${invoicesRes.status})`,
      };
    }

    return {
      success: true,
      invoices: invoicesData,
    };
  } catch (error) {
    console.error('❌ Error fetching patient invoices:', error);
    return {
      success: false,
      message: error.message || 'Network or server error',
    };
  }
}

