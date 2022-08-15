import {useRouter} from "next/router"
import {useEffect, useState} from "react"

export default function Client({client}) {
    // State variables used to control component render
    const [view, setView] = useState(null)  // 0 display nothing, 1 precheckin, 2 postcheckin
    const [checkedIn, setCheckedIn] = useState(false)

    const router = useRouter() // Next Router - lets you send the user somewhere

    //Sends the user to the Checkout Page and provides the client id as a query parameter
    let handleCheckout = (e) => {
        router.push(`/checkout?id=${client.clientID}`)
    }

    //Sends the user to the profile page for a Client providing the client id as a route parameter (nextjs)
    let goToProfile = (e) => {
        router.push(`/profile/${client.clientID}`)
    }

    //Checks in the given client, saving a basic object to localstorage to pass around as the user navigates pages
    let handleCheckin = (e) => {

        // temporary store client info to localstorage for checing-in (will be deleted in Checkin page)
        localStorage.setItem("tmpCheckinClient", JSON.stringify(client))
        router.push(`/checkin?id=${client.clientID}`)
    }

    useEffect(() => {
        // Check for clients on page load
        let checkedInClients = JSON.parse(localStorage.getItem('checkedInClients'))
        switch(window.location.pathname) {
            case '/checkedin':
                setView(2)
                break
            case '/':
                setView(1)
                break
            default:
                setView(0)
                break
        }
        checkedInClients?.forEach(c => {
            if (c.clientID === client.clientID) setView(2)
        })
    }, [localStorage.getItem('checkedInClients'), window.location.pathname])


    function getDateDifference(rightNow, compareDate) {
        let diff = Math.abs(rightNow - compareDate)
        let daysDiff = Math.ceil(diff / (1000 * 60 * 60 * 24))
        return daysDiff
    }

    // Easy way to return html elements from an array of anykind
    let eligibleItems = client?.visits.map((visit) => {
        //compare lastBackpack Date to Date.now
        let rightNow = Date.now()
        let diff = getDateDifference()

        return <li key={visit.visitID}></li>
    })
    let mapped = client?.eligibleItems?.map(item => {
        return <li key={item}>{item}</li>
    })

    return (
        <div className="card bg-base-200 max-w-md p-3 m-3">
            <div className="card-body">
                {client?.banned ? <h1 className="font-bold text-center text-lg bg-red-900 text-primary rounded-md px-4">BANNED</h1> : <></>}
                <h1 className="card-title mx-auto text-2xl">{client?.firstName} {client?.lastName} </h1>
                <p>Allowed this vist:</p>
                <ul>
                    {mapped}
                </ul>
                <label>Last Visit Notes:</label>
                <p>{client?.clientNote}</p>
                <div className="card-actions justify-end">
                    { view === 0 || checkedIn === true 
                    ? <></> 
                    : view === 1 && client?.banned === false 
                    ? <button className="btn btn-accent btn-sm" onClick={handleCheckin}>Check In</button> 
                    : view === 2 && client?.banned === false
                    ? <button className="btn btn-secondary btn-sm" onClick={handleCheckout}>Check Out</button> 
                    : <></>}
                    <button className="btn btn-primary btn-sm" onClick={goToProfile}>Profile</button>
                </div>
            </div>
        </div>
    )
}