"use client"

import Image from "next/image"
import Link from 'next/link'

export default function Card({doctor}) {
    return (
        <div className="w-90 h-50 bg-[var(--outer_space)] overflow-hidden grid grid-cols-2 rounded-3xl border-2 border-[var(--mint_green)]">
            {/** IMAGE SIDE */}
            <div className="relative left-[-10%] w-full h-full transform -skew-x-12 origin-left z-10 overflow-hidden flex">
                <div className="relative left-[10%] w-full h-full transform skew-x-12 origin-left">
                    <Image src={doctor.img ? doctor.img : "/images/default_doctor.jpg"}
                        layout="fill" objectFit="cover" alt="Doctor"
                    />
                </div>
            </div>
            {/** INFO SIDE */}
            <div className="text-[var(--seasalt)] p-4 relative flex flex-col">
                <p className="text-l">{doctor.firstname} {doctor.lastname} </p>
                <p className="text-sm font-bold">{doctor.specialty}</p>
                <Link href={`/doctors/${doctor.employeeId}`} className="absolute bottom-4 right-4">
                    <button className="px-4 py-2 rounded-3xl border-1 hover:bg-[var(--turquoise)] transition-colors duration-200">
                        Visit page
                    </button>
                </Link>
                
            </div>
        </div>
    )
}