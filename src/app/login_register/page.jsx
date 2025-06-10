"use client"

import { useState } from "react"
import Header from "@/app/shared_components/Header"
import Login from "./components/Login"
import Register from "./components/Register"
import RecoverPassword from "./components/RecoverPassword"

export default function LogInRegister() {
  const [mode, setMode] = useState("login") // Removed <AuthMode> type annotation

  const changeMode = (value) => setMode(value)

  return (
    <section>
      <Header />
      <div className="flex flex-col w-full h-screen">
        <div className="w-full h-full flex items-center justify-center">
          {mode === "login" && <Login onSwitch={changeMode} />}
          {mode === "register" && <Register onSwitch={changeMode} />}
          {mode === "recover" && <RecoverPassword onSwitch={changeMode} />}
        </div>
      </div>
    </section>
  )
}