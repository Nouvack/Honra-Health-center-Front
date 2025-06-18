"use client";
import "./style.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { registerAPatient, resendVerificationEmail } from "./functions";
import Cookies from "../../documents/cookies/page";

export default function Register({ onSwitch }) {
    const [showCookiesModal, setShowCookiesModal] = useState(false);
    const [privacyViewed, setPrivacyViewed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("")
    const [resendEmail, setResendEmail] = useState(false)

    const formik = useFormik({
        initialValues: {
            email: "", password: "", name: "", surname: "",
            phoneNumber: "", birthDate: "", DNI: "", gender: "",
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
            setError("")
            setIsSubmitting(true);
            try {
                const response = await registerAPatient(values);

                if (response?.success) {
                    alert("Registration successful! Please check your email to verify your account.");
                } else {
                    setError(response.message)
                    setIsSubmitting(false);
                }
            } catch (error) {
                alert("Internal server error.");
                setIsSubmitting(false);
            } 
        }
    });

    return (
        <section className="w-screen h-screen flex items-center justify-center bg-cover"
            style={{backgroundImage: `url('/images/textured_bg.png')`}}>

            <div id="componentR" className="mt-16 flex w-1/2 flex-col justify-center items-center p-3 gap-3">
                {resendEmail ? <div className="w-full flex flex-col items-center justify-center py-4">
                    <p className="font-bold">Resend verification email:</p>
                    <ResendEmailForm email={formik.values.email} setResendEmail={setResendEmail}/>
                </div> : 
                <>
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
                            {formik.touched[field] && formik.errors[field] && (
                                <p className="text-red-500 text-xs mt-1">{formik.errors[field]}</p>
                            )}
                        </div>
                    ))}

                    <div>
                        <p className="text-xs">Birth date</p>
                        <input id="border" type="date" {...formik.getFieldProps("birthDate")} className="w-full px-2 py-1 text-sm" />
                        {formik.touched.birthDate && formik.errors.birthDate && (
                                <p className="text-red-500 text-xs mt-1">{formik.errors.birthDate}</p>
                            )}
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
                            {formik.touched.gender && formik.errors.gender && (
                                <p className="text-red-500 text-xs mt-1">{formik.errors.gender}</p>
                            )}
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
                    
                    <div className="flex flex-col items-center justify-center col-span-2">
                        <p>{error}</p>
                        <button
                            type="submit"
                            disabled={isSubmitting || resendEmail}
                            className="bg-[var(--button)] p-2 rounded-3xl w-1/2 text-white text-sm  text-center"
                        >
                        {isSubmitting ? "Registering..." : "Register"}
                        </button>
                    </div>
                            
                </form>

                <div className="flex flex-col">
                    <button className="text-xs mb-3"
                            onClick={() => setResendEmail(true)}
                        >Resend verification email.</button>
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
                </>
                }
                
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


function ResendEmailForm({email, setResendEmail}) {
    const [error, setError] = useState("")

    const handleReturn = () => setResendEmail(false)

    const formik = useFormik({
        initialValues: {
            email: email || ""
        }, validationSchema: Yup.object({email: Yup.string().email("Invalid email").required("Email is required"),}),
        onSubmit: async (values) => {
            setError("")
            const response = await resendVerificationEmail(values)
            setError(response?.message)
        }
    })
    return (
        <form onSubmit={formik.handleSubmit}
            className="flex flex-col gap-3 w-full items-center justify-center">
            <label>Email:</label>
            <input type="text" id="email" name="email" value={formik.values.email}
                onChange={formik.handleChange} onBlur={formik.handleBlur}
                className="p-2 border rounded-3xl w-1/2"></input>
            {formik.touched.email && formik.errors.email && ( <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p> )}

            <p>{error}</p>
            <button type="submit"
                className="bg-[var(--outer_space)] text-[var(--seasalt)] py-1 px-4 rounded-3xl">Resend</button>
            <button onClick={() => handleReturn()}
                className="text-xs">Return to register</button>
        </form>
    )
}