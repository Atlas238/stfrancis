import {useRouter} from "next/router"
import {useEffect, useState} from "react"
import Banned from "./Banned"
import ClientBody from "./ClientBody"
import Early from "./Early"

export default function Client({client}) {
    // State variables used to control component render
    const [view, setView] = useState(null)  // 0 display nothing, 1 precheckin, 2 postcheckin
    const [checkedIn, setCheckedIn] = useState(false)
    const [isEarly, setIsEarly] = useState(null)
    const [daysAgo, setDaysAgo] = useState(0)

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

    function getDateDifference(rightNow, compareDate) {
        let diff = Math.abs(rightNow - compareDate)
        let daysDiff = Math.ceil(diff / (1000 * 60 * 60 * 24))
        return daysDiff
    }

    let mapped = client?.eligibleItems?.map(item => {
        return <li key={item}>{item}</li>
    })

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
        console.log(client)

        if (client.visits != null || client.visits != undefined) {

            let lastVisit = new Date(client.visits[0]?.visitDate.split('T')[0])
            let today = new Date(Date.now())
            const diffDays = getDateDifference(today, lastVisit)

            if (diffDays < 30) {
                setIsEarly(true)
                setDaysAgo(diffDays)
            }
        }

    }, [localStorage.getItem('checkedInClients'), window.location.pathname])

    return (
        <div className="card bg-base-200 max-w-md p-3 m-3">
            <div className="card-body">

                {client?.banned ? 
                  <Banned />
                : null }

                <h1 className="card-title mx-auto text-2xl">{client?.firstName} {client?.lastName} </h1>
                <div className="divider"></div>

                {isEarly ? 
                    <Early daysAgo={daysAgo} />
                : daysAgo > 25 ? 
                <>
                    <Early daysAgo={daysAgo} />
                    <ClientBody
                        client={client} 
                        mapped={mapped} 
                        view={view} 
                        checkedIn={checkedIn} 
                        handleCheckin={handleCheckin} 
                        handleCheckout={handleCheckout} 
                        goToProfile={goToProfile} 
                    />
                </>
                :
                <ClientBody 
                    client={client} 
                    mapped={mapped} 
                    view={view} 
                    checkedIn={checkedIn} 
                    handleCheckin={handleCheckin} 
                    handleCheckout={handleCheckout} 
                    goToProfile={goToProfile} 
                />
                }

            </div>
        </div>
    )
}