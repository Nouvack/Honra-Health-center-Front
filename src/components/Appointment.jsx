"use client"

import '@/style/appointments.css'
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { filterData, getAvailableHours } from './functions'
import * as Yup from "yup";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Appointment({doctors}) {
    const [filteredDoctors, setFilteredDoctors] = useState([])
    const [selectedDate, setSelectedDate] = useState(null)
    const [availableHours, setAvailableHours] = useState([])
    const [error, setError] = useState("")

    const getDayColor = (date) => {
        const doctor = filteredDoctors.find(doc => doc._id === formik.values.doctor);
        const day = date.getDay()
        const allowedDays = doctor.workdays?.map(day => weekdayMap[day])
        return allowedDays?.includes(day) ? 'bg-[var(--mint_green)] rounded-full' : ''
    }

    const formik = useFormik({
        initialValues: {
            specialty: "",
            doctor: "",
            date: "",
            hour: ""
        }
    })

    useEffect(() => {
        if (doctors && doctors.length > 0) {
            updateFilter(formik.values.especialidad)
        }
    }, [doctors])
    
    const updateFilter = async (filter, data = doctors) => {
        const result = await filterData(data, filter)
        setFilteredDoctors(result)
    } 

    useEffect(() => {
        const getHours = async() => {
            if (!formik.values.doctor || !selectedDate) return;
            const response = await getAvailableHours(formik.values.doctor, selectedDate)
            if (!response) {
                setError("no data")
            } else {
                setAvailableHours(response)
            }
        }
        getHours()
    }, [formik.values.doctor, selectedDate])

    return (
        <section id="appointment" className="w-full h-max flex flex-col items-center mt-24">
            <div className="bg-[var(--mint_green)] w-5/6 items-center flex flex-col rounded-3xl">
                <p className="text-xl font-bold p-4">Make an Appointment</p>
                <div className="flex flex-col relative w-full h-max items-center">
                    {/** PATIENT DATA */}
                    <p className="text-sm text-[var(--turquoise)]">PATIENT DATA</p>
                    <hr className="w-5/6 border-[var(--turquoise)]" />
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 p-4'>
                        {["name", "surname", "phone", "dni"].map((field) => (
                            <div key={field}
                                className='flex flex-col'>
                                <label htmlFor={field}
                                    className='text-xs'>{field.toUpperCase()}</label>
                                <p className='bg-[var(--seasalt)] py-1 w-40 rounded-3xl text-center'>{"hey"} </p>
                            </div>
                        ))}
                    </div>
                    <p className='text-xs'>*This data is only for preview, you can change it from your profile.</p>

                    {/** SPECIALTY */}
                    <p className="text-sm text-[var(--turquoise)] pt-4">SPECIALTY</p>
                    <hr className="w-5/6 border-[var(--turquoise)]" />
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 p-4'>
                        <div className='flex flex-col'>
                            <label htmlFor="specialty"
                                className='text-xs'>SPECIALTY</label>
                            <select name="specialty" id="specialty" onBlur={formik.handleBlur} onChange={(e) => {formik.handleChange(e); updateFilter(e.target.value)}} value={formik.values.specialty}>
                                {["Cosmetic Surgery", "Forensic Pathology", "Neurology", "Space Medicine"].map(specialty => (
                                    <option key={specialty} value={specialty}>{specialty}</option>
                                ))}
                            </select>
                            {formik.touched.specialty && formik.errors.specialty ? (<p className='hidden peer-invalid:block'>{formik.errors.specialty}</p>) : null}
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="doctor"
                                className='text-xs'>DOCTOR</label>
                            <select name="doctor" id="doctor" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.doctor}>
                                {filteredDoctors.map(doctor => (
                                    <option key={doctor._id} value={doctor._id}>{doctor.firstname} {doctor.lastname} </option>
                                ))}
                            </select>
                            {formik.touched.doctor && formik.errors.doctor ? (<p className='hidden peer-invalid:block'>{formik.errors.doctor}</p>) : null}
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor='date' className='text-xs'>DATE</label>
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                dayClassName={getDayColor}
                                placeholderText='Choose a date'/>
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor='hour' className='text-xs'>HOUR</label>
                            <select name='hour' id='hour' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.hour}>
                                {availableHours?.map((slot) => (
                                    <option key={slot} value={slot}>{slot}</option>
                                ))}
                                {formik.touched.hour && formik.errors.hour ? (<p className='hidden peer-invalid:block'>{formik.errors.hour}</p>) : null}
                            </select>
                        </div>

                        <label className='col-span-2'>
                            <input type='checkbox' name='policy' className='mr-2'/>I accept the policy
                        </label>
                    </div>

                    {/** SEND */}
                    <button type="submit">CONFIRM APPOINTMENT</button>
                    
                </div>
            </div>

        </section>
    )
}

const weekdayMap = { sunday: 0, monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5, saturday: 6, };