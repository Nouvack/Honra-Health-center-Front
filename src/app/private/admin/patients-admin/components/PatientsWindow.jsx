"use client"

import { useFormik } from "formik"
import { useState } from "react"
import { getInitialValues, validationSchema, TextInput } from "./Formik_helper"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { deletePatient, registerPatient, updatePatientById } from "./functions";

export default function PatientsWindow({patient, isNew}) {

    const [msg, setMsg] = useState("")

    const handleDelete = async () => {
        const response = await deletePatient(patient._id)
        response? window.location.reload() : setMsg("Something went wrong.")
    } 

    const formik = useFormik({
        initialValues: getInitialValues(patient), validationSchema, 
        onSubmit: async (values) => {
            let response
            if (isNew === true) {
                response = await registerPatient(values)
            } else {
                response = await updatePatientById(patient._id, values)
            }
            response? setMsg(response.message) : setMsg("Something went wrong.")
        }
    })

    return (
        <form onSubmit={formik.handleSubmit} className="w-1/2 h-1/2 z-30 bg-[var(--outer_space)] shadow-[var(--mint_green)] shadow-md absolute flex flex-col items-center p-10 rounded-3xl text-[var(--seasalt)] overflow-y-auto"> 
            <button onClick={() => window.location.reload()} className="w-10 h-10"><FontAwesomeIcon icon={faCircleXmark} className="text-2xl absolute right-10 top-8" /></button>
            
            {isNew === true? <p className="text-[var(--turquoise)]">REGISTER A PATIENT</p> : <p className="text-[var(--turquoise)]">UPDATE A PATIENT</p>}
            <hr className="w-5/6 border-[var(--turquoise)] mb-10" />
            <div className="grid grid-cols-2 gap-4">
                {isNew === true && <>
                    <TextInput label="NAME" name="name" formik={formik} />
                    <TextInput label="SURNAME" name="surname" formik={formik} />
                    <TextInput label="DNI" name="DNI" formik={formik} autoUppercase />
                    <TextInput label="BIRTH DATE" name="birthDate" type="date" formik={formik} />
                    <div>
                        <label className="text-sm text-[var(--turquoise)]">GENDER</label>
                        <div className="flex gap-4 mt-1">
                        {["Man", "Woman", "Other"].map((option) => (
                            <label key={option} className="flex items-center gap-2 text-sm">
                            <input
                                type="radio"
                                name="gender"
                                value={option}
                                onChange={formik.handleChange}
                                checked={formik.values.gender === option}
                            />
                            {option}
                            </label>
                        ))}
                        </div>
                        {formik.touched.gender && formik.errors.gender && (
                        <p className="text-red-500 text-xs mt-1">{formik.errors.gender}</p>
                        )}
                    </div>
                </>}  

                <TextInput label="PHONE NUMBER" name="phoneNumber" formik={formik} />
                <TextInput label="EMAIL" name="email" type="email" formik={formik} />
                <TextInput label="PASSWORD" name="password" type="password" formik={formik} />
            </div>
            
            <p className="font-bold pt-5">{msg}</p>
            <div className="col-span-full text-[var(--outer_space)] m-5 gap-2 flex flex-col">
                <button type="submit" className={`bg-[var(--seasalt)] px-4 py-2 rounded rounded-3xl `} >
                        <p>SUBMIT</p>
                </button>
                {isNew === false && 
                    <button className="text-[var(--seasalt)]" onClick={() => handleDelete()}>DELETE PATIENT</button>}
            </div>
        </form>
    )
}

