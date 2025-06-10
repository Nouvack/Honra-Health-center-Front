"use client"

const path = process.env.NEXT_PUBLIC_API_PATH
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

export default function ResetPassword() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");
    const [tokenChecked, setTokenChecked] = useState(false);
    const [message, setMessage] = useState("Verifying user, please wait.");


    const formik = useFormik({
        initialValues: { newPassword: "", repeatPassword: "" },
        validationSchema: Yup.object({
            newPassword: Yup.string()
                .required("Password is required")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                    "Password must contain at least one uppercase letter, one lowercase letter, and one number"
                ),
            repeatPassword: Yup.string()
                .required("Please confirm your password")
                .oneOf([Yup.ref("newPassword")], "Passwords must match"),
        }),
        onSubmit: async (values) => {
            
            const body = { token, newPassword: values.newPassword };


            try {
                const response = await fetch(`${path}/patients/reset-password`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                });

                const result = await response.json().catch(() => null);

                if (response.ok) {
                    
                    setTokenChecked(false);
                    setMessage("Password successfully reset.");
                } else {
                    const errorMsg = result?.message || "Failed to reset password. Please try again later.";
                    
                    setMessage(errorMsg);
                }
            } catch (error) {
                
                setMessage("An error occurred. Please try again.");
            }
        }
    });

    useEffect(() => {
        if (!token) {
           
            setMessage("No token provided in the URL.");
            return;
        }

        const verifyToken = async () => {
        

            try {
                const response = await fetch(`${path}/patients/validate-password-reset-token?token=${token}`, {
                    method: "GET"
                });


                const result = await response.json().catch(() => null);
     

                if (response.ok) {
                    
                    setTokenChecked(true);
                    setMessage("Security checked, you can change your password now.");
                } else {
                    const errorMsg = result?.message || "Password reset token failed, please try again.";
                    
                    setMessage(errorMsg);
                }
            } catch (error) {
                setMessage("Error verifying token.");
            }
        }

        verifyToken();
    }, [token]);

    return (
        <section className="w-full h-screen flex items-center justify-center">
            <div className="w-1/2 h-1/2 bg-[var(--turquoise)] rounded-3xl flex flex-col items-center justify-center">
                <Image src={'/images/logo.png'} alt="logo" width={50} height={50} />
                <p className="font-bold text-[var(--outer_space)]">{message}</p>

                {tokenChecked ? (
                    <div>
                        <form onSubmit={formik.handleSubmit} className="flex flex-col justify-center">
                            <div className="text-left mb-6">
                                <label htmlFor="newPassword" className="text-xs text-gray-700 block mb-1">NEW PASSWORD</label>
                                <input
                                    id="newPassword"
                                    name="newPassword"
                                    type="password"
                                    className="w-full px-4 py-1 bg-green-50 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-teal-400"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.newPassword}
                                />
                                {formik.touched.newPassword && formik.errors.newPassword && (
                                    <p className="text-red-500 text-xs mt-1">{formik.errors.newPassword}</p>
                                )}
                            </div>

                            <div className="text-left mb-6">
                                <label htmlFor="repeatPassword" className="text-xs text-gray-700 block mb-1">REPEAT PASSWORD</label>
                                <input
                                    id="repeatPassword"
                                    name="repeatPassword"
                                    type="password"
                                    className="w-full px-4 py-1 bg-green-50 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-teal-400"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.repeatPassword}
                                />
                                {formik.touched.repeatPassword && formik.errors.repeatPassword && (
                                    <p className="text-red-500 text-xs mt-1">{formik.errors.repeatPassword}</p>
                                )}
                            </div>

                            <button type="submit" className="bg-[var(--outer_space)] text-[var(--seasalt)] rounded-3xl py-1 px-4">
                                CHANGE PASSWORD
                            </button>
                        </form>
                    </div>
                ) : null}
            </div>
        </section>
    )
}
