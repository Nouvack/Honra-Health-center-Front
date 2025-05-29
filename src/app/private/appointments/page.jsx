// app/private/appointments/page.jsx
"use client";

import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

import AppointmentFormModal from "@/app/private/components/AppointmentForm";
import "@/style/medicStuff.css";
import "@fullcalendar/daygrid/index.cjs";
import "@fullcalendar/timegrid/index.cjs";

export default function AppointmentPage() {
  // State to store all appointments
  const [appointments, setAppointments] = useState([]);
  // State to control modal visibility
  const [modalOpen, setModalOpen] = useState(false);
  // State to store the date selected on the calendar
  const [selectedDate, setSelectedDate] = useState(null);

  // Handler for clicking a date on the calendar
  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr); // Save selected date
    setModalOpen(true); // Open the appointment form modal
  };

  // Handler for adding a new appointment
  const handleAddAppointment = (data) => {
    setAppointments((prev) => [...prev, data]); // Add new appointment to state
    setModalOpen(false); // Close the modal
  };

  // Handler for clicking an event (appointment) on the calendar
  const handleEventClick = ({ event }) => {
    if (confirm("Delete this appointment?")) {
      // Remove the appointment if confirmed
      setAppointments((prev) => prev.filter((a) => a.appointmentId !== event.id));
    }
  };

  return (
    <div className="appointment-page-container">
      {/* Logo */}
      <img src="/images/logo.png" alt="Logo" className="logo" />
      {/* Page Title */}
      <h2 className="title">Appointments</h2>

      {/* FullCalendar component */}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        // Map appointments to FullCalendar event format
        events={appointments.map((a) => ({
          id: a.appointmentId,
          title: `Patient ${a.pacientId} - Dr. ${a.doctorId}`,
          date: a.date,
        }))}
        eventClick={handleEventClick}
      />

      {/* Appointment form modal */}
      {modalOpen && (
        <AppointmentFormModal
          date={selectedDate}
          onSubmit={handleAddAppointment}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
