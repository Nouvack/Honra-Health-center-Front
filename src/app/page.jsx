"use client"

import "@/lib/fontawesome";

import Footer from "@/app/shared_components/Footer"
import Header from "@/app/shared_components/Header"
import Contact from "@/app/home_components/Contact"
import Doctors from "@/app/home_components/Doctors"
import Hero from "@/app/home_components/Hero"
import Specialties from "@/app/home_components/Specialties"
import Appointment from '@/app/shared_components/Appointment'
import { useEffect, useState } from 'react'
import { getDoctors } from '@/app/home_components/functions'

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