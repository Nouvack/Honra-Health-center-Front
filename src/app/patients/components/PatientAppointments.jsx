"use client"

import { useState } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"
import "@fullcalendar/daygrid/index.cjs"
import "@fullcalendar/timegrid/index.cjs"

export default function PatientAppointments() {
  const [appointments, setAppointments] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr)
    setModalOpen(true)
  }

  const handleAddAppointment = (data) => {
    setAppointments((prev) => [...prev, data])
    setModalOpen(false)
  }

  const handleEventClick = ({ event }) => {
    if (confirm("Delete this appointment?")) {
      setAppointments((prev) => prev.filter((a) => a.appointmentId !== event.id))
    }
  }

  return (
      <div className="main-content bg-[var(--seasalt)] py-25">

        {/* Page Title */}
        <h2 className="text-3xl font-bold mb-6" style={{ color: "var(--outer_space)" }}>
          Appointments
        </h2>

        {/* FullCalendar component */}
        <div className="bg-white rounded-lg p-4 shadow-sm" style={{ border: `1px solid var(--mint_green)` }}>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            initialView="dayGridMonth"
            dateClick={handleDateClick}
            events={appointments.map((a) => ({
              id: a.appointmentId,
              title: `Patient ${a.pacientId} - Dr. ${a.doctorId}`,
              date: a.date,
              backgroundColor: "var(--turquoise)",
              borderColor: "var(--outer_space)",
            }))}
            eventClick={handleEventClick}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            height="auto"
          />
        </div>

        {modalOpen && (
          <AppointmentFormModal
            date={selectedDate}
            onSubmit={handleAddAppointment}
            onClose={() => setModalOpen(false)}
          />
        )}
      </div>
  )
}


