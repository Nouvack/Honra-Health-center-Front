"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import '@/style/landing.css'

export default function Specialties() {
    const [hovered, setHovered] = useState("cosmetic")
    const [text, setText] = useState(content.cosmetic)
    const [title, setTitle] = useState("Cosmetic Surgery")

    useEffect(() => {
        switch (hovered) {
            case "cosmetic": 
                setText(content.cosmetic)
                setTitle("Cosmetic Surgery")
                break
            case "forensic": 
                setText(content.forensic)
                setTitle("Forensic Pathology")
                break
            case "neurology": 
                setText(content.neurology)
                setTitle("Neurology")
                break
            case "space": 
                setText(content.space)
                setTitle("Space Medicine")
                break
        }
    },[hovered])
    return (
        <section id="specialties" className="w-full h-max flex flex-col items-center pt-24">
            <p className="text-xl font-bold">Medical Specialties</p>
            <div className="flex flex-wrap relative w-full min-h-120 justify-center">
                {/** IMAGES SIDE */}
                <div className="grid grid-cols-8 grid-rows-8 gap-1 w-120 h-120 m-4">
                    <div className="relative overflow-hidden col-start-2 col-end-5 row-start-1 row-end-5 rounded-tr-[120px] rounded-bl-[120px]"
                            onMouseEnter={() => setHovered("cosmetic")}>
                        <Image src={"/images/cosmetic.jpeg"} alt="cosmetic" layout='fill' objectFit='cover'
                            className={`transition-transform duration-300 ease-in-out ${hovered === "cosmetic" ? "scale-105" : "scale-100"}`} />
                    </div>
                    <div className="relative overflow-hidden col-start-5 col-end-9 row-start-2 row-end-5 rounded-tl-[120px] rounded-br-[120px]"
                            onMouseEnter={() => setHovered("forensic")}>
                        <Image src={"/images/forensic.jpeg"} alt="forensic" layout='fill' objectFit='cover'
                            className={`transition-transform duration-300 ease-in-out ${hovered === "forensic" ? "scale-105" : "scale-100"}`}/>
                    </div>
                    <div className="relative overflow-hidden col-start-1 col-end-5 row-start-5 row-end-8 rounded-tl-[120px] rounded-br-[120px]"
                            onMouseEnter={() => setHovered("neurology")}>
                        <Image src={"/images/neurology.jpeg"} alt="neurology" layout='fill' objectFit='cover'
                            className={`transition-transform duration-300 ease-in-out ${hovered === "neurology" ? "scale-105" : "scale-100"}`}/>
                    </div>
                    <div className="relative overflow-hidden col-start-5 col-end-8 row-start-5 row-end-9 rounded-tr-[120px] rounded-bl-[120px]"
                            onMouseEnter={() => setHovered("space")}>
                        <Image src={"/images/space.jpeg"} alt="space" layout='fill' objectFit='cover'
                            className={`transition-transform duration-300 ease-in-out ${hovered === "space" ? "scale-105" : "scale-100"}`}/>
                    </div>
                </div>

                {/** TEXT SIDE */}
                <div className="w-120 h-full m-4 pt-8">
                    <p className="font-bold p-4">{title}</p>
                    <p>{text}</p>
                </div>
            </div>

        </section>
    )
}

const content = {
    cosmetic: "Cosmetic surgery, also known as aesthetic surgery, is a branch of plastic surgery that focuses on enhancing a person’s appearance through surgical and medical techniques. Unlike reconstructive surgery, which is typically performed to correct abnormalities caused by birth defects, trauma, or medical conditions, cosmetic surgery is elective and aimed at improving aesthetic appeal, symmetry, and proportion.",
    forensic: "Forensic pathology is a subfield of pathology that focuses on determining the cause of death by examining a corpse, typically during an autopsy. It is closely linked with legal and criminal investigations and plays a pivotal role in the justice system.\n\nForensic pathologists combine medical knowledge with investigative skills. They utilize toxicology, histology, radiology, and DNA analysis. They often work in high-stress environments and must handle traumatic cases with professional detachment.",
    neurology: "Neurology is the branch of medicine that deals with the anatomy, functions, and disorders of the nervous system, which includes the brain, spinal cord, and peripheral nerves. Neurologists diagnose and treat a wide range of conditions that affect neurological functioning, whether acute or chronic.\n\nNeurology is a rapidly evolving field, especially with growing research in brain mapping, neuroplasticity, and neurogenetics. Understanding the nervous system is crucial not only for treating diseases but also for enhancing knowledge of cognition, behavior, and consciousness.",
    space: "Space medicine is a specialized field of medicine that studies the effects of space travel on the human body and aims to ensure the health and performance of astronauts before, during, and after missions. It is a multidisciplinary field combining aerospace physiology, telemedicine, preventive medicine, and emergency care in extreme environments.\n\nResearch in space medicine has led to advancements in telehealth, wearable medical devices, and trauma care. The field contributes significantly to disaster medicine and rural healthcare, where access to specialists is limited."
  }