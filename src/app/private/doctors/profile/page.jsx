"use client"

import { useParams } from "next/navigation"

export default function Profile() {
    const params = useParams()
    const doctorId = params.id

    return (
        <section>{doctorId}</section>
    )
}