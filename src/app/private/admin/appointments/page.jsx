"use client"

import { filterAppointments } from "../../shared_components/functions"
import AppointmentCard from "../../shared_components/AppointmentCard"
import PrivateHeader from "../../shared_components/PrivateHeader"
import { getAllAppointents, getDoctors, makeAppByAdmin } from "../functions"
import { useState, useEffect } from "react"
import { useFormik } from "formik"
import * as Yup from "yup";
import 'react-datepicker/dist/react-datepicker.css';
import { filterData, getAvailableHours, getTreatments } from "@/app/shared_components/functions"

export default function Appointments() {
    const [error, setError] = useState()
    const [appointments, setAppointments] = useState([])
    const [search, setSearch] = useState("")
    const [filteredAppointments, setFilteredAppointments] = useState([])
    const [filter, setFilter] = useState()
    const [doctors, setDoctors] = useState([])

    useEffect(() => {
        const getData = async () => {
            const response = await getAllAppointents()
            if (!response) {
                setError("Could not fetch appointments data.")
            } else {
                setAppointments(response)
                setFilter("All")
            }
            const docs = await getDoctors()
            if (!docs) { setError("Could not fetch doctors data.")}
            else {setDoctors(docs)}
        }
        getData()
    }, [])

    useEffect(() => {
        const timeout = setTimeout( async() => {
            const response = await filterAppointments(appointments, search, filter)
            response ? setFilteredAppointments(response) : setError("Could not search appointments. Try again later.")
            
        }, 300)
        return () => clearTimeout(timeout)
    }, [search, filter])

    const formik = useFormik({
        initialValues: {patient: "", specialty: "", doctor: "", treatment: "", date: "", hour: ""},
        validationSchema: Yup.object({
            patient: Yup.string().required("Patient required."),
            doctor: Yup.string().required("Select a doctor."),
            treatment: Yup.string().required("Select a treatment."),
            date: Yup.date().required("Select a date.").min(new Date(new Date().setHours(0, 0, 0, 0)), "Date cannot be in the past."),
            hour: Yup.string().required("Select an hour.")
        }), onSubmit: async (values) => {
            const response = await makeAppByAdmin(values)
            response? setMessage("Appointment created.") : setMessage("Something went wrong.")
        }
    })

    useEffect(() => {
        if (doctors && doctors.length > 0) {
            updateFilter(formik.values.specialty)
        }
    }, [doctors])
    
        useEffect(() => {
            const getData = async () => {
                console.log(formik.values.specialty)
                const result = await getTreatments(formik.values.specialty)
                console.log(result)
                setFilteredTreatments(result || [])
            }
            getData()
        }, [formik.values.specialty])
        
        const updateFilter = async (filter, data = doctors) => {
            const result = await filterData(data, filter)
            setFilteredDoctors(result)
        } 
    
        useEffect(() => {
            const getHours = async() => {
                if (!formik.values.doctor || !formik.values.date) return;
                const response = await getAvailableHours(formik.values.doctor, formik.values.date)
                if (!response) {
                    setError("no data")
                } else {
                    setAvailableHours(response)
                }
            }
            getHours()
        }, [formik.values.doctor, formik.values.date])
    
    return (
        <section className="w-full flex flex-col items-center">
            <PrivateHeader/>
            <div className="w-full flex flex-col items-center p-20">
                <p className="font-bold">APPOINTMENTS</p>
                <hr className="w-5/6 border-[var(--turquoise)] mb-10" />
                <div className="w-120">
                    <p>{error}</p>
                    <p className="text-[var(--turquoise)]">SEARCH:</p>
                    <input type="text" onChange={(e) => setSearch(e.target.value)}
                        className="bg-[var(--mint_green)] rounded-3xl py-1 px-3 w-full" placeholder="PATIENT DNI / DOCTOR EMPLOYEE ID"/>
                    <p className="text-[var(--turquoise)]">FILTER:</p>
                    <div className="flex justify-between">
                        {["All", "Today", "Upcoming", "Past"].map((f) => 
                            <button key={f} onClick={() => setFilter(f)}
                                className={`py-1 px-6 rounded-3xl hover:bg-[var(--turquoise)] transition ${filter === f ? "bg-[var(--turquoise)]" : "bg-[var(--mint_green)]"}`}   
                            >{f}</button>
                        )}
                    </div>
                </div>
               
                {filteredAppointments?.length > 0 ? 
                    <div className="w-full m-10 gap-6 flex flex-col overflow-y-scroll p-5">
                        {filteredAppointments?.map((aptm) => <AppointmentCard appointment={aptm} key={aptm._id} />)}
                    </div> : <p className="m-20">You do not have any appointments.</p>
                }
                
            </div>

        </section>
    )
}