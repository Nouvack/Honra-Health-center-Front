"use client"

import '@/style/landing.css'
import { useEffect, useState } from "react"
import { filterData } from '../shared_components/functions'
import Card from './DoctorCard'

export default function Doctors({doctors}) {
    const [filteredDoctors, setFilteredDoctors] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        if (doctors && doctors.length > 0) {
            setFilteredDoctors(doctors)
        }
    }, [doctors])

    const updateFilter = async (filter, data = doctors) => {
        if (doctors.length === 0 || !doctors) {
            setError("Could not load doctors data :(")
        }
        const result = await filterData(data, filter)
        setFilteredDoctors(result)
    } 

    return (
        <section id="doctors" className="w-full h-170 flex flex-col items-center justify-center">
            <p className="text-xl font-bold">Our Doctors</p>
            {/** FILTERS */}
            <div className='flex flex-wrap gap-2 m-4'>
                <p>Filter: </p>
                <button type="filter" onClick={() => updateFilter("All")}>All</button>
                <button type="filter" onClick={() => updateFilter("Cosmetic Surgery")}>Cosmetic Surgery</button>
                <button type="filter" onClick={() => updateFilter("Forensic Pathology")}>Forensic Pathology</button>
                <button type="filter" onClick={() => updateFilter("Neurology")}>Neurology</button>
                <button type="filter" onClick={() => updateFilter("Space Medicine")}>Space Medicine</button>
            </div>
            {/** DOCTOR CARDS */}
            <div className="w-full flex flex-wrap gap-x-15 gap-y-4 py-2 justify-center overflow-y-scroll" >
                {error ? (
                    <p>{error}</p> ) : (
                    filteredDoctors?.map((doctor) => ( <Card doctor={doctor} key={doctor._id} /> ))
                )}
            </div>
        </section>
    )
}