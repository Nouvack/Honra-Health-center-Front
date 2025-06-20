"use client"

import Image from "next/image"
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useState } from "react";
import { logInAdmin, logInDoctor } from "./shared_components/functions";
import Fa2 from "./shared_components/Fa2";

export default function Private() {
    const [userType, setUserType] = useState(null)
    const [error, setError] = useState("")
    const [auth, setAuth] = useState(null)

    const changeUser = (type) => {
        setUserType(type)
        setError("") // Clear error when switching user types
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email format").required("Email is required"),
            password: Yup.string().required("Password is required")
        }),
        onSubmit: async (values) => {
            setError("")
            let response
            if (!userType) {
                setError("Please select a user type (Admin or Doctor).")
                return
            }
            if (userType === "doctor") {
                response = await logInDoctor(values)
            } else if (userType === "admin") {
                response = await logInAdmin(values)
            } 
            response? setAuth(response) : setError("Invalid credentials.")
        }
    });

    return (
        <section className="flex flex-col items-center justify-center h-screen bg-white">
            {/* Logo */}
            <div id="logo" className="mb-12">
                <Image src="/images/logo.png" alt="logo" width={120} height={50} className="mx-auto" />
                <p className="text-gray-700 text-sm tracking-wider mt-1">EMPLOYEE LOGIN</p>
            </div>

            {
                auth ? <Fa2 data={auth} role={userType} /> :
                <form onSubmit={formik.handleSubmit} className="w-full max-w-sm px-6 text-center">

                    {/* User Type Buttons */}
                    <div className="flex gap-4 justify-center mb-6">
                        <button
                            type="button"
                            id="admin-button"
                            className={`border px-4 py-1 rounded-3xl text-sm transition ${
                                userType === "admin" ? "bg-green-100 border-gray-600" : "bg-gray-100 border-gray-300"
                            }`}
                            onClick={() => changeUser("admin")}
                        >
                            ADMIN
                        </button>
                        <button
                            type="button"
                            id="doctor-button"
                            className={`border px-4 py-1 rounded-3xl text-sm transition ${
                                userType === "doctor" ? "bg-green-100 border-gray-600" : "bg-gray-100 border-gray-300"
                            }`}
                            onClick={() => changeUser("doctor")}
                        >
                            DOCTOR
                        </button>
                    </div>

                    {/* Email Field */}
                    <div className="text-left mb-4">
                        <label htmlFor="email" className="text-xs text-gray-700 block mb-1">EMAIL</label>
                        <input
                            id="email"
                            name="email"
                            type="text"
                            className="w-full px-4 py-2 bg-green-50 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-teal-400"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="text-left mb-6">
                        <label htmlFor="password" className="text-xs text-gray-700 block mb-1">PASSWORD</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="w-full px-4 py-2 bg-green-50 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-teal-400"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        id="submit-button"
                        className={`w-full ${
                            !userType ? "opacity-50 cursor-not-allowed" : ""
                        } bg-cyan-400 hover:bg-cyan-500 text-white font-medium py-2 rounded-3xl transition`}
                    >
                        ENTER
                    </button>

                    {/* Error Message */}
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </form>
            }
        </section>
    )
}
