"use client"

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { useEffect, useState } from "react"
import { getDoctor, getTreatments } from "../components/functions"
import Image from "next/image"
import { useParams } from 'next/navigation';
import TreatmentCards from "../components/TratmentCards"
import Calendar from "@/components/Calendar"
import Appointment from "@/components/Appointment"

export default function Doctors() {
    const params = useParams();
    const employeeId = params.employeeId;

    const [error, setError] = useState()
    const [doctor, setDoctor] = useState({})
    const [bgUrl, setBgUrl] = useState("")
    const [treatments, setTreatments] = useState([])

    useEffect(() => {
        const getDoctorData = async () => {
            const response = await getDoctor(employeeId)
            if (!response) {
                setError("Oops! Data not found :(")
            } else {
                setDoctor(response)
                setBgUrl(backgroundImages[response.specialty] || null)
                getTreatmentData(response.specialty)
            }
        }
        const getTreatmentData = async (specialty) => {
            const response = await getTreatments(specialty)
            if (!response) {
                setError("Oops! Treatments data not found :(")
            } else {
                setTreatments(response)
            }
        }
        getDoctorData()
    },[employeeId])

    return (
        <section>
            <Header/>
            {doctor? (
            <section>

                {/** TOP SECTION */}
                <div className="w-full flex items-center justify-between px-10 h-65 bg-cover text-[var(--seasalt)]"
                    style={{ backgroundImage: `url(${bgUrl})` }}>
                    <div className="flex items-center space-x-8 relative">
                        <div className="relative rounded-full w-50 h-50 overflow-hidden m-10 absolute top-20">
                            <Image src={doctor.img? doctor.img : "/images/default_doctor.jpg"} alt="profile" objectFit="cover" layout="fill"/>
                        </div>
                        <div className="mt-35">
                            <p className="text-xl">Dr. {doctor.firstname} {doctor.lastname}</p>
                            <p className="font-bold">{doctor.specialty} </p>
                            <p className="text-sm">📧 {doctor.email}  <br/>☎️ {doctor.phone} </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-8 mr-10 mt-15">
                        <div className="w-px h-40 bg-[var(--turquoise)]"></div>
                        <div className="text-right ">
                            <p>WORKDAYS</p>
                            {doctor.workdays?.map((day) => (<p key={day}>{day} <br/> </p>))}
                            {doctor.shift?.map((shift) => (<p key={shift.time_range}>{shift.time_range}</p>))}
                        </div>
                    </div>
                </div>

                {/** BOTTOM SECTION */}
                <section className="flex flex-wrap w-full p-20">
                    <div className="w-2/3">
                        <p className="font-bold">PROFILE DESCRIPTION:</p>
                        <p>{doctor.description} </p>
                        <p className="font-bold">AVAILABLE TREATMENTS:</p>
                        <div className="flex flex-wrap gap-2">
                            {treatments.map((treatment) => <TreatmentCards key={treatment.name} treatment={treatment} /> )}
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                        <Calendar doctor={doctor} />
                        <Appointment doctors={[doctor]}/>
                    </div>
                </section>
                
            </section>
            ) : null}
            
            <Footer/>
        </section>
    )
}

const backgroundImages = {
    'Neurology': '/images/neurology.jpeg',
    'Cosmetic Surgery': '/images/cosmetic.jpeg',
    'Forensic Pathology': '/images/forensic.jpeg',
    'Space Medicine': '/images/space.jpeg'
}