import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Client({ client }) {
    // State variables used to control component render
    const [view, setView] = useState(null)  // 0 display nothing, 1 precheckin, 2 postcheckin
    const [checkedIn, setCheckedIn] = useState(false) 
    let banned = false // Temp Bool flag

    const router = useRouter() // Next Router - lets you send the user somewhere

    //Sends the user to the Checkout Page and provides the client id as a query parameter
    let handleCheckout = (e) => {
        router.push(`/checkout?id=${client.id}`) 
    }

    //Sends the user to the profile page for a Client providing the client id as a route parameter (nextjs)
    let goToProfile = (e) => {
        router.push(`/profile/${client.id}`)
    }

    //Checks in the given client, saving a basic object to localstorage to pass around as the user navigates pages
    let handleCheckin = async (e) => {
        // Convert client to checkin model ->
        let checkinModel = {
            clientID: client.id,
            checkinDate: new window.Date()
        }

        // Create a visit with client ID
        // let response = await fetch('', { method: 'POST', body: JSON.stringify(checkinModel) })

        // Get already checked in clients from localstorage
        let checkedInClients = JSON.parse(localStorage.getItem("checkedInClients"))
        if (checkedInClients === undefined || checkedInClients === null) {
            let clientList = []
            clientList.push(client) // Add client to the list if there was no list
            localStorage.setItem("checkedInClients", JSON.stringify(clientList))
        } else {
            checkedInClients.forEach(checkedInClient => {
                if (checkedInClient.id === client.id) {
                    return // already checked in NOT WORKING ?
                }
            })
            checkedInClients.push(client) // If client was not in list add them to it
            localStorage.setItem("checkedInClients", JSON.stringify(checkedInClients)) // Store updated List
        }
        setCheckedIn(true)  
    }

    // Runs at page load + when dependencies are updated (in array at end)
    // Checks where this component is being rendered and changes the view state accordingly
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

    // Easy way to return html elements from an array of anykind
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
                <label>Last Visit Notes:</label>
                    <p></p>
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