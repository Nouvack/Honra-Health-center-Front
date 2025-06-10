"use client"

import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
const path = process.env.NEXT_PUBLIC_API_PATH

export default function VerifyEmailContent() {
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const [message, setMessage] = useState("Verifying user, please wait.")

    useEffect(() => {
        if (!token) return setMessage("No token provided in the URL.")

        const sendToken = async () => {
            try {
                const response = await fetch(`${path}/patients/verify-email?token=${token}`)
                setMessage(response.ok
                    ? "Email verified successfully. You can now log in."
                    : "Email was not verified successfully. Please try again.")
            } catch (err) {
                setMessage("Something went wrong. Please try again later.")
            }
        }

        sendToken()
    }, [token])

    return (
        <section className="w-full h-screen flex items-center justify-center">
            <div className="w-1/2 h-1/2 bg-[var(--turquoise)] rounded-3xl flex flex-col items-center justify-center">
                <Image src={'/images/logo.png'} alt="logo" width={50} height={50}/>
                <p className="font-bold text-[var(--outer_space)]">{message}</p>
            </div>            
        </section>
    )
}
