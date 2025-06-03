"use client"

import { useState, useEffect } from "react"
import { getDoctor } from "../../../functions"
import Image from "next/image"
import { useFormik } from 'formik';
import * as Yup from 'Yup';

export default function Profile() {
    const [doctor, setDoctor] = useState()

    useEffect(() => {
        const getData = async () => {
            const data = await getDoctor()
            if (!data) {
                console.log("Error later set error")
            } else {
                setDoctor(data)
            }
        }
        getData()
    }, [])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstname: doctor?.firstname,
            lastname: doctor?.lastname,
            email: doctor?.email,
            phone: doctor?.phone,
            specialty: doctor?.specalty,
            workdays: doctor?.workdays,
            img: doctor?.img,
            description: doctor?.description
        }, 
        validationSchema,
        onSubmit: async (values) => {

        }

    })

    return (
        <section className="w-full h-max flex flex-col items-center">
            {doctor && (
            <form onSubmit={formik.handleSubmit}>
                <div className="relative rounded-full w-50 h-50 overflow-hidden">
                    <Image src={doctor.img? doctor.img : "/images/default_doctor.jpg"} alt="profile" objectFit="cover" layout="fill"/>
                </div>
                <p>hello {doctor.email} </p>
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

    workdays: Yup.array()
        .of(Yup.string().oneOf([
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
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