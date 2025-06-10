"use client"

import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarDays, faFileArchive, faClose, faUser, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"

export function Sidebar({ setDisplay, selected }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    {
      title: "Personal Data",
      icon: <FontAwesomeIcon icon={faUser}/>,
    },
    {
      title: "Appointments",
      icon: <FontAwesomeIcon icon={faCalendarDays}/>,
    },
    {
      title: "Invoices",
      icon: <FontAwesomeIcon icon={faFileArchive}/>,
    },
  ]

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      window.location.href = "/login" // RUTA INEXISTENTE CAMBIAR ESTO
    }
  }

  return (
    <div className={`h-5/6 p-5 flex flex-col justify-between transition-all duration-300 m-5 rounded-3xl bg-[var(--outer_space)] ${
        isCollapsed ? "w-20" : "w-64"}`}>

      {/* Header con botón de colapso */}
      <div className="flex items-center justify-between mb-8">
        {!isCollapsed &&  <h2 className="text-xl font-bold text-[var(--seasalt)]"> Profile</h2>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="rounded-full p-2 transition flex-shrink-0 hover:bg-[var(--mint_green)] bg-[var(--turquoise)]" >
          {isCollapsed ? <FontAwesomeIcon icon={faArrowRight}/> : <FontAwesomeIcon icon={faArrowLeft}/>}
        </button>
      </div>

      {/* Navegación - ocupa el espacio disponible */}
      <div className="space-y-3  flex flex-col flex-1 justify-center">
        {menuItems.map((item) => (<button
          key={item.title} 
          onClick={() => setDisplay(item.title)}
          className={`${selected === item.title? 'bg-[var(--mint_green)]' : 'hover:bg-[var(--mint_green)] text-[var(--mint_green)] hover:text-[var(--outer_space)]'} h-15 rounded-3xl  transition`}>
            <div className="flex flex-col items-center">
              {item.icon}
              {!isCollapsed && <span>{item.title}</span>}
            </div>
        </button>))}
      </div>

      {/* Botón de Logout - siempre en la parte inferior */}
      <button onClick={handleLogout}
        className="w-full flex justify-center gap-3 transition font-medium text-[var(--turquoise)] hover:text-[var(--mint_green)]" >
        <FontAwesomeIcon icon={faClose} className="h-6 w-6 flex-shrink-0" />
        {!isCollapsed && <span className="text-base">Log out</span>}
      </button>
    </div>
  )
}







