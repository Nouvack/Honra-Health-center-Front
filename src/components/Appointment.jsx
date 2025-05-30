"use client"

import '@/style/appointments.css'
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { filterData } from './functions'
import * as Yup from 'Yup';

export default function Appointment({doctors}) {
    const [filteredDoctors, setFilteredDoctors] = useState([])
    const [error, setError] = useState("")

    const formik = useFormik({
        initialValues: {
            nombre: "",
            apellidos: "",
            telefono: "",
            dni: "",
            especialidad: "",
            doctor: "",
            fecha: "",
            hora: "",
            primeraVisita: false,
            razonVisita: ""
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required(),
            apellidos: Yup.string().required(),
            telefono: Yup.string().required().length(9),
            dni: Yup.string().required(),
            especialidad: Yup.string().required(),
            doctor: Yup.string().required(),
            // falta por completar pero me da pereza
        })
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
                                <input type='text' name={field} id={field} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.field} />
                                {formik.touched.field && formik.errors.field ? (<p className='hidden peer-invalid:block'>{formik.errors.field}</p>) : null}
                            </div>
                        ))}
                    </div>

                    {/** SPECIALTY */}
                    <p className="text-sm text-[var(--turquoise)]">SPECIALTY</p>
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
                            {formik.touched.specialty && formik.errors.specialty ? (<p className='hidden peer-invalid:block'>{formik.errors.specialty}</p>) : null}
                        </div>


                        <label>
                            <input type='checkbox' name='firstVisit' value={formik.values.firstVisit} className='mr-2'/>First visit
                        </label>

                        {formik.values.firstVisit == true ? <div>
                            <label htmlFor="reason" className='text-xs'>REASON OF VISIT</label>
                        </div> : null}

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