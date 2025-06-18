"use client"

import { useState, useEffect } from "react"
import { updateDoctor } from "../../shared_components/functions"
import Image from "next/image"
import { useFormik } from 'formik';
import './style.css'
import { doctorValidationSchema, getDoctInitialVal } from "../../shared_components/Doctor_validation_schema"

export default function DoctorProfile({ doctor }) {
    const [image, setImage] = useState()
    const [msg, setMsg] = useState("")

    useEffect(() => setImage(doctor?.img), [])

    const toggleCheckbox = (name, value) => {
        formik.setFieldValue(
        name,
        formik.values[name].includes(value)
            ? formik.values[name].filter((v) => v !== value)
            : [...formik.values[name], value]
        );
    };

    const displayTemporaryImage = (value) => {
        const reader = new FileReader()
        reader.onloadend = () => {
            setImage(reader.result)
        }
        reader.readAsDataURL(value.currentTarget.files[0])
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: getDoctInitialVal(doctor), 
        validationSchema: doctorValidationSchema,
        onSubmit: async (values) => {
            const response = await updateDoctor(values, doctor._id)
            console.log(response)
            if (response.data && response.image) {
                window.alert("Profile data and image successfully updated.")
                window.location.reload()
            } else if (response.data) {
                window.alert("Profile data successfully updated.")
                window.location.reload()
            } else if (response.image) {
                window.alert("Profile image successfully updated.")
                window.location.reload()
            } else {
                setMsg("Something went wrong. Please try again later.")
            }
        }
    })

    return (
        <section className="w-full h-max flex flex-col items-center">
            {doctor && (
            <form onSubmit={formik.handleSubmit} className="relative flex flex-col items-center w-full pb-20">
                <div className="m-10 flex flex-col items-center gap-4">
                    <div className="relative rounded-3xl w-50 h-50 overflow-hidden">
                        <Image src={image || "/images/default_doctor.jpg"} alt="profile" fill/>
                    </div>
                    <label 
                        className="hover:bg-[var(--mint_green)] rounded-3xl border border-[var(--turquoise)] py-1 px-4 transition text-xs"
                        >CHANGE IMAGE 
                        <input type="file" accept="/image*" onChange={(value) => {formik.setFieldValue("img", value.currentTarget.files[0]);
                                                                                displayTemporaryImage(value)
                        }}/> 
                    </label>
                </div>
                
                <div className="border-[var(--turquoise)] w-5/6 items-center flex flex-col rounded-3xl">
                    <p className="text-sm text-[var(--turquoise)]">PERSONAL DATA & CONTACT</p>
                    <hr className="w-5/6 border-[var(--turquoise)]" />
                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 p-4">
                        {["firstname", "lastname", "email", "phone"].map((field) => (
                            <div key={field}
                                className='flex flex-col'>
                                <label htmlFor={field}
                                    className='text-xs'>{field.toUpperCase()}</label>
                                <input type='text' name={field} id={field} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values[field]} />
                                {formik.touched[field] && formik.errors[field] ? (<p className='text-red-500 text-xs'>{formik.errors[field]}</p>) : null}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-[var(--mint_green)] w-5/6 items-center flex flex-col rounded-3xl">
                    <p className="text-sm text-[var(--turquoise)] pt-6">DOCTOR PROFILE</p>
                    <hr className="w-5/6 border-[var(--turquoise)]" />
                    <div className="flex flex-col items-center text-center w-full p-4" >

                        <div className='flex flex-col items-center'>
                            <p className='text-xs text-[var(--outer_space)]'>SPECIALTY</p>
                            <select name="specialty" id="specialty" onBlur={formik.handleBlur} onChange={(e) => {formik.handleChange(e)}} value={formik.values.specialty}
                                    className="w-50">
                                {["Cosmetic Surgery", "Forensic Pathology", "Neurology", "Space Medicine"].map(specialty => (
                                    <option key={specialty} value={specialty}>{specialty}</option>
                                ))}
                            </select>
                            {formik.touched.specialty && formik.errors.specialty ? (<p className='text-red-500 text-xs'>{formik.errors.specialty}</p>) : null}
                        </div>

                        <p className="text-xs text-[var(--outer_space)] pt-4">SHIFT</p>
                        <div className="checkbox-group flex gap-2 justify-center">
                            {["Morning", "Afternoon", "Night", "Latenight"].map((option) => (
                                <label key={option} className="checkbox-item">
                                <input
                                    type="checkbox"
                                    checked={Array.isArray(formik.values.shift) && formik.values.shift.includes(option)}
                                    onChange={() => toggleCheckbox("shift", option)}
                                />
                                {option}
                                </label>
                            ))}
                        </div>

                        <p className="text-xs text-[var(--outer_space)] pt-4">WORKDAYS</p>
                        <div className="checkbox-group flex gap-2 justify-center">
                            {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
                                <label key={day} className="checkbox-item">
                                <input
                                    type="checkbox"
                                    checked={formik.values.workdays?.includes(day)}
                                    onChange={() => toggleCheckbox("workdays", day)}
                                />
                                {day}
                                </label>
                            ))}
                        </div>

                        <label htmlFor="description">DESCRIPTION</label>
                        <textarea name="description" id="description" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.description}
                            className="w-1/2 h-75 bg-[var(--seasalt)] resize-none text-left align-top rounded-3xl p-5 " />
                        {formik.touched.description && formik.errors.description ? (<p className='text-red-500 text-xs'>{formik.errors.description}</p>) : null}
                    </div>
                </div>
                <p>{msg}</p>
                <button type="submit">SAVE PROFILE</button>
                <p className="text-xs">Updating image might take a while to load. Please be patient.</p>
            </form>)}
        </section>
    )
}