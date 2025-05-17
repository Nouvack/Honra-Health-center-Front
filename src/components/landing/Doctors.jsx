"use client"

import '@/style/landing.css'
import { useState } from "react"

export default function Doctors() {
    const [filter, setFilter] = useState("all")

    return (
        <section id="doctors" className="w-full h-max flex flex-col items-center">
            <p className="text-xl font-bold">Our Doctors</p>
            {/** FILTERS */}
            <div className='flex flex-wrap gap-2 m-4'>
                <p>Filter: </p>
                <button type="filter" onClick={() => setFilter("all")}>All</button>
                <button type="filter" onClick={() => setFilter("cosmetic")}>Cosmetic Surgery</button>
                <button type="filter" onClick={() => setFilter("forensic")}>Forensic Pathology</button>
                <button type="filter" onClick={() => setFilter("neurology")}>Neurology</button>
                <button type="filter" onClick={() => setFilter("space")}>Space Medicine</button>
            </div>
            <div className="flex flex-wrap relative w-full h-150 justify-center"></div>
        </section>
    )
}