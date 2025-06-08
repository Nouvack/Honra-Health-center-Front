"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Header() {
    const router = useRouter()

    return (
        <section className="w-full p-10 flex justify-between">
            <button onClick={() => router.back()}
                className="font-bold py-1 px-6 border-2 border-[var(--outer_space)] rounded-3xl hover:bg-[var(--mint_green)] transition"
                >Go Back</button>
            <Image src={"/images/logo.png"} alt="logo" width={120} height={50}/>
        </section>
    )
}