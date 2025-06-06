"use client"

import Footer from "@/components/Footer"
import Header from "@/components/Header"

export default function PatientProfile() {
    return (
        <section className="w-full min-h-screen flex flex-col">
            <Header/>
            <div className="flex-1 flex w-full">
                {/** MAIN CONTENT HERE */}
                <div className="bg-[var(--turquoise)] w-80">
                    {/** LEFT SPACE */}

                </div>

                <div className="flex-1">
                    {/** RIGHT SPACE */}
                </div>

            </div>
            <Footer/>
        </section>
    )
}