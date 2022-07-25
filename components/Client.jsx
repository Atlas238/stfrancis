import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Client({ client }) {
    const [view, setView] = useState(null) // 0 display nothing, 1 pre-checkin, 2 post-checkin
    const [checkedIn, setCheckedIn] = useState(false)
    let banned = false
    const router = useRouter()

    let handleCheckout = (e) => {
        router.push(`/checkout?id=${client.id}`) 
    }

    let goToProfile = (e) => {
        router.push(`/profile/${client.id}`)
    }

    let handleCheckin = (e) => {
        // Convert client to checkin model ->
        let checkinModel = {
            clientID: client.id,
            checkinDate: new window.Date()
        }

        let checkedInClients = JSON.parse(localStorage.getItem("checkedInClients"))
        if (checkedInClients === undefined || checkedInClients === null) {
            let clientList = []
            clientList.push(client)
            localStorage.setItem("checkedInClients", JSON.stringify(clientList))
        } else {
            checkedInClients.forEach(checkedInClient => {
                if (checkedInClient.id === client.id) {
                    return // already checked in NOT WORKING ?
                }
            })
            checkedInClients.push(client)
            localStorage.setItem("checkedInClients", JSON.stringify(checkedInClients)) // Store client in list
        }
        setCheckedIn(true)  
    }

    useEffect(() => {
        switch(window.location.pathname) {
            case '/checkedin' :
                setView(2)
                break;
            case '/': 
                setView(1)
                break;
            default: 
                setView(0)
        }
    },[window.location.pathname])

    let mapped = client?.eligibleItems?.map(item => {
        return <li key={item}>{item}</li>
    })
    return (
        <div className="card bg-base-200 max-w-md p-3 m-3">
            <div className="card-body">
                <h1 className="card-title mx-auto text-2xl">{client?.firstName} {client?.lastName} {banned ? <span className="font-bold text-2xl">BANNED</span> : <></>} </h1>
                <p>Allowed this vist:</p>
                <ul>
                    {mapped} 
                </ul>
                <div className="card-actions justify-end">
                    { view === 0 || checkedIn === true 
                    ? <></> 
                    : view === 1 
                    ? <button className="btn btn-accent btn-sm" onClick={handleCheckin}>Check In</button> 
                    : view === 2 
                    ? <button className="btn btn-accent btn-sm" onClick={handleCheckout}>Checkout</button> 
                    : <></>}
                    <button className="btn btn-accent btn-sm" onClick={goToProfile}>Profile</button>
                </div>
            </div>
        </div>
    ) 
}