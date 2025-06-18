"use client"

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye, faUserPen } from "@fortawesome/free-solid-svg-icons";

export default function PatientRows({ patient, selected, setSelected, handleSelectPatient }) {
  const visibleName = patient.name
  const invisibleName = `${patient.name.charAt(0)}.`
  const visibleEmail = patient.email
  const [emailpart, domain] = patient.email.split("@")
  const invisibleEmail = `${emailpart.charAt(0)}****@${domain}`
  const visibleDni = patient.DNI
  const invisibleDni = `*****${patient.DNI.slice(-4)}`

  const [icon, setIcon] = useState(<FontAwesomeIcon icon={faEye}/>)
  const [name, setName] = useState(invisibleName)
  const [email, setEmail] = useState(invisibleEmail)
  const [dni, setDni] = useState(invisibleDni)

  const toggleVisibility = () => {
    setIcon(<FontAwesomeIcon icon={faEyeSlash}/>)
    setName(visibleName)
    setEmail(visibleEmail)
    setDni(visibleDni)
  }

  const closeVisibility = () => {
    setIcon(<FontAwesomeIcon icon={faEye}/>)
    setName(invisibleName)
    setEmail(invisibleEmail)
    setDni(invisibleDni)
  }

  const handleSelect = (patient) =>  setSelected(patient) 

  return (
    <tr onClick={() => handleSelect(patient)}
      className={`cursor-pointer hover:bg-[var(--mint_green)] ${
        selected?._id === patient._id ? "bg-[var(--mint_green)]" : "bg-[var(--transparent)]" }`} >

      <td className="flex gap-2 justify-center w-15">
        <button
          onMouseDown={toggleVisibility}
          onMouseUp={closeVisibility}
          onMouseLeave={closeVisibility}
          onTouchStart={toggleVisibility}
          onTouchEnd={closeVisibility}
          >{icon}</button>
        <button onClick={() => handleSelectPatient(patient)}>
          <FontAwesomeIcon icon={faUserPen} />
        </button>
      </td>
      <td className="px-2">{name}</td>
      <td className="px-2">{patient.surname}</td>
      <td className="px-2">{new Date(patient.birthDate).toLocaleDateString()}</td>
      <td className="px-2">{patient.gender}</td>
      <td className="px-2">{email}</td>
      <td className="px-2">{dni}</td>
      <td className="px-2">{patient.phoneNumber}</td>
      <td className="px-2">{new Date(patient.createdAt).toLocaleDateString()}</td>
      <td className="px-2">{String(patient.verified)}</td>
      <td className="px-2">{patient.failedLoginAttempts}</td>
    </tr>
  )
}