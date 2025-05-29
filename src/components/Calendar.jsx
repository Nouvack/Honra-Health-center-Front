"use client"

import React, { useState } from "react"

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const hours = Array.from({ length: 12 }, (_, i) => `${i + 9}:00`)

export default function Calendar() {

    const getMonday = (date) => {
        const d = new Date(date)
        const day = d.getDay()
        const diff = d.getDate() - day + (day === 0 ? -6 : 1)
        return new Date(d.setDate(diff))
    }

    const [weekStart, setWeekStart] = useState(getMonday(new Date()))
    const [schedule, setSchedule] = useState({})

    
    const formattedWeek = weekdays.map((_, i) => {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + i);
        return date.toISOString().split("T")[0];
    });

    return (
        <section>
            <div className="grid grid-cols-[80px_repeat(7,1fr)]">
                {/** HEADER */}
                <div className="bg-white"></div>
                {weekdays.map((day, i) => (
                    <div key={day}>{day}<br/>
                        <span className="text-xs text-gray-500">
                            {formattedWeek[i]}
                        </span>
                    </div>
                ))}
                {/** ROWS */}
                {hours.map((hour) => (
                    <React.Fragment key={hour}>
                        {/** TIME */}
                        <div>{hour}</div>
                        {weekdays.map((day, i) => {
                            const dateKey = formattedWeek[i]
                            const cellKey = `${dateKey}-${hour}`
                            const status = "status"
                            const bgColor = "bg-[var(--turquoise)]"

                            return (
                                <div key={cellKey} 
                                    className={`border-1 m-1 h-12 ${bgColor}`}></div>
                            )
                        })}
                    </React.Fragment>
                ))}
            </div>
        </section>
    )
}