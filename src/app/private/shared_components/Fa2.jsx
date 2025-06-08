"use client"

import { useRef, useState } from "react";
import { verify2Fa, updatePassword } from "./functions";
import { useRouter }  from "next/navigation"
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Fa2({ data, role }) {
    const router = useRouter(); 
    const [code, setCode] = useState(new Array(6).fill(''));
    const inputsRef = useRef([])
    const [error, setError] = useState()
    const [changePassword, setChangePassword] = useState(false)
    const [doctorId, setDoctorId] = useState()

    const handleChange = (e, index) => {
        const value = e.target.value.replace(/\D/, '')
        if (!value) return

        const newCode = [...code]
        newCode[index] = value[0]
        setCode(newCode)

        if (index <5) {
            inputsRef.current[index + 1].focus()
        }

        if (newCode.every((digit) => digit !== '')) {
            verifyCode(newCode.join(''))
        }
    }

    const handlePaste = (e) => {
        const pasted = e.clipboardData.getData('text').slice(0, 6).replace(/\D/g, '');
        if (pasted.length !== 6) return;

        const newCode = pasted.split('');
        setCode(newCode);
        verifyCode(pasted);
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
        const newCode = [...code];
        newCode[index - 1] = '';
        setCode(newCode);
        inputsRef.current[index - 1].focus();
        }
    };

    const verifyCode = async(fullCode) => {
        setError("")
        const response = await verify2Fa(data.token, fullCode, role)
        if (!response) {
            setError("Invalid code.")
            setCode(new Array(6).fill(''))
            inputsRef.current[0].focus()
        } else {
            if (role === "doctor") {
                if (data.first === true) {
                    setDoctorId(response.doctorId)
                    setChangePassword(true)
                } else {
                    router.push(`/private/doctors/${response.employeeId}`)
                }
            } else if (role === "admin") {
                router.push(`/private/admin`)
            }
        }
    }

    const formik = useFormik({
        initialValues: { newPassword: "", repeatPassword: "" },
        validationSchema: Yup.object({
            newPassword: Yup.string().required().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
            repeatPassword: Yup.string().required("Please confirm your password").oneOf([Yup.ref("newPassword")], "Passwords must match"),
        }), onSubmit: async (values) => {
            const response = await updatePassword(values.newPassword, doctorId)
            if (response === "Error 400") {
                setError("New password can't be the same as the old one.")
            } else if (!response) {
                setError("Something wen't wrong.")
            } else {
                router.push(`/private/doctors/${response}`)
            }
        }
    })

    return (
        <section className="w-full max-w-sm px-6 text-center flex flex-col">
            {changePassword? <form onSubmit={formik.handleSubmit} className="flex flex-col justify-center" > 
                {/** REQUIRE CHANGE PASSWORD - 2FA */}
                <div className="text-left mb-6">
                    <label htmlFor="newPassword" className="text-xs text-gray-700 block mb-1">NEW PASSWORD</label>
                    <input id="newPassword" name="newPassword" type="password"
                        className="w-full px-4 py-2 bg-green-50 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-teal-400"
                        onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.newPassword}
                    />
                    {formik.touched.newPassword && formik.errors.newPassword && ( <p className="text-red-500 text-xs mt-1">{formik.errors.newPassword}</p> )}
                </div>
                <div className="text-left mb-6">
                    <label htmlFor="repeatPassword" className="text-xs text-gray-700 block mb-1">REPEAT PASSWORD</label>
                    <input id="repeatPassword" name="repeatPassword" type="password"
                        className="w-full px-4 py-2 bg-green-50 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-teal-400"
                        onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.repeatPassword}
                    />
                    {formik.touched.repeatPassword && formik.errors.repeatPassword && ( <p className="text-red-500 text-xs mt-1">{formik.errors.repeatPassword}</p> )}
                </div>
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                <button type="submit" className="bg-[var(--outer_space)] text-[var(--seasalt)] rounded-3xl py-1 px-4">CHANGE PASSWORD</button>
            </form> : 
            <div>
                {/** NORMAL FLOW - 2FA */}
                {data.first === true && <>
                    <p>Scan this QR code with Google Authenticator:</p>
                    <img src={data.qr} alt="QR Code" />
                </>}
            
                <p>Enter your 2FA code:</p>
                <div onPaste={handlePaste} className="flex gap-2">
                    {code.map((digit, index) => (
                        <input key={index} type="text" inputMode="numeric" maxLength={1} value={digit}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        ref={(el) => (inputsRef.current[index] = el)}
                        className="w-12 h-12 text-center text-2xl border border-gray-400 rounded focus:outline-none"
                        />
                    ))}
                </div>
                <p className="text-red-500">{error}</p>
            </div>
            }

        </section>
    )
}