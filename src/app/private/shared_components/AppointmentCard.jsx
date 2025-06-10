"use client"

import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { submitObservation, sendInvoice } from "./functions";

export default function AppointmentCard({ appointment }) {
    const [date, setDate] = useState("")
    const [isToday, setIsToday] = useState()
    const [expanded, setExpanded] = useState(false)
    const [displayForm, setDisplayForm] = useState(false)
    const [error, setError] = useState("")

    const handleExpand = () => setExpanded(prev => !prev)
    const handleDisplay = () => setDisplayForm(prev => !prev)

    useEffect(() => {
        const d = new Date(appointment.date)
        const options = { day: '2-digit', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC'
            };

        const [datePart, timePart] = d.toLocaleString('en-GB', options).split(', ')
        setDate(`${datePart} - ${timePart}h`)

        const today = new Date()
        if (d.getFullYear() === today.getFullYear() &&
            d.getMonth() === today.getMonth() &&
            d.getDate() === today.getDate()) {
            setIsToday("Today")
        } else if ( d < today ) {
            setIsToday("Past")
        } else { setIsToday("Upcoming")}

    }, [appointment])

    const formik = useFormik({
        initialValues: {visited: true, observation: ""},
        validationSchema: Yup.object({
            visited: Yup.bool(), observation: Yup.string().optional().max(500, "Description limit 500.")
        }), onSubmit: async (values) => {
            setError("")
            const response = await submitObservation(values, appointment.id)
            const secondResponse = await sendInvoice(appointment.patient.email, appointment.treatment.name)
            if (response && secondResponse) {
                window.alert("Obeservations and Invoice sent.")
                window.location.reload()
            } else {
                setError("Something went wrong, please try again later.")
            }
        }
    })

    return (
        <div className="w-full min-h-content border border-[var(--turquoise)] rounded-3xl p-6 flex flex-col items-center relative">
            {displayForm && <div className="w-1/2 h-1/2 fixed z-30 p-6 bg-[var(--outer_space)] text-[var(--seasalt)] rounded-3xl flex flex-col">
                <button onClick={() => handleDisplay()} className="w-10 h-10"><FontAwesomeIcon icon={faCircleXmark} className="text-2xl absolute right-10 top-8" /></button>
                <form onSubmit={formik.handleSubmit} className="w-full h-full flex flex-col items-center">
                    <label htmlFor="observation">OBSERVATION:</label>
                    <textarea name="observation" id="observation" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.observation}
                         className="w-full h-5/6 border border-[var(--seasalt)] resize-none text-left align-top rounded-3xl p-5 text-[var(--seasalt)]"/>
                    <button type="submit" className="bg-[var(--seasalt)] text-[var(--outer_space)] px-6 py-1 w-50 rounded-3xl mt-6">CONFIRM</button>
                    <p>{error}</p>
                </form>
            
            </div>}
            <div className="flex w-full">
                <div className="flex flex-col flex-1">
                    <p className="font-bold">{date}</p>
                    <p>Patient: {appointment.patientId?.name} {appointment.patientId?.surname} {appointment.patientId?.DNI} </p>
                    <p>Doctor: {appointment.doctorId.firstname} {appointment.doctorId.lastname} </p>
                    <p>Treatment: {appointment.treatmentId.name}</p>
                </div>
                {isToday === "Upcoming" && <p className="items-center flex">-----</p>}
                {isToday === "Today" && (appointment.visited === true ? <p className="items-center flex">VISITED</p> 
                    : <button className="bg-[var(--mint_green)] rounded-3xl px-4 font-bold text-[var(--turquoise)]" 
                            onClick={() => handleDisplay()}>CHECK ARRIVED</button>)}
                {isToday === "Past" && (appointment.visited === true ? <p className="items-center flex">VISITED</p> : <p className="items-center flex">NOT VISITED</p>)}
            </div>

            {expanded && <div className="w-full">
                <hr className="border-[var(--turquoise)] m-5" />
                <p>Specialty: {appointment.treatmentId.type} </p>
                <p>Price: $ {appointment.treatmentId.price} </p>
                <p>Observations: {appointment.observation || "Not documented"} </p>
            </div>}

            {expanded? 
                <button className="absolute -bottom-5 bg-[var(--seasalt)] py-2 px-3 border border-[var(--turquoise)] rounded-full "
                    onClick={() => handleExpand()}>
                    <FontAwesomeIcon icon={faCaretDown} className="text-[var(--turquoise)] text-2xl rotate-180"/>
                </button>
                : 
                <button className="absolute -bottom-5 bg-[var(--seasalt)] py-2 px-3 border border-[var(--turquoise)] rounded-full "
                    onClick={() => handleExpand()}>
                    <FontAwesomeIcon icon={faCaretDown} className="text-[var(--turquoise)] text-2xl"/>
                </button>
            }
            
            
            
        </div>
    )
}