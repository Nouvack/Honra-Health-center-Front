"use client"

import Image from "next/image"
import Link from 'next/link'

export default function Card({doctor}) {
    console.log(doctor)
    return (
        <div className="w-90 h-50 bg-[var(--seasalt)] overflow-hidden grid grid-cols-2 rounded-3xl">
            {/** IMAGE SIDE */}
            <div className="relative left-[-10%] w-full h-full transform -skew-x-12 origin-left z-10 overflow-hidden flex">
                <div className="relative left-[10%] w-full h-full transform skew-x-12 origin-left">
                    <Image src={doctor.img ? doctor.img : "/images/default_doctor.jpg"}
                        layout="fill" objectFit="cover" alt="Doctor"
                    />
                </div>
            </div>
            {/** INFO SIDE */}
            <div className="text-[var(--outer_space)] p-4">
                <p className="text-l">{doctor.firstname} {doctor.lastname} </p>
                <p className="text-sm font-bold">{doctor.specialty}</p>
                {/** <Link href={`/doctors/${doctor}`}>Visit page</Link> */}
            </div>
        </div>
    )
}