"use client"

import Header from "../../shared_components/Header"
import { useEffect, useState } from "react"
import { getLogs } from "../functions"

export default function Logs() {
    
    const [error, setError] = useState("")
    const [logs, setLogs] = useState([])

    const colors = {
        "LOGIN": "bg-yellow-100 text-yellow-800",     // soft yellow
        "CREATE": "bg-green-100 text-green-800",       // minty green
        "DELETE": "bg-red-100 text-red-800",           // light pink/red
        "UPDATE": "bg-orange-100 text-orange-800",     // peach
        "READ": "bg-blue-100 text-blue-800",           // sky blue
        "FAIL": "bg-rose-100 text-rose-800",           // soft rose
    };

    useEffect(() => {
        const getData = async () => {
            const response = await getLogs()
            response? setLogs(response) : setError("Error getting logs.")
        }
        getData()
    }, [])
    
    return (
        <section className="w-full min-h-screen flex flex-col items-center">
            <Header />
            <div className="w-full flex flex-col items-center p-20">
                <p className="font-bold">LOGS</p>
                <hr className="w-5/6 border-[var(--turquoise)] mb-10" />

                {error && <p>{error}</p>}
        
                <table className="divide-y divide-[var(--turquoise)]">
                    <thead className="bg-[var(--mint_green)] text-gray-700">
                        <tr>
                        <th className="p-2 text-center">Date</th>
                        <th className="p-2 text-center">Employee ID</th>
                        <th className="p-2 text-center">Action type</th>
                        <th className="p-2 text-center">Description</th>
                        <th className="p-2 text-center">IP Adress</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--mint_green)]">
                        {logs?.map(log => 
                            <tr key={log._id}>
                                <td className="px-2">{new Date(log.createdAt).toLocaleString()}</td>
                                <td className="px-2">{log.employeeId}</td>
                                <td className={`px-2 ${colors[log.type] ?? ''}`}>{log.type}</td>
                                <td className="px-2">{log.action}</td>
                                <td className="px-2">{log.address}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    )
}