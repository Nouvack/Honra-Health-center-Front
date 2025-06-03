"use client"

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { useEffect, useState } from "react"
import { getDoctor } from "../components/functions"
import Image from "next/image"
import { useParams } from 'next/navigation';

export default function Doctors() {
    const params = useParams();
    const employeeId = params.employeeId;

    const [error, setError] = useState()
    const [doctor, setDoctor] = useState({})
    const [bgUrl, setBgUrl] = useState("")

    useEffect(() => {
        const getData = async () => {
            const response = await getDoctor(employeeId)
            if (!response) {
                setError("Oops! Data not found :(")
            } else {
                setDoctor(response)
                setBgUrl(backgroundImages[response.specialty] || null)
            }
        }
        getData()
    },[employeeId])

    return (
        <section>
            <Header/>
            {doctor? (
            <section>
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

                    <div className="flex items-center space-x-8 mr-10">
                        <div className="w-px h-40 bg-[var(--turquoise)] mt-15"></div>
                        <div className="text-right ">
                            <p>SCHEDULE</p>
                            
                        </div>
                    </div>
                </div>
                <div className="w-full h-100">
                    <p>PROFILE DESCRIPTION:</p>
                    <p>{doctor.description} </p>
                </div>
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