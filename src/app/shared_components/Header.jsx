"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { patientLogOut } from "../patients/functions"

export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const hasToken = document.cookie.includes("token=")
    setLoggedIn(hasToken)
  }, [])

  const handleLogout = async () => {
    await patientLogOut()
    window.location.href = "/" // redirect after logout
  }

  return (
    <section className="fixed top-0 z-50 border-2 rounded-3xl box-border px-5 py-2 m-5 w-[calc(100%-2.5rem)] flex items-center">
      <div className="absolute inset-0 bg-[var(--mint_green)] opacity-50 -z-10 rounded-3xl" />
      <Link href="/">
        <Image src="/images/logo.png" alt="logo" width={100} height={50} />
      </Link>
      <div className="flex-end ml-auto space-x-4 pr-4">
        <a href="/#specialties">Medical specialties</a>
        <a href="/#doctors">Our doctors</a>
        <a href="/#appointment">Make an appointment</a>
        <a href="/#contact">Location</a>
        {loggedIn && <Link href="/patients">Profile</Link>}
        {loggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link href="./login_register">Login/Register</Link>
        )}
      </div>
    </section>
  )
}
