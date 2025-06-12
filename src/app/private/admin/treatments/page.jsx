"use client"

import { useEffect, useState } from "react"
import { createTreatment, getTreatments, updateTreatment, deleteTreatment } from "../functions"
import Header from "../../shared_components/PrivateHeader"
import { useFormik } from "formik"
import * as Yup from 'yup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export default function TreatmentsPage() {

    const [treatments, setTreatments] = useState([])
    const [error, setError] = useState("")
    const [openWindow, setOpenWindow] = useState(false)
    const [params, setParams] = useState({})

    const handleSelect = (treatment) => {
        setParams({treatment, isNew: false})
        setOpenWindow(true)
    }

    const handleAddNew = (type) => {
        setParams({treatment: { name: "", description: "", price: "", type }, isNew: true})
        setOpenWindow(true)
    }

    useEffect(() => {
        const getData = async () => {
            const response = await getTreatments()
            response? setTreatments(response) : setError("Error retrieving treatments data.")
        }
        getData()
    }, [])

    return (
        <section className="w-full min-h-screen flex flex-col items-center">
            <Header />
            <div className="w-full flex flex-col items-center p-20">
                <p className="font-bold">TREATMENTS</p>
                <hr className="w-5/6 border-[var(--turquoise)] mb-10" />

                {error && <p>{error}</p>}
                {openWindow && <TreatmentWindow treatment={params.treatment} isNew={params.isNew}/>}

                <div className="flex flex-wrap gap-20 justify-center">
                    {["Cosmetic Surgery", "Forensic Pathology", "Neurology", "Space Medicine"].map(type => 
                    <div key={type} >
                        <table className="divide-y divide-[var(--turquoise)] max-w-150">
                            <caption className="font-bold text-[var(--turquoise)]">{type}</caption>
                            <thead className="bg-[var(--mint_green)] text-gray-700">
                                <tr>
                                <th className="p-2 text-center">Name</th>
                                <th className="p-2 text-center w-15">Price</th>
                                <th className="p-2 text-center">Description</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--mint_green)]">
                                {treatments[type]?.map(treatment => 
                                <tr key={treatment.name} onClick={() => handleSelect(treatment)}
                                    className="cursor-pointer hover:bg-[var(--mint_green)] transition">
                                    <td className="px-2">{treatment.name}</td>
                                    <td className="mx-2">$ {treatment.price}</td>
                                    <td className="px-2">{treatment.description}</td>
                                </tr>)}
                            </tbody>
                        </table>
                        <button onClick={() => handleAddNew(type)}>ADD NEW +</button>
                    </div>)}
                </div>
            </div>
        </section>
    )
}


function TreatmentWindow({treatment, isNew}) {
    const [msg, setMsg] = useState("")

    const handleDelete = async () => {
        const response = await deleteTreatment(treatment._id) 
        response? window.location.reload() : setMsg("Something went wrong.")
    }

    const formik = useFormik({
        initialValues: {
            name: treatment.name || "",
            price: treatment.price || undefined,
            description: treatment.description || "",
            type: treatment.type || ""
        }, validationSchema: Yup.object({
            name: Yup.string()
                .required("Name is required")
                .min(1, "Name cannot be empty"),

            description: Yup.string()
                .required("Description is required")
                .min(1, "Description cannot be empty"),

            price: Yup.number()
                .typeError("Price must be a number")
                .required("Price is required"),

            type: Yup.string()
                .required("Type is required")
                .min(1, "Type cannot be empty"),
        }), onSubmit: async(values, {resetForm}) => {
            const response = isNew? await createTreatment(values) : await updateTreatment(values, treatment._id)
            if (response) {
                setMsg("Action successfully realized.");
                if (isNew) resetForm();
            } else {
                setMsg("Something went wrong.");
            }        
        }
    })
    return (
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}
            className="w-1/2 h-1/2 bg-[var(--outer_space)] shadow-[var(--mint_green)] shadow-md absolute flex flex-col items-center p-10 rounded-3xl text-[var(--seasalt)] gap-4">
            
            <button onClick={() => window.location.reload()} className="w-10 h-10"><FontAwesomeIcon icon={faCircleXmark} className="text-2xl absolute right-10 top-8" /></button>

            {!isNew ? <p className="text-[var(--turquoise)]">EDIT TREATMENT </p> : <p className="text-[var(--turquoise)]">REGISTER TREATMENT</p>}

            <input type="text" name="name" id="name" placeholder="Name"
                onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name}
                className="border border-[var(--turquoise)] px-2 py-1 rounded-3xl w-1/2"/>
            {formik.touched.name && formik.errors.name && ( <p className='text-red-500 text-xs'>{formik.errors.name}</p> )}
        
            <input type="number" name="price" id="price" placeholder="$ Price"
                onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.price !== undefined ? formik.values.price : ""}
                className="border border-[var(--turquoise)] px-2 py-1 rounded-3xl w-1/2"/>
            {formik.touched.price && formik.errors.price && ( <p className='text-red-500 text-xs'>{formik.errors.price}</p> )}

            <textarea name="description" id="description" placeholder="Description"
                onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.description}
                className="border border-[var(--turquoise)] px-2 py-1 rounded-3xl w-1/2 h-1/2"/>
            {formik.touched.description && formik.errors.description && ( <p className='text-red-500 text-xs'>{formik.errors.description}</p> )}

            {!isNew && <div>
                <p className="text-sm">Created at: {new Date(treatment.createdAt).toLocaleString()}</p>
                <p className="text-sm">Last updated: {treatment.updatedAt === treatment.createdAt? "---" : new Date(treatment.updatedAt).toLocaleString()}</p>
            </div>}

            <p className="font-bold">{msg}</p>
            <button type="submit"
                className="bg-[var(--seasalt)] text-[var(--outer_space)] rounded-3xl py-1 px-4 w-30">{isNew? "CREATE": "UPDATE"}</button>

            {!isNew && <button onClick={() => handleDelete()}>DELETE</button>}

        </form>
    )
}