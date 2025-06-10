"use client"

import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarDays, faFileArchive, faClose, faUser, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { logOut } from "../../shared_components/functions"
import { useRouter } from "next/navigation"

export function Sidebar({ setDisplay, selected, name }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const router = useRouter()

  const menuItems = [
    {
      title: "Profile",
      icon: <FontAwesomeIcon icon={faUser}/>,
    },
    {
      title: "Appointments",
      icon: <FontAwesomeIcon icon={faCalendarDays}/>,
    },
    {
      title: "Patients",
      icon: <FontAwesomeIcon icon={faFileArchive}/>,
    },
  ]

  const handleLogout = async () => {
        await logOut()
        router.push("/private")
    };

  return (
    <div className={`h-full m-5 p-3 transition-all duration-300 rounded-3xl border-3 border-[var(--turquoise)]`}>
      <div className={`relative h-full p-5 flex flex-col justify-between transition-all duration-300 rounded-3xl ${isCollapsed ? "w-20" : "w-64"} overflow-hidden`}
            style={{backgroundImage: `url('/images/textured_bg.png')`}}>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-10 absolute right-5 rounded-full p-2 transition flex-shrink-0 hover:bg-[var(--mint_green)] bg-[var(--turquoise)]" >
          {isCollapsed ? <FontAwesomeIcon icon={faArrowRight}/> : <FontAwesomeIcon icon={faArrowLeft}/> }
        </button>

        <div className="space-y-3  flex flex-col flex-1 justify-center items-center">
          <p className="font-bold">Hello {!isCollapsed && name}</p>
          {menuItems.map((item) => (<button
            key={item.title}
            onClick={() => setDisplay(item.title)}
            className={`${selected === item.title ? 'bg-[var(--mint_green)]' : 'hover:bg-[var(--mint_green)] text-[var(--outer_space)]'} w-full h-15 rounded-3xl transition`}>
            <div className="flex flex-col items-center">
              <item.icon className="h-6 w-6 flex-shrink-0" />
              {!isCollapsed && <span>{item.title}</span>}
            </div>
          </button>))}
        </div>

        <button onClick={handleLogout}
          className="w-full flex justify-center gap-3 transition font-medium text-[var(--outer_space)] hover:text-[var(--mint_green)]" >
          <FontAwesomeIcon icon={faClose} className="h-6 w-6 flex-shrink-0" />
          {!isCollapsed && <span className="text-base">Log out</span>}
        </button>
      </div>
    </div>
    
  )
}







