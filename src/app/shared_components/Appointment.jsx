"use client"

import '@/style/appointments.css'
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { filterData, getAvailableHours, getPatient, getTreatments, sendAppointment } from './functions'
import * as Yup from "yup";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Appointment({doctors}) {
    const [filteredDoctors, setFilteredDoctors] = useState([])
    const [filteredTreatments, setFilteredTreatments] = useState([])
    const [availableHours, setAvailableHours] = useState([])
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

    const getDayStatus = (date) => {
        const doctor = filteredDoctors.find(doc => doc._id === formik.values.doctor);
        const day = date.getDay()
        const allowedDays = doctor?.workdays?.map(day => weekdayMap[day]) || []
        return allowedDays?.includes(day) ? true : false
    }

    const formik = useFormik({
        initialValues: {
            name: "", surname: "", phone: "", dni: "",
            specialty: "", doctor: "", treatment: "",
            date: "", hour: "", policy: false
        }, validationSchema: Yup.object({
            doctor: Yup.string().required("Select a doctor."),
            treatment: Yup.string().required("Select a treatment."),
            date: Yup.date().required("Select a date.").min(new Date(new Date().setHours(0, 0, 0, 0)), "Date cannot be in the past."),
            hour: Yup.string().required("Select an hour."),
            policy: Yup.bool().oneOf([true], "Accept the privacy policy.")
        }), onSubmit: async (values) => {
            const response = await sendAppointment(values)
            if (response) {
                setMessage("Appointment confirmed. Don't forget it. 🎉")
                formik.specialty.setFieldValue("")
                formik.date.setFieldValue("")
                formik.hour.setFieldValue("")
            } else {
                setMessage("Something went wrong. Please try again later.")
            }
        }
    })

    useEffect(() => {
        const getData = async () => {
            const response = await getPatient() 
            if (response?.status === false || !response) {
                setError( response.msg )
            } else {
                formik.setFieldValue("name", response.patient.name)
                formik.setFieldValue("surname", response.patient.surname)
                formik.setFieldValue("phone", response.patient.phoneNumber)
                formik.setFieldValue("dni", response.patient.DNI)
            }
        }
       getData()
    }, [])

    useEffect(() => {
        if (doctors && doctors.length > 0) {
            updateFilter(formik.values.specialty)
        }
    }, [doctors])

    useEffect(() => {
        const getData = async () => {
            const result = await getTreatments(formik.values.specialty)
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
        <section id="appointment" className="w-full h-max flex flex-col items-center mt-24">
            <div className="w-5/6 items-center flex flex-col rounded-3xl bg-cover"
                style={{backgroundImage: `url('/images/textured_bg_small.png')`}}>
                <p className="text-xl font-bold p-4">Make an Appointment</p>
                <form onSubmit={formik.handleSubmit} className="flex flex-col relative w-full h-max items-center">
                    {/** PATIENT DATA */}
                    {error? <p>{error}</p> : 
                    <>
                        <p className="text-sm text-[var(--outer_space)]">PATIENT DATA</p>
                        <hr className="w-5/6 border-[var(--outer_space)]" />
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 p-4'>
                            {["name", "surname", "phone", "dni"].map((field) => (
                                <div key={field}
                                    className='flex flex-col'>
                                    <label htmlFor={field}
                                        className='text-xs text-[var(--outer_space)]'>{field.toUpperCase()}</label>
                                    <input name={field} id={field} disabled={true} value={formik.values[field]}
                                        className='bg-[var(--mint_green)] py-1 w-40 rounded-3xl text-center' />
                                </div>
                            ))}
                        </div>
                        <p className='text-xs'>*This data is only for preview, you can change it from your profile.</p>
                    </>
                    }
                    {/** SPECIALTY */}
                    <p className="text-sm text-[var(--outer_space)] pt-4">SPECIALTY</p>
                    <hr className="w-5/6 border-[var(--outer_space)]" />
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
                        <label className='col-span-2'>
                            <input type='checkbox' name='policy' id='policy' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.policy} className='mr-2'/>I accept the policy
                        </label>
                        {formik.touched.policy && formik.errors.policy && ( <p className='text-red-500 text-xs'>{formik.errors.policy}</p> )}
                    </div>
                    <p className='font-bold'>{message}</p>
                    {/** SEND */}
                    <button type="submit">CONFIRM APPOINTMENT</button>
                    
                </form>
            </div>

        </section>
    )
}

const weekdayMap = { sunday: 0, monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5, saturday: 6, };