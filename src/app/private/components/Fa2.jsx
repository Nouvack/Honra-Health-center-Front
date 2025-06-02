"use client"

import { useRef, useState } from "react";
import { verify2Fa } from "../functions";
import { useRouter }  from "next/navigation"

export default function Fa2({ data, role }) {
    const router = useRouter(); 
    const [code, setCode] = useState(new Array(6).fill(''));
    const inputsRef = useRef([])
    const [error, setError] = useState()

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
        const response = await verify2Fa(data.token, fullCode)
        if (!response) {
            setError("Invalid code.")
            setCode(new Array(6).fill(''))
            inputsRef.current[0].focus()
        } else {
            if (role === "doctor") {
                router.push(`/private/doctors`)
            } else if (role === "admin") {
                router.push(`/private/admin`)
            }
        }
    }

    return (
        <section className="w-full max-w-sm px-6 text-center flex flex-col">
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
             
        </section>
    )
}