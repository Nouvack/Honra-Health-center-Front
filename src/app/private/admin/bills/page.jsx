"use client";

import { useEffect, useState } from "react";
import Header from "../../shared_components/PrivateHeader";
import { getInvoices } from "../functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

export default function BillsPage() {
    const [search, setSearch] = useState("");
    const [bills, setBills] = useState([]);
    const [error, setError] = useState("")

    useEffect(() => {
      const getData = async() => {
        const response = await getInvoices()
        console.log(response)
        response? setBills(response) : setError("Error loading Invoices.")
      } 
      getData()
    }, [])

    return (
      <div className="w-full min-h-screen flex flex-col items-center">
        <Header/>
        <p className="font-bold">INVOICES</p>
        <hr className="w-5/6 border-[var(--turquoise)] mb-10" />

        <table className="divide-y divide-[var(--turquoise)]">
            <thead className="bg-[var(--mint_green)] text-gray-700">
                <tr>
                <th className="p-2 text-center">Invoice ID</th>
                <th className="p-2 text-center">Date</th>
                <th className="p-2 text-center">Patient DNI</th>
                <th className="p-2 text-center">Patient name</th>
                <th className="p-2 text-center">Description</th>
                <th className="p-2 text-center">Amount</th>
                <th className="p-2 text-center">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-[var(--mint_green)]">
              {bills?.map(b => <Rows bill={b}  key={b._id}/> )}
            </tbody>
        </table>
      </div>
    );
}

function Rows({bill}) {
  
  const visibleName = bill.patientId.name + " " + bill.patientId.surname
  const invisibleName = `${bill.patientId.name.charAt(0)}. ${bill.patientId.surname}`
  const visibleDni = bill.patientId.DNI
  const invisibleDni = `*****${bill.patientId.DNI.slice(-4)}`

  const [icon, setIcon] = useState(<FontAwesomeIcon icon={faEye}/>)
  const [name, setName] = useState(invisibleName)
  const [dni, setDni] = useState(invisibleDni)

  const toggleVisibility = () => {
    setIcon(<FontAwesomeIcon icon={faEyeSlash}/>)
    setName(visibleName)
    setDni(visibleDni)
  }

  const closeVisibility = () => {
    setIcon(<FontAwesomeIcon icon={faEye}/>)
    setName(invisibleName)
    setDni(invisibleDni)
  }

  return (
    <tr>
      <td className="px-2">{bill._id}</td>
      <td className="px-2">{new Date(bill.createdAt).toLocaleDateString()}</td>
      <td className="px-2">{dni}</td>
      <td className="px-2">{name}</td>
      <td className="px-2">{bill.treatmentId.name}</td>
      <td className="px-2">$ {bill.amount}</td>
      <td className="flex gap-2 justify-center">
        <button><FontAwesomeIcon icon={faFileArrowDown}/></button>
        <button 
          onMouseDown={toggleVisibility}
          onMouseUp={closeVisibility}
          onMouseLeave={closeVisibility}
          onTouchStart={toggleVisibility}
          onTouchEnd={closeVisibility}
          >{icon}</button>
      </td>
    </tr>
  )
}