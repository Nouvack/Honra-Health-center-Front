"use server"

const path = process.env.API_PATH;

export async function getDoctors() {
    try {
        const response = await fetch(`${path}/doctors`, {
            method: "GET"
        });
        if (response.ok) {
            const res = await response.json()
            return res
        } else {
            return false
        }
    } catch (err) {
        return false
    }
}

export async function filterData( doctorsList, filter ) {
    if (filter === "All") {
        return doctorsList
    }
    return doctorsList.filter(doctor => doctor.specialty === filter)
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
        console.log(response)
        return response.ok? response.json() : false
    } catch (err) {
        return false
    }
}

export async function getAvailableHours(doctorId, date) {
    try {
        const response = await fetch(`${path}/appointments/getAvailableHours/${doctorId}?date=${date.toISOString()}`, {
            method: "GET"
        })
        return response.ok? response.json() : []
    } catch (err) {
        return false
    }
}