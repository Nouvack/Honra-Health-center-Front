"use client"

import '@fortawesome/fontawesome-free/css/all.min.css'

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Contact from "@/components/landing/Contact"
import Doctors from "@/components/landing/Doctors"
import Hero from "@/components/landing/Hero"
import Specialties from "@/components/landing/Specialties"
import Appointment from '@/components/Appointment'
import { useEffect, useState } from 'react'
import { getDoctors } from '@/components/functions'

export default function Home() {
    const [doctors, setDoctors] = useState([])

    useEffect(() => {
        getDoctors().then(setDoctors)
    },[]) 

    return(
        <section className='w-full min-h-auto flex flex-col'>
            <Header/>
                <Hero/>
                <Specialties/>
                <Doctors doctors={doctors} />
                <Appointment doctors={doctors} />
                <Contact/>
            <Footer/>
        </section>
    )
}