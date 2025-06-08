"use client"

import * as Yup from 'yup';

export const getDoctInitialVal = (doctor) => {
    return  {
        firstname: doctor?.firstname || '',
        lastname: doctor?.lastname || '',
        email: doctor?.email || '',
        phone: doctor?.phone || '',
        specialty: doctor?.specialty || '',
        shift: doctor?.shift || [],
        workdays: doctor?.workdays || [],
        img: doctor?.img || '',
        description: doctor?.description || ''
    }
}

export const doctorValidationSchema = Yup.object({
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

    img: Yup.mixed()
        .test("fileOrUrl", "Must be a file or a valid URL", (value) => {
            if (!value) return true; // allow empty
            if (typeof value === "string") {
            return /^https?:\/\/.+/.test(value); // it's a valid URL
            }
            return value instanceof File; // it's a File object
        })
        .nullable(),
    description: Yup.string()
        .max(1000, 'Too long')
        .nullable()
    })