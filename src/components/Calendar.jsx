"use client"

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";
import { calculateSchedule, getDoctorAppointments } from "./functions";

export default function Calendar({doctor}) {
    const [schedule, setSchedule] = useState({
        businessHours: [],
        minTime: '00:00:00',
        maxTime: '23:00:00'
    });
    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        if(doctor) {
            const getSchedule = async () => {
                const scheduleData = await calculateSchedule(doctor);
                setSchedule(scheduleData)
            }
            getSchedule()
            
            const getAppointments = async () => {
                console.log(doctor)
                const response = await getDoctorAppointments(doctor._id)
                if (!response) {
                    console.log(response) // BORRAR ESTA LINEA
                } else {
                    setAppointments(response)
                    console.log(response)
                }
            }
            getAppointments()
        }
    }, [doctor])

    return (
        <section className="w-full">
            <FullCalendar
                slotLabelFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }}
                eventTimeFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }}
                headerToolbar={{left: 'prev', center: 'title', right: 'today next'}}
                plugins={[timeGridPlugin]}
                initialView="timeGridWeek"
                dayHeaderFormat={{weekday: 'short', day: '2-digit'}}
                allDaySlot={false}
                firstDay={1}
                slotDuration={"01:00:00"}
                businessHours={schedule.businessHours}
                slotMinTime={schedule.startTime || "00:00:00"}
                slotMaxTime={schedule.endTime || "23:00:00"}
                height='auto'
                nowIndicator={true}
                events={[]}
            />
        </section>
    )
}

