"use server" 

const path = process.env.API_PATH

export async function getDoctor(employeeId) {
    try {
        const response = await fetch(`${path}/doctors/getpublic/${employeeId}`, {
            method: "GET"
        })
        if (response.ok) {
            return await response.json()
        } else {
            return false
        }
    } catch (err) {
        console.log("error")
    }
}

export async function getTreatments(specialty) {
    try {
        const response = await fetch(`${path}/treatments/byspecialty/${specialty}`, {
            method: "GET"
        })
        if (response.ok) {
            return await response.json()
        } else {
            return false
        }
    } catch (err) {
        console.log("error")
    }
}

export async function calculateSchedule (doctor) {
    const dayMap = { sunday: 0, monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5, saturday: 6 };
    const workdayIndexes = doctor.workdays?.map(day => dayMap[day]) || [];

    const businessHours = [];
    let startTimes = [];
    let endTimes = [];

    if (doctor.shift && workdayIndexes.length > 0) {
        for (const day of workdayIndexes) {
            for (const shift of doctor.shift) {
                const [startTime, endTime] = shift.time_range.split(' - ');
                businessHours.push({
                    daysOfWeek: [day], startTime, endTime, });
                startTimes.push(startTime);
                endTimes.push(endTime);
            }
        }
    }

    const minTime = startTimes.sort()[0] || '00:00:00';
    const maxTime = endTimes.sort().reverse()[0] || '24:00:00';

    return {
        businessHours,
        startTime: minTime,
        endTime: maxTime,
    };
};

export async function getDoctorAppointments(id) {
    try {
        const response = await fetch(`${path}/appointments/doctorAppointmentsForEveryone/${id}`, {
            method: "GET"
        })
        return response.ok? response.json() : false
    } catch (err) {
        return false
    }
}