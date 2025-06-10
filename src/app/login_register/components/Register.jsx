"use client";
import "./style.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { registerAPatient } from "./functions";
import Cookies from "../../documents/cookies/page"; // Ensure this is correctly imported

export default function Register({ onSwitch }) {
    const [showCookiesModal, setShowCookiesModal] = useState(false);
    const [privacyViewed, setPrivacyViewed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
            email: Yup.string().email("Invalid email").required("Email is required"),
            password: Yup.string().required("Password is required"),
            name: Yup.string().required("Name is required"),
            surname: Yup.string().required("Surname is required"),
            phoneNumber: Yup.string().required("Phone number is required"),
            birthDate: Yup.date().required("Birth date is required"),
            DNI: Yup.string().required("DNI is required"),
            gender: Yup.string().required("Gender is required"),
            privacyPolicy: Yup.boolean().oneOf([true], "You must accept the privacy policy"),
        }),
        onSubmit: async (values) => {
            setIsSubmitting(true);
            try {

                if (typeof registerAPatient !== "function") {
                    throw new Error("registerPatient is not a function or is not properly imported.");
                }

                const response = await registerAPatient(values);

                if (response?.success) {
                    alert("Registration successful! Please check your email to verify your account.");
                    if (onSwitch && typeof onSwitch === "function") {
                        onSwitch();
                    } else {
                        console.warn("onSwitch not provided or not a function.");
                    }
                } else {
                    alert("Registration failed: " + (response?.message || "Unknown error"));
                }
            } catch (error) {
                console.error("Registration error:", error);
                alert("An error occurred. Please check the console.");
            } finally {
                setIsSubmitting(false);
            }
        }
    });

    return (
        <section className="w-screen h-screen flex items-center justify-center bg-cover"
            style={{backgroundImage: `url('/images/textured_bg.png')`}}>

            <div id="componentR"
                className="mt-16 flex w-1/2 flex-col justify-center items-center p-3 gap-3">
                <p className="font-bold text-base">Register</p>

                <form onSubmit={formik.handleSubmit} className="grid grid-cols-2 gap-3 w-full items-center justify-center">
                    {["name", "surname", "phoneNumber", "DNI", "email", "password"].map((field) => (
                        <div key={field}>
                            <p className="text-xs capitalize">{field.replace(/([A-Z])/g, ' $1')}</p>
                            <input
                                id="border"
                                type={field === "email" ? "email" : field === "password" ? "password" : "text"}
                                placeholder={field === "email" ? "Luis@gmail.com" : ""}
                                {...formik.getFieldProps(field)}
                                className="w-full px-2 py-1 text-sm"
                            />
                        </div>
                    ))}

                    <div>
                        <p className="text-xs">Birth date</p>
                        <input id="border" type="date" {...formik.getFieldProps("birthDate")} className="w-full px-2 py-1 text-sm" />
                    </div>

                    <div>
                        <p className="text-xs">Gender</p>
                        <div className="flex px-2 py-1">
                            {["Woman", "Man", "Other"].map((option) => (
                                <div key={option} className="flex items-center me-4">
                                    <input
                                        id={`radio-${option}`}
                                        type="radio"
                                        value={option}
                                        name="gender"
                                        onChange={formik.handleChange}
                                        checked={formik.values.gender === option}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                    />
                                    <label htmlFor={`radio-${option}`} className="ms-2 text-sm font-medium text-gray-900">
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center mb-2">
                        <input
                            id="privacy-policy"
                            type="checkbox"
                            required
                            {...formik.getFieldProps("privacyPolicy")}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                        />
                        <label htmlFor="privacy-policy" className="ms-2 text-xs text-gray-900">
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
                    <div className="flex items-center justify-center col-span-2">
                            <button
                        type="submit"
                        disabled={isSubmitting || !formik.values.privacyPolicy}
                        className="bg-[var(--button)] p-2 rounded-3xl w-1/2 text-white text-sm  text-center"
                    >
                        {isSubmitting ? "Registering..." : "Register"}
                    </button>
                    </div>
                            
                </form>

                <p className="text-xs mb-3">
                    Already have an account?{" "}
                    <button
                        onClick={() => onSwitch("login")}
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
    );
}
