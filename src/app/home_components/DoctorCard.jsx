"use client"

import Image from "next/image"
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function Card({doctor}) {
    return (
        <div className="w-55 overflow-hidden flex items-center">
            {/** IMAGE SIDE */}
            <div className="relative w-15 h-15 rounded-full">
                <Image src={doctor.img ? doctor.img : "/images/default_doctor.jpg"}
                    fill style={{ objectFit: "cover" }} alt="Doctor" className="rounded-full"
                />
            </div>
            {/** INFO SIDE */}
            <div className="text-[var(--seasalt)] pl-4 relative flex flex-col">
                <p className="text-l">{doctor.firstname} {doctor.lastname} </p>
                <p className="text-sm font-bold">{doctor.specialty}</p>
                <Link href={`/doctors/${doctor.employeeId}`}>
                    <button className="px-3 py-1 rounded-3xl border-1 hover:bg-[var(--turquoise)] transition-colors transition">
                        Visit page <FontAwesomeIcon icon={faArrowUp} className="rotate-45" />
                    </button>
                </Link>
                
            </div>
        </div>
    )
}