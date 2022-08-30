import {useRouter} from "next/router"
import {useEffect, useState} from "react"
import { RiCake2Fill } from "react-icons/ri"

import Banned from "./Banned"
import ClientBody from "./ClientBody"

export default function Client({client, settings }) {
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

    if (!settings) return null

    return (
        <div className="card bg-base-200 max-w-lg w-80 m-3">
            <div className="card-body p-5 pb-10 flex items-center justify-evenly">
                {client?.banned ? 
                  <Banned />
                : <Banned hidden={true} /> }

                <h1 className="card-title mx-auto text-2xl">{client?.firstName} {client?.lastName} </h1>
                <div className="flex flex-row items-center">
                  <RiCake2Fill />
                  <h2 className="card-tite mx-auto text-xl pl-1">{new Date(client.birthday).toDateString()}</h2>
                </div>
                <div className="divider my-0"></div>
                <ClientBody 
                    client={client}
                    view={view}
                    checkedIn={checkedIn}
                    settings={settings}
                    handleCheckin={handleCheckin}
                    handleCheckout={handleCheckout}
                    goToProfile={goToProfile} 
                />
            </div>
    </div>
    )
}