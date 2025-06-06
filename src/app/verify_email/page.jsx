"use client"

const path = process.env.API_PATH
import Image from "next/image"
import { useParams } from "next/navigation"
import { useState } from "react"

export default function VerifyEmail() {
    const params = useParams()
    const token = params.token
    const [message, setMessage] = useState("Verifying user, please wait.")

    useEffect(() => {
        const sendToken = async () => {
            try {
                const response = await fetch(`${path}/patients/verify-email?token=${token}`, {
                    method: "GET"
                })
                response.ok? 
                    setMessage("Email verified successfully. You can now log in.") 
                    : setMessage("Email was not verifyed successfully. Please try again.")
            } catch (err) {
                return setMessage("Something went wrong. Please try again later.")
            }
        }
        sendToken()
    }, [])

    return (
        <section className="w-full h-screen flex items-center justify-center">
            <div className="w-1/2 h-1/2 bg-[var(--turquoise)] rounded-3xl flex flex-col items-center justify-center">
                <Image src={'/images/logo.png'} alt="logo" width={50} height={50}/>
                <p className="font-bold text-[var(--outer_space)]">{message}</p>
            </div>            
        </section>
    )
}