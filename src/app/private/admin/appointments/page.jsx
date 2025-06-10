"use client"

import { filterAppointments } from "../../shared_components/functions"
import AppointmentCard from "../../shared_components/AppointmentCard"
import PrivateHeader from "../../shared_components/PrivateHeader"
import { getAllAppointents, getDoctors, makeAppByAdmin } from "../functions"
import { useState, useEffect } from "react"
import { useFormik } from "formik"
import * as Yup from "yup";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { filterData, getAvailableHours, getTreatments } from "@/app/shared_components/functions"

export default function Appointments() {
    const [error, setError] = useState()
    const [appointments, setAppointments] = useState([])
    const [search, setSearch] = useState()
    const [filteredAppointments, setFilteredAppointments] = useState([])
    const [filter, setFilter] = useState()
    const [open, setOpen] = useState(false)
    const [filteredDoctors, setFilteredDoctors] = useState([])
    const [filteredTreatments, setFilteredTreatments] = useState([])
    const [availableHours, setAvailableHours] = useState([])
    const [doctors, setDoctors] = useState([])
    const [message, setMessage] = useState("")

    const getDayStatus = (date) => {
        const doctor = filteredDoctors.find(doc => doc._id === formik.values.doctor);
        const day = date.getDay()
        const allowedDays = doctor?.workdays?.map(day => weekdayMap[day]) || []
        return allowedDays?.includes(day) ? true : false
    }

    useEffect(() => {
        const getData = async () => {
            const response = await getAllAppointents()
            if (!response) {
                setError("Could not fetch appointments data.")
            } else {
                setAppointments(response)
                setFilter("All")
            }
            const docs = await getDoctors()
            if (!docs) { setError("Could not fetch doctors data.")}
            else {setDoctors(docs)}
        }
        getData()
    }, [])

    useEffect(() => {
        const timeout = setTimeout( async() => {
            const response = await filterAppointments(appointments, search, filter)
            response ? setFilteredAppointments(response) : setError("Could not search appointments. Try again later.")
            
        }, 300)
        return () => clearTimeout(timeout)
    }, [search, filter])

    const formik = useFormik({
        initialValues: {patient: "", specialty: "", doctor: "", treatment: "", date: "", hour: ""},
        validationSchema: Yup.object({
            patient: Yup.string().required("Patient required."),
            doctor: Yup.string().required("Select a doctor."),
            treatment: Yup.string().required("Select a treatment."),
            date: Yup.date().required("Select a date.").min(new Date(new Date().setHours(0, 0, 0, 0)), "Date cannot be in the past."),
            hour: Yup.string().required("Select an hour.")
        }), onSubmit: async (values) => {
            const response = await makeAppByAdmin(values)
            response? setMessage("Appointment created.") : setMessage("Something went wrong.")
        }
    })

    useEffect(() => {
        if (doctors && doctors.length > 0) {
            updateFilter(formik.values.specialty)
        }
    }, [doctors])
    
        useEffect(() => {
            const getData = async () => {
                console.log(formik.values.specialty)
                const result = await getTreatments(formik.values.specialty)
                console.log(result)
                setFilteredTreatments(result || [])
            }
            getData()
        }, [formik.values.specialty])
        
        const updateFilter = async (filter, data = doctors) => {
            const result = await filterData(data, filter)
            setFilteredDoctors(result)
        } 
    
        useEffect(() => {
            const getHours = async() => {
                if (!formik.values.doctor || !formik.values.date) return;
                const response = await getAvailableHours(formik.values.doctor, formik.values.date)
                if (!response) {
                    setError("no data")
                } else {
                    setAvailableHours(response)
                }
            }
            getHours()
        }, [formik.values.doctor, formik.values.date])
    
    return (
        <section className="w-full flex flex-col items-center">
            <PrivateHeader/>
            <div className="w-full flex flex-col items-center p-20">
                <p className="font-bold">APPOINTMENTS</p>
                <hr className="w-5/6 border-[var(--turquoise)] mb-10" />
                <div className="w-120">
                    <p>{error}</p>
                    <p className="text-[var(--turquoise)]">SEARCH:</p>
                    <input type="text" onChange={(e) => setSearch(e.target.value)}
                        className="bg-[var(--mint_green)] rounded-3xl py-1 px-3 w-full" placeholder="PATIENT DNI / DOCTOR EMPLOYEE ID"/>
                    <p className="text-[var(--turquoise)]">FILTER:</p>
                    <div className="flex justify-between">
                        {["All", "Today", "Upcoming", "Past"].map((f) => 
                            <button key={f} onClick={() => setFilter(f)}
                                className={`py-1 px-6 rounded-3xl hover:bg-[var(--turquoise)] transition ${filter === f ? "bg-[var(--turquoise)]" : "bg-[var(--mint_green)]"}`}   
                            >{f}</button>
                        )}
                    </div>
                </div>
                {/**
                <div className="w-full m-10 flex flex-col items-center border rounded-3xl border-[var(--turquoise)]">
                        <button onClick={() => setOpen(true)}>+</button>
                        {open && <div>
                                <form onSubmit={formik.handleSubmit}>
                                    <label htmlFor="patient" className='text-xs'>PATIENT DNI</label>
                                    <input type="text" name="patient" id="patient" value={formik.values.patient}
                                        onBlur={formik.handleBlur} onChange={formik.handleChange}></input>
                                    {formik.touched.patient && formik.errors.patient && ( <p className='text-red-500 text-xs'>{formik.errors.patient}</p> )}

                                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 p-4'>
                                        <div className='flex flex-col'>
                                            <label htmlFor="specialty" className='text-xs'>SPECIALTY</label>
                                            <select name="specialty" id="specialty" onBlur={formik.handleBlur} onChange={(e) => {formik.handleChange(e); updateFilter(e.target.value)}} value={formik.values.specialty}>
                                                <option value="">---Select a specialty---</option>
                                                {["Cosmetic Surgery", "Forensic Pathology", "Neurology", "Space Medicine"].map(specialty => (
                                                    <option key={specialty} value={specialty}>{specialty}</option>
                                                ))}
                                            </select>
                                            {formik.touched.specialty && formik.errors.specialty && ( <p className='text-red-500 text-xs'>{formik.errors.specialty}</p> )}
                                        </div>
                                        <div className='flex flex-col'>
                                            <label htmlFor="doctor" className='text-xs'>DOCTOR</label>
                                            <select name="doctor" id="doctor" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.doctor}>
                                                <option value="">---Select a doctor---</option>
                                                {filteredDoctors?.map(doctor => (  
                                                    <option key={doctor._id} value={doctor._id}>{doctor.firstname} {doctor.lastname} </option>
                                                ))}
                                            </select>
                                            {formik.touched.doctor && formik.errors.doctor && ( <p className='text-red-500 text-xs'>{formik.errors.doctor}</p> )}
                                        </div>
                                        <div className='flex flex-col col-span-2'>
                                            <label htmlFor='treatment' className='text-xs'>TREATMENT</label>
                                            <select name='treatment' id='treatment' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.treatment}>
                                                <option value="">---Select a treatment---</option>
                                                {filteredTreatments?.map(treatment => (
                                                    <option key={treatment._id} value={treatment._id}>{treatment.name}</option>
                                                ))}
                                            </select>
                                            {formik.touched.treatment && formik.errors.treatment && ( <p className='text-red-500 text-xs'>{formik.errors.treatment}</p> )}
                                        </div>
                
                                        <div className='flex flex-col'>
                                            <label htmlFor='date' className='text-xs'>DATE</label>
                                            <DatePicker
                                                selected={formik.values.date}
                                                onChange={(date) => formik.setFieldValue("date", date)}
                                                placeholderText='---Select a date---'
                                                minDate={new Date()}
                                                filterDate={getDayStatus} />
                                        </div>
                
                                        <div className='flex flex-col'>
                                            <label htmlFor='hour' className='text-xs'>HOUR</label>
                                            <select name='hour' id='hour' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.hour}>
                                                <option value="">---Select an hour---</option>
                                                {availableHours?.map((slot) => (
                                                    <option key={slot} value={slot}>{slot}</option>
                                                ))}
                                            </select>
                                            {formik.touched.hour && formik.errors.hour && ( <p className='text-red-500 text-xs'>{formik.errors.hour}</p> )}
                                        </div>
                                        <p className='text-red-600'>{error}</p>
                                        
                                    </div>
                                    <p className='font-bold'>{message}</p>
                                    <button type="submit">CONFIRM APPOINTMENT</button>
                                </form>
                            </div>}
                </div>
                 */}

                {filteredAppointments?.length > 0 ? 
                    <div className="w-full m-10 gap-6 flex flex-col overflow-y-scroll p-5">
                        {filteredAppointments?.map((aptm) => <AppointmentCard appointment={aptm} key={aptm._id} />)}
                    </div> : <p className="m-20">You do not have any appointments.</p>
                }
                
            </div>

        </section>
    )
}

const weekdayMap = { sunday: 0, monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5, saturday: 6, };