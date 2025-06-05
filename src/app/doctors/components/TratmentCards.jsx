"use client"

import '../components/style.css' 

export default function TreatmentCards(treatment) {
    const data = treatment.treatment
    return (
        <div className="w-50 h-70 bg-[var(--mint_green)] rounded-3xl p-4 overflow-auto scroll-hide shadow-md ">
            <p className='font-bold text-[var(--outer_space)]'>{data.name}</p>
            <p className='text-red-600'>$ {data.price}</p>
            <p>{data.description}</p>
        </div>
    )
}