"use client"

import Image from "next/image"
import { useFormik } from 'formik';
import * as Yup from 'Yup';
import { useState } from "react";

export default function Private() {
    const [userType, setUserType] = useState("")

    const changeUser = (type) => {
        setUserType(type)
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        }, validationSchema: Yup.object({
            email: Yup.string().email(),
            password: Yup.string()
        }), onSubmit: async (values) => {
            //const response = await 
        }
    })
    return(
        <section className="w-full h-screen flex flex-col justify-center items-center"> 
            <Image src={"/images/logo.png"} alt="logo" width={150} height={50}/>
            <p className="font-bold p-8">Employee Log In</p>
            <div className="flex gap-4">
                <button className={`border-2 border-[var(--outer_space)] p-1 px-3 rounded-3xl ${userType === "admin" ? 'bg-[var(--mint_green)]' : 'bg-[var(--seasalt)]'}`}
                        onClick={() => changeUser("admin")}>ADMIN</button>
                <button className={`border-2 border-[var(--outer_space)] p-1 px-3 rounded-3xl ${userType === "doctor" ? 'bg-[var(--mint_green)]' : 'bg-[var(--seasalt)]'}`}
                        onClick={() => changeUser("doctor")}>DOCTOR</button>
            </div>
            <div className="flex flex-col pt-4">
                <label htmlFor="email" className='text-xs'>EMAIL</label>
                <input type="text" name="email" id="email" 
                        className="p-2 bg-[var(--mint_green)] rounded-3xl"
                        onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email}/>
                {formik.touched.email && formik.errors.email ? (<p className='hidden peer-invalid:block'>{formik.errors.email}</p>) : null}
            </div>
            <div className="flex flex-col pt-2 pb-4">
                <label htmlFor="password" className='text-xs'>PASSWORD</label>
                <input type="password" name="password" id="password" 
                        className="p-2 bg-[var(--mint_green)] rounded-3xl"
                        onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password}/>
                {formik.touched.password && formik.errors.password ? (<p className='hidden peer-invalid:block'>{formik.errors.password}</p>) : null}
            </div>
            <button type="submit" className="p-2 px-8 border-2 border-[var(--outer_space)] rounded-3xl bg-[var(--turquoise)]">ENTER</button>
        </section>
    )
}