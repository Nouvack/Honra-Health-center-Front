"use client"

import { useState, useEffect } from "react"
import { getDoctor } from "../../../functions"
import Image from "next/image"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../style.css'
import { readShifts } from "../functions";
import Header from "@/app/private/components/Header";

export default function Profile() {
    const [doctor, setDoctor] = useState()

    useEffect(() => {
        const getData = async () => {
            const data = await getDoctor()
            const readableShifts = await readShifts(data?.shift || [])
            if (!data) {
                console.log("Error later set error")
            } else {
                setDoctor({...data, shift: readableShifts})
            }
        }
        getData()
    }, [])

    const toggleCheckbox = (name, value) => {
        formik.setFieldValue(
        name,
        formik.values[name].includes(value)
            ? formik.values[name].filter((v) => v !== value)
            : [...formik.values[name], value]
        );
    };

    const selectImage = (data) => {
        const file = data.currentTarget.files[0]
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                formik.setFieldValue("img", reader.result); 
            };
            reader.readAsDataURL(file);
        }
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstname: doctor?.firstname || '',
            lastname: doctor?.lastname || '',
            email: doctor?.email || '',
            phone: doctor?.phone || '',
            specialty: doctor?.specialty || '',
            shift: doctor?.shift || [],
            workdays: doctor?.workdays || [],
            img: doctor?.img || '',
            description: doctor?.description || ''
        }, 
        validationSchema,
        onSubmit: async (values) => {
            
        }

    })

    return (
        <section className="w-full h-max flex flex-col items-center">
            <Header />
            {doctor && (
            <form onSubmit={formik.handleSubmit} className="relative flex flex-col items-center w-full pb-20">
                <div className="m-10 flex flex-col items-center gap-4">
                    <div className="relative rounded-full w-50 h-50 overflow-hidden">
                        <Image src={formik.values.img || "/images/default_doctor.jpg"} alt="profile" objectFit="cover" layout="fill"/>
                    </div>
                    <label 
                        className="hover:bg-[var(--mint_green)] rounded-3xl border border-[var(--turquoise)] py-1 px-4 transition text-xs"
                        >CHANGE IMAGE 
                        <input type="file" accept="/image*" onChange={(value) => selectImage(value)}/> 
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
                                {formik.touched[field] && formik.errors[field] ? (<p className='hidden peer-invalid:block'>{formik.errors[field]}</p>) : null}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-[var(--mint_green)] w-5/6 items-center flex flex-col rounded-3xl">
                    <p className="text-sm text-[var(--turquoise)] pt-6">DOCTOR PROFILE</p>
                    <hr className="w-5/6 border-[var(--turquoise)]" />
                    <div className="flex flex-col text-center w-full p-4" >

                        <div className='flex flex-col items-center'>
                            <p className='text-xs text-[var(--outer_space)]'>SPECIALTY</p>
                            <select name="specialty" id="specialty" onBlur={formik.handleBlur} onChange={(e) => {formik.handleChange(e)}} value={formik.values.specialty}
                                    className="w-50">
                                {["Cosmetic Surgery", "Forensic Pathology", "Neurology", "Space Medicine"].map(specialty => (
                                    <option key={specialty} value={specialty}>{specialty}</option>
                                ))}
                            </select>
                            {formik.touched.specialty && formik.errors.specialty ? (<p className='hidden peer-invalid:block'>{formik.errors.specialty}</p>) : null}
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
                                    checked={formik.values.workdays.includes(day)}
                                    onChange={() => toggleCheckbox("workdays", day)}
                                />
                                {day}
                                </label>
                            ))}
                        </div>

                        <label htmlFor="description">DESCRIPTION</label>
                        <textarea name="description" id="description" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.description}
                            className="w-full h-100 bg-[var(--seasalt)] resize-none text-left align-top rounded-3xl p-5" />
                        {formik.touched.description && formik.errors.description ? (<p className='hidden peer-invalid:block'>{formik.errors.description}</p>) : null}
                    </div>
                </div>

                <button type="submit">SAVE PROFILE</button>
            </form>)}
        </section>
    )
}

const validationSchema = Yup.object({
    firstname: Yup.string()
        .required('First name is required')
        .min(2, 'Too short')
        .max(50, 'Too long'),

    lastname: Yup.string()
        .required('Last name is required')
        .min(2, 'Too short')
        .max(50, 'Too long'),

    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),

    phone: Yup.string()
        .matches(/^\+?[0-9\s\-()]{7,20}$/, 'Invalid phone number')
        .required('Phone is required'),

    specialty: Yup.string()
        .required('Specialty is required'),

    shift: Yup.array()
        .of(Yup.string().oneOf([
        "Morning", "Afternoon", "Night", "Latenight"
        ]))
        .min(1, 'At least one workday must be selected')
        .required('Shift is required.'),

    workdays: Yup.array()
        .of(Yup.string().oneOf([
        'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
        ]))
        .min(1, 'At least one workday must be selected')
        .required('Workdays are required'),

    img: Yup.string()
        .url('Must be a valid image URL')
        .nullable(),

    description: Yup.string()
        .max(1000, 'Too long')
        .nullable()
    })