"use client"
//import "@/style/login_register.css"
import Login from "./Login"
import { useFormik } from "formik";
import * as Yup from "Yup";
import { useState } from "react";

export default function Register({ onSwitch }) {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            name: "",
            surname: "",
            phoneNumber: "",
            birthDate: "",
            DNI: "",
            gender: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email(),
            password: Yup.string(),
            name: Yup.string().required("Name is required"),
            surname: Yup.string().required("Surname is required"),
            phoneNumber: Yup.string().required("Phone number is required"),
            birthDate: Yup.date().required("Birth date is required"),
            DNI: Yup.string().required("DNI is required"),
            gender: Yup.string().required("Gender is required"),
        }),
        onSubmit: (values) => {
            //const response = await 
        }
    })



        return (
            <section id="background" className="w-screen h-screen flex items-center justify-center" >
                <div className="w-1/2 h-screen hidden lg:block">
                    <img src="/images/Polygon 3.png" alt="Placeholder Image" className="object-cover w-full h-full" />
                    <img src="/images/Polygon 4.png" alt="Placeholder Image" className="absolute top-0 left-0 w-180 h-190" />
                    <img src="/images/doctora_bg.png" alt="Placeholder Image" className="absolute top-8 left-30 w-150 h-200" />
                </div>
                <div id="componentR" className="mt-16 flex w-3/5 max-w-md flex-col justify-center items-center p-3 gap-3">
                    <p className="font-bold text-base">Register</p>
                    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3 w-full items-center">
                        <div>
                            <p className="text-xs">Name</p>
                            <input id="border" type="text" placeholder="Juan" {...formik.getFieldProps("name")} className="w-full px-2 py-1 text-sm" />
                        </div>
                        <div>
                            <p className="text-xs">Surname</p>
                            <input id="border" type="text" placeholder="Pérez" {...formik.getFieldProps("surname")} className="w-full px-2 py-1 text-sm" />
                        </div>
                        <div>
                            <p className="text-xs">Birth date</p>
                            <input id="border" type="date" {...formik.getFieldProps("birthdate")} className="w-full px-2 py-1 text-sm" />
                        </div>
                        <div>
                            <p className="text-xs">DNI</p>
                            <input id="border" type="text" placeholder="00000000A" {...formik.getFieldProps("dni")} className="w-full px-2 py-1 text-sm" />
                        </div>
                        
                        <div>
                        <p className="text-xs mb-2">Gender</p>
                            <div className="flex">
                            {["mujer", "hombre", "otros"].map((option) => (
                                <div key={option} className="flex items-center me-4">
                                    <input
                                        id={`radio-${option}`}
                                        type="radio"
                                        value={option}
                                        name="gender"
                                        onChange={formik.handleChange}
                                        checked={formik.values.gender === option}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label htmlFor={`radio-${option}`} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </label>
                                </div>
                            ))}
                        </div>
                        </div>
                        

                        <div>
                            <p className="text-xs">Email</p>
                            <input id="border" type="email" placeholder="Luis@gmail.com" {...formik.getFieldProps("email")} className="w-full px-2 py-1 text-sm" />
                        </div>
                        <div>
                            <p className="text-xs">Password</p>
                            <input id="border" type="password" placeholder="********" {...formik.getFieldProps("password")} className="w-full px-2 py-1 text-sm" />
                        </div>
                        <button type="submit" className="bg-[var(--button)] p-2 rounded-md w-full text-white text-sm">Register</button>
                    </form>
                    <p className="text-xs mb-3">
                        ¿Ya tienes cuenta?{" "}
                        <button
                            onClick={onSwitch}
                            className="underline text-[var(--turquoise)] bg-transparent border-none p-0 m-0 cursor-pointer"
                        >
                            Iniciar sesión
                        </button>
                    </p>
                </div>

            </section>
        )
    }

