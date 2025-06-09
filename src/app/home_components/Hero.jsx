"use client"
import Image from "next/image"
import '@/style/landing.css'

export default function Hero() {
    return (
        <section id="hero" className="w-full h-screen relative">
            {/* Logo and Phone Container */}
            <div className="flex flex-col items-center absolute 
                     lg:top-[25%] lg:right-[15%] 
                     md:top-[18%] md:right-[10%]
                     sm:top-[20%] sm:right-[5%]
                     top-[22%] right-[5%]">
                <Image src={"/images/logo.png"} alt="logo" width={320} height={10}/>
                <div className="flex items-center pt-2">
                    <i className="fa-solid fa-phone-volume text-2xl" style={{ color: '#b51212' }}></i>
                    <p className="text-2xl pl-2">933 76 20 24</p>
                </div>
            </div>
            {/* Text Content */}
            <div className="absolute w-[80%] md:w-[50%] lg:w-[30%]
                     lg:top-[45%] lg:right-[5%]
                     md:top-[45%] md:right-[3%]
                     sm:top-[35%] sm:right-[2%]
                     top-[42%] right-[5%]
                     text-right">
                <p className="text-xl">We believe beauty is skin deep, but our specialties go light-years beyond! Whether you need a flawless facelift, a brain tune-up, a forensic mystery solved, or a check-up before your next spacewalk—we’ve got you covered.</p>
            </div>
        </section>
    )
}