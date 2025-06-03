"use client" 

import Image from "next/image"

export default function DoctorProfile({doctor}) {
    return (
        <section className="w-full h-max flex flex-col items-center">
            {doctor && (<div>
                <div className="relative rounded-full w-50 h-50 overflow-hidden">
                    <Image src={doctor.img? doctor.img : "/images/default_doctor.jpg"} alt="profile" objectFit="cover" layout="fill"/>
                </div>
                <p>hello {doctor.email} </p>
            </div>)}
        </section>
    )
}