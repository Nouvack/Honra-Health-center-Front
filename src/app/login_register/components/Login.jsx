"use client";

import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import { loginPatient } from "./functions";
import { useRouter } from "next/navigation";

function LoginFormFields() {
    const {
        errors,
        touched,
        getFieldProps,
    } = useFormikContext();

    return (
        <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs">Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Luis@gmail.com"
                    {...getFieldProps("email")}
                    className="input-field py-2 px-3 border rounded-3xl w-full"
                />
                {touched.email && errors.email && (
                    <p className="error">{errors.email}</p>
                )}

                <label htmlFor="password" className="text-xs">Password</label>
                <input
                    id="password"
                    type="password"
                    placeholder="********"
                    {...getFieldProps("password")}
                    className="input-field py-2 px-3 border rounded-3xl w-full"
                />
                {touched.password && errors.password && (
                    <p className="error">{errors.password}</p>
                )}
        </div>
    );
}

export default function Login({ onSwitch }) {
    const router = useRouter(); 

    const handleTriggerAuth = async (values, { setSubmitting }) => {
        try {
            const response = await loginPatient(values);
            if (response.success) {
                router.push("./patients"); 
            } else {
                alert("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred. Please try again later.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section 
            className="w-screen h-screen flex items-center justify-center bg-cover" style={{backgroundImage: `url('/images/textured_bg.png')`}}
        >

            <div
                id="componentL"
                className="flex w-5/6 lg:w-1/2 h-5/8 flex-col justify-center items-center p-4 gap-4"
            >
                <p className="font-bold text-2xl mb-6">Log in</p>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validationSchema={Yup.object({
                        email: Yup.string()
                            .email("Invalid email address")
                            .required("Required"),
                        password: Yup.string().required("Required"),
                    })}
                    onSubmit={handleTriggerAuth}
                >
                    {({ isSubmitting }) => (
                        <Form className="flex flex-col gap-4 w-full max-w-md">
                            <LoginFormFields />
                            <button
                                type="submit"
                                className="bg-[var(--button)] p-2 rounded-3xl w-full text-white disabled:opacity-60"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Logging in..." : "Log in"}
                            </button>
                        </Form>
                    )}
                </Formik>

                <p className="text-sm mt-4">
                    Don't have an account? Sing Up!{" "}
                    <button
                        onClick={() => onSwitch("register")}
                        className="underline text-[var(--turquoise)] bg-transparent border-none p-0 m-0 cursor-pointer"
                    >
                        Register
                    </button>
                </p>

                <p className="text-sm">
                    Forgot your password?{" "}
                    <button
                        onClick={() => onSwitch("recover")}
                        className="underline text-[var(--turquoise)] bg-transparent border-none p-0 m-0 cursor-pointer"
                    >
                        Recover Password
                    </button>
                    </p>
            </div>
        </section>
    );
}
