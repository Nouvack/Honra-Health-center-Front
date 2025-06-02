"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function DoctorsProfile({ data, role }) {
    const [isOwner, setIsOwner] = useState(false)

    useEffect(() => {
        role === "owner" ? setIsOwner(true) : setIsOwner(false)
    }, [data, role])

    return (
        <section>
            <div className="w-50 h-50 rounded-full">
                <Image src={data.img ? data.img : "/images/default_doctor.jpg"} layout="fill" objectFit="cover" alt="Doctor" />
            </div>
            <p>{data.firstname} {data.lastname} </p>

        </section>
    )
}