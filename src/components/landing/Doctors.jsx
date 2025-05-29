"use client"

import '@/style/landing.css'
import { useEffect, useState } from "react"
import { getDoctors } from '../functions'
import Card from './DoctorCard'

export default function Doctors() {
    const [filter, setFilter] = useState("all")
    const [doctors, setDoctors] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchData = async() => {
            const response = await getDoctors()
            if (!response || response.lenght === 0) {
                setError("Doctors data not found :(")
            } else {
                setDoctors(response)
            }
        }
        fetchData()
    }, [])

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
            <div className="flex flex-wrap relative w-full h-150 justify-center">
                {error ? <p>{error}</p> : doctors.map(doctor => <Card doctor={doctor} key={doctor}/>)}
            </div>
        </section>
    )
}