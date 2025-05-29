"use client"

import '@fortawesome/fontawesome-free/css/all.min.css'

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Contact from "@/components/landing/Contact"
import Doctors from "@/components/landing/Doctors"
import Hero from "@/components/landing/Hero"
import Specialties from "@/components/landing/Specialties"
import Appointment from '@/components/Appointment'

export default function Home() {

    return(
        <section className='w-full min-h-auto flex flex-col'>
            <Header/>
                <Hero/>
                <Specialties/>
                <Doctors/>
                <Appointment/>
                <Contact/>
            <Footer/>
        </section>
    )
}