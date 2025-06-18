"use client";

import { getDoctInitialVal, doctorValidationSchema } from "@/app/private/shared_components/Doctor_validation_schema"
import { useState, useEffect } from "react";
import DoctorCard from "@/app/private/admin/doctors-admin/components/DoctorCard";
import Header from "../../shared_components/PrivateHeader";
import { useFormik } from 'formik';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image"
import { deleteDoctor, getDoctors, registerDoctor } from "../functions";
import { updateDoctor } from "../../shared_components/functions";

export default function DoctorManagement() {
    const [doctors, setDoctors] = useState([]);
    const [error, setError] = useState("")
    const [openWindow, setOpenWindow] = useState(false)
    const [selectedDoctor, setSelectedDoctor] = useState({})

    const handleSelect = async (doctor) => {
      setSelectedDoctor({doctor, isNew: false})
      setOpenWindow(true)
    }

    const handleAddNew = () => {
      setSelectedDoctor({doctor: {firstname: "", lastname: "", email: "", phone: "", specialty: "", shift: [], workdays: [] }, isNew: true})
      setOpenWindow(true)
    }

    useEffect(() => {
      async function fetchDoctors() {
        const data = await getDoctors();
        data ? setDoctors(data) : setError("Something went wrong")
      }
      fetchDoctors();
    }, []);

    return (
      <section className="w-full min-h-screen flex flex-col items-center">
        <Header />
        <div className="w-full flex flex-col items-center">
          <p className="font-bold">DOCTOR MANAGEMENT</p>
          <hr className="w-5/6 border-[var(--turquoise)] mb-10" />

          {error && <p>{error} </p>}
          {openWindow && <DoctorWindow rawDoctor={selectedDoctor.doctor} isNew={selectedDoctor.isNew} />}
          <div className="flex flex-wrap justify-center gap-8">
            <button className="w-60 h-60 rounded-3xl border border-[var(--turquoise)] flex flex-col items-center justify-center hover:bg-[var(--mint_green)]"
                onClick={() => handleAddNew()}>
              <div className="w-15 h-15 border-3 border-[var(--turquoise)] rounded-3xl flex items-center justify-center">
                <FontAwesomeIcon icon={faPlus} className="text-[var(--turquoise)] text-3xl"/>
              </div>
            </button>
            {doctors.map((doc) => (
              <DoctorCard key={doc._id} doctor={doc} handleSelect={handleSelect}/>
            ))}
          </div>
        </div>
      </section>
      
    );
}

function DoctorWindow({rawDoctor, isNew}) {
    
    const [doctor, setDoctor] = useState(null)
    const [msg, setMsg] = useState("")
    const [image, setImage] = useState()

    useEffect(() => {
      const newArray = []
      for (const shift of rawDoctor?.shift) {
          newArray.push(shift.name)
      }
      setDoctor({ ...rawDoctor, shift: newArray})

    }, [rawDoctor])

    const toggleCheckbox = (name, value) => {
        formik.setFieldValue(
        name,
        formik.values[name].includes(value)
            ? formik.values[name].filter((v) => v !== value)
            : [...formik.values[name], value]
        );
    };

    const displayTemporaryImage = (value) => {
        const reader = new FileReader()
        reader.onloadend = () => {
            setImage(reader.result)
        }
        reader.readAsDataURL(value.currentTarget.files[0])
    }

    const handleDelete = async () => {
        const response = await deleteDoctor(doctor._id)
        response? window.location.reload() : setMsg("Something went wrong.")

    }
    
    const formik = useFormik({
        initialValues: getDoctInitialVal(doctor), enableReinitialize: true, validationSchema: doctorValidationSchema,
        onSubmit: async (values) => {
          if (isNew) {
            const response = await registerDoctor(values)
            response? setMsg("Action successfully realized.") : setMsg("Something went wrong.")
          } else {
            const response = await updateDoctor(values, doctor._id)
              if (response.data && response.picture) {
                setMsg("Action successfully realized.")
              } else {
                setMsg("Something went wrong. Please try again later.")
              }
          } 
        }
    })

    if (!doctor) return <p>Loading...</p>;
    return (
        <form onSubmit={formik.handleSubmit}
            className="w-1/2 h-3/4 z-30 bg-[var(--outer_space)] shadow-[var(--mint_green)] shadow-md absolute flex flex-col items-center p-10 rounded-3xl text-[var(--seasalt)] overflow-y-auto">
            <button onClick={() => window.location.reload()} className="w-10 h-10"><FontAwesomeIcon icon={faCircleXmark} className="text-2xl absolute right-10 top-8" /></button>

            <p className="text-sm text-[var(--turquoise)]">PERSONAL DATA & CONTACT</p>
            <hr className="w-5/6 border-[var(--turquoise)]" />

            <div className="w-5/6 flex items-center justify-center">
              {!isNew && <div className="relative rounded-3xl w-25 h-25 overflow-hidden">
                    <Image src={image || "/images/default_doctor.jpg"} alt="profile" objectFit="cover" layout="fill"/>
                </div>}
                
                    <div className="w-5/6 grid grid-cols-2 sm:grid-cols-2 gap-4 p-4">
                        {["firstname", "lastname", "email", "phone"].map((field) => (
                            <div key={field}
                                className='flex flex-col'>
                                <label htmlFor={field}
                                    className='text-xs text-[var(--turquoise)]'>{field.toUpperCase()}</label>
                                <input type='text' name={field} id={field} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values[field]} 
                                    className="border border-[var(--turquoise)] rounded-3xl px-2"/>
                                {formik.touched[field] && formik.errors[field] ? (<p className='text-red-500 text-xs'>{formik.errors[field]}</p>) : null}
                            </div>
                        ))}
                        {!isNew && <label 
                        className="hover:bg-[var(--mint_green)] rounded-3xl border border-[var(--turquoise)] py-1 px-4 transition text-xs col-span-2"
                        >CHANGE IMAGE 
                        <input type="file" accept="/image*" onChange={(value) => {formik.setFieldValue("img", value.currentTarget.files[0]);
                                                                                displayTemporaryImage(value)
                        }}/> 
                        </label>  }           
                </div>
            </div>
            
            <div className="w-5/6 items-center flex flex-col">
                <p className="text-sm text-[var(--turquoise)] pt-6">DOCTOR PROFILE</p>
                <hr className="w-full border-[var(--turquoise)]" />
                <div className="flex flex-col text-center w-full p-4" >
                    <div className='flex flex-col items-center'>
                        <p className='text-xs text-[var(--turquoise)]'>SPECIALTY</p>
                        <select name="specialty" id="specialty" onBlur={formik.handleBlur} onChange={(e) => {formik.handleChange(e)}} value={formik.values.specialty}
                                className="w-50">
                            <option className="bg-[var(--outer_space)]">--Select</option>
                            {["Cosmetic Surgery", "Forensic Pathology", "Neurology", "Space Medicine"].map(specialty => (
                                <option key={specialty} value={specialty} className="bg-[var(--outer_space)]">{specialty}</option>
                            ))}
                        </select>
                        {formik.touched.specialty && formik.errors.specialty ? (<p className='text-red-500 text-xs'>{formik.errors.specialty}</p>) : null}
                    </div>

                    <p className="text-xs text-[var(--turquoise)] pt-4">SHIFT</p>
                    <div className="checkbox-group flex gap-2 justify-center">
                        {["Morning", "Afternoon", "Night", "Latenight"].map((option) => (
                            <label key={option} className="checkbox-item">
                            <input
                                type="checkbox"
                                checked={Array.isArray(formik.values.shift) && formik.values.shift.includes(option)}
                                onChange={() => toggleCheckbox("shift", option)}
                            />
                            {option}
                            </label>
                        ))}
                    </div>

                    <p className="text-xs text-[var(--turquoise)] pt-4">WORKDAYS</p>
                    <div className="checkbox-group flex gap-2 justify-center">
                        {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
                            <label key={day} className="checkbox-item">
                            <input
                                type="checkbox"
                                checked={formik.values.workdays?.includes(day)}
                                onChange={() => toggleCheckbox("workdays", day)}
                            />
                            {day}
                            </label>
                        ))}
                    </div>

                    <label htmlFor="description" className="text-xs text-[var(--turquoise)] pt-4">DESCRIPTION</label>
                    <textarea name="description" id="description" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.description}
                        className="w-full h-30 border border-[var(--turquoise)] resize-none text-left align-top rounded-3xl p-5" />
                    {formik.touched.description && formik.errors.description ? (<p className='text-red-500 text-xs'>{formik.errors.description}</p>) : null}
                </div>
            </div>
            {isNew && <p>Important! This is the temporary password: Password123$</p>}
            <p className="font-bold">{msg}</p>
            <button type="submit"
                className="bg-[var(--seasalt)] text-[var(--outer_space)] rounded-3xl py-1 px-4 w-50">{isNew? "REGISTER DOCTOR": "UPDATE PROFILE"}</button>

            {!isNew && <button onClick={() => handleDelete()}>DELETE</button>}

        </form>
    )
}