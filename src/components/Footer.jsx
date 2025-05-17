"use client"

import Link from "next/link";

export default function Footer() {
    return (
        <section className="w-full h-10 bg-[var(--outer_space)] flex flex-wrap">
            <div className="flex-end ml-auto space-x-4 pr-4 mt-auto">
                <Link href={"/"} className="text-[var(--seasalt)]">Legal notice</Link>
                <Link href={"/"} className="text-[var(--seasalt)]">Data protection</Link>
                <Link href={"/"} className="text-[var(--seasalt)]">Cookies</Link>
                <Link href={"/"} className="text-[var(--seasalt)]">FAQ</Link>
            </div>
        </section>
    )
}