"use client"
import Link from "next/link";
import Image from "next/image"

export default function Header() {
    return (
        <section className="fixed top-0 z-50 border-2 rounded-3xl box-border px-5 py-2 m-5 w-[calc(100%-2.5rem)] flex items-center">
            <div className="absolute inset-0 bg-[var(--mint_green)] opacity-50 -z-10 rounded-3xl"
                aria-hidden="true"/>
            <Link href={"/"}>
                <Image src={"/images/logo.png"} alt="logo" width={100} height={50}>
                </Image></Link>
            <div className="flex-end ml-auto space-x-4 pr-4">
                <a href="/#specialties">Medical speecialties</a>
                <a href="/#doctors">Our doctors</a>
                <a href="/#appointment">Make an appointment</a>
                <a href="/#contact">Location</a>
                <Link href="/login_register">Login/Register</Link>
            </div>
        </section>
    )
}