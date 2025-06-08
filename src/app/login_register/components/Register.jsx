"use client"
import "./style.css"
import Login from "./Login"
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Cookies from "@/app/documents/cookies/page";

export default function Register({ onSwitch }) {
    const [showCookiesModal, setShowCookiesModal] = useState(false);
    const [privacyViewed, setPrivacyViewed] = useState(false);

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
            privacyPolicy: false,
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
            privacyPolicy: Yup.boolean().oneOf([true], "You must accept the privacy policy"),
        }),
        onSubmit: async (values) => {
            try {
                const response = await fetch("/api/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("Register successful:", data);
                    localStorage.setItem("token", data.token);
                    //  redirección pagian usaurios
                    router.push("/profile");
                } else {
                    const error = await response.json();
                    console.error("Login failed:", error);
                }
            } catch (error) {
                console.error("Error in login:", error);
            }
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
                        <input id="border" type="date" {...formik.getFieldProps("birthDate")} className="w-full px-2 py-1 text-sm" />
                    </div>
                    <div>
                        <p className="text-xs">DNI</p>
                        <input id="border" type="text" placeholder="00000000A" {...formik.getFieldProps("DNI")} className="w-full px-2 py-1 text-sm" />
                    </div>

                    <div>
                        <p className="text-xs">Gender</p>
                        <div className="flex px-2 py-1">
                            {["woman", "man", "others"].map((option) => (
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
                    {/* Protección de datos */}
                    <div className="flex items-center mb-2">
                    <input
                        id="privacy-policy"
                        type="checkbox"
                        required
                        disabled={!privacyViewed}
                        {...formik.getFieldProps("privacyPolicy")}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                        <label htmlFor="privacy-policy" className="ms-2 text-xs text-gray-900 dark:text-gray-300">
                            I agree to the{" "}
                            <button
                                type="button"
                                onClick={() => setShowCookiesModal(true)}
                                className="underline text-[var(--turquoise)] bg-transparent border-none p-0 m-0 cursor-pointer"
                            >
                                privacy policy
                            </button>
                        </label>
                    </div>

                    <button type="submit" disabled={!formik.values.privacyPolicy} className="bg-[var(--button)] p-2 rounded-md w-full text-white text-sm">Register</button>
                </form>
                <p className="text-xs mb-3">
                    Do you already have an account?{" "}
                    <button
                        onClick={onSwitch}
                        className="underline text-[var(--turquoise)] bg-transparent border-none p-0 m-0 cursor-pointer"
                    >
                        Log in
                    </button>
                </p>
            </div>

            {showCookiesModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white w-4/5 max-w-lg max-h-[80vh] overflow-y-auto rounded-lg p-6 relative">
                        <button
                            onClick={() => {
                                setShowCookiesModal(false);
                                setPrivacyViewed(true);
                            }}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-xl"
                            aria-label="Close modal"
                        >
                            &times;
                        </button>
                        <Cookies />
                    </div>
                </div>
            )}
        </section>
    )
}
