"use client"

import { useState } from "react"
import Header from "@/app/shared_components/Header"
import Login from "./components/Login"
import Register from "./components/Register"

export default function LogInRegister() {
    const [isLogin, setIsLogin] = useState(true)

    const switchToRegister = () => {
        setIsLogin(false)
    }

    const switchToLogin = () => {
        setIsLogin(true)
    }

    return (
        <section>
            <Header/>
            <div className="flex flex-col w-full h-screen">
                <div className="w-full h-full flex items-center justify-center">
                    {isLogin ? (
                        <Login onSwitch={switchToRegister} />
                    ) : (
                        <Register onSwitch={switchToLogin} />
                    )}
                </div>
            </div>
        </section>
    )
}