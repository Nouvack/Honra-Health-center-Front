"use client";
import { useEffect, useState } from "react";
import { getAllPatients } from "../functions";
import Header from "../../shared_components/PrivateHeader";
import PatientRows from "./components/PatientRows";
import PatientsWindow from "./components/PatientsWindow";

export default function PatientManager() {
  const [patients, setPatients] = useState([]);
  const [selected, setSelected] = useState(null);
  const [patientWindow, setPatientWindow] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllPatients();
      setPatients(data);
    };
    fetchData();
  }, []);

  const handleRegister = () => {
      setSelected(false)
      setPatientWindow(true)
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <Header />
      <div className="w-full flex flex-col items-center">
        <p className="font-bold">PATIENTS</p>
        <hr className="w-5/6 border-[var(--turquoise)] mb-10" />
        
        {patientWindow === true && <PatientsWindow patient={selected} isNew={!selected} setPatientWindow={setPatientWindow}/>}
      
        <table className="divide-y divide-[var(--turquoise)] w-5/6">
          <thead className="bg-[var(--mint_green)]">
            <tr>
              <th></th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Surname</th>
              <th className="px-4 py-2 text-left">BirthDate</th>
              <th className="px-4 py-2 text-left">Gender</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">DNI</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Registered</th>
              <th className="px-4 py-2 text-left">Verified</th>
              <th className="px-4 py-2 text-left">Fail LogIn attempts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--mint_green)]">
            <tr>
              <td colSpan="11">
              <button onClick={() => handleRegister()}
                className="font-bold hover:bg-[var(--mint_green)] w-full">+</button>
              </td>
            </tr>
            {patients?.map((p) => ( <PatientRows patient={p} selected={selected} setSelected={setSelected} setPatientWindow={setPatientWindow} key={p._id} /> ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}