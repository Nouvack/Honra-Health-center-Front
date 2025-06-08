"use client";

import Image from "next/image";

export default function DoctorCard({ doctor, handleSelect }) {
  return (
    <button className="w-60 h-60 rounded-3xl border border-[var(--turquoise)] flex flex-col items-center font-sm text-center hover:bg-[var(--mint_green)] transition"
        onClick={ () => handleSelect(doctor)}>
      <div className="m-8 w-20 h-20 relative rounded-3xl overflow-hidden">
        <Image src={doctor.img || "/images/default_doctor.jpg"} alt={"profile"} layout="fill" objectFit="cover" />
      </div>
      

      <p className="font-bold"> {doctor.firstname} {doctor.lastname} </p>
      <p className="text-xs">{doctor.email}</p>
      <p className="font-bold text-[var(--turquoise)] text-xs">{doctor.specialty}</p>

    </button>
  );
}
