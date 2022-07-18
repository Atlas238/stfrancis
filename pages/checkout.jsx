import { useEffect, useState } from "react"

export default function checkout() {
    const [checkedInClients, setCheckedInClients] = useState(null)

    let clients = []

    useEffect(() => {
        setCheckedInClients(localStorage.getItem("checkedInClients"))        
    },[])

    return (
        <div>

            <h1>Check out Client</h1>

            {/* Show list of clients who have checked in today - and not checked out (can store this locally) */}

            {/* Render reconciliation form after selecting user */}
            

        </div>
    )
}