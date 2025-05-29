"use client"
import "./style.css"
import { useFormik } from "formik";
import * as Yup from "Yup";
import { useRouter } from "next/router";


export default function Login({ onSwitch }) {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email(),
            password: Yup.string()
        }),
        onSubmit: (values) => {
            //const response = await 
        }
    })
    return (
        <section id="background" className="w-screen h-screen flex items-center justify-center" >
            <div className="w-1/2 h-screen hidden lg:block">
                <img src="/images/Polygon 3.png" alt="Placeholder Image" className="object-cover w-full h-full" />
                <img src="/images/Polygon 4.png" alt="Placeholder Image" className="absolute top-0 left-0 w-180 h-190" />
                <img src="/images/doctora_bg.png" alt="Placeholder Image" className="absolute top-8 left-30 w-150 h-200" />


            </div>
            <div id="componentL" className=" flex w-5/6 h-5/8 flex-col justify-center items-center p-4 gap-4 " >
                <p className="font-bold text-2xl mb-6 ">Log in</p>
                <form onSubmit={formik.handleSubmit} className=" flex flex-col gap-4 " >
                    <div  >
                        <p >Email</p>
                        <input id="border" type="email" placeholder="Luis@gmail.com" {...formik.getFieldProps("email")} />
                    </div>
                    <div>
                        <p>Password</p>
                        <input id="border" type="password" placeholder="********" {...formik.getFieldProps("password")} />
                    </div>
                    <button type="submit" className="bg-[var(--button)] p-2 rounded-md w-full text-white" >Log in</button>
                </form>
                <p className="text-sm mt-4">
                    ¿No tienes cuenta?{" "}
                    <button
                        onClick={onSwitch}
                        className="underline text-[var(--turquoise)] bg-transparent border-none p-0 m-0 cursor-pointer"
                    >
                        Regístrate
                    </button>
                </p>

            </div>
        </section>
    )
}