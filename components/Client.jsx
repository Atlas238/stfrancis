import {useRouter} from "next/router"
import {useEffect, useState} from "react"
import { RiCake2Fill } from "react-icons/ri"
import Banned from "./Banned"
import ClientBody from "./ClientBody"
import Early from "./Early"

export default function Client({client}) {
    // State variables used to control component render
    const [view, setView] = useState(null)  // 0 display nothing, 1 precheckin, 2 postcheckin
    const [checkedIn, setCheckedIn] = useState(false)
    const [isEarly, setIsEarly] = useState(null)
    const [overrideEarly, setOverrideEarly] = useState(false)
    const [daysAgo, setDaysAgo] = useState(0)
    const [settings, setSettings] = useState(null)
    const [loading, setLoading] = useState(null)

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
        let today = new Date(Date.now())
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

        async function getSettings() {
            let res = await fetch('/api/settings', { method: 'GET' })
            let data = await res.json()
            setSettings(data)
        }


        if (client.visits != null || client.visits != undefined) {

            getSettings()

            if (settings) {
                setLoading(true)
                let lastVisit = new Date(client.visits[0]?.visitDate.split('T')[0])
                const diffDays = getDateDifference(today, lastVisit)
                if (diffDays < settings.daysEarlyThreshold) {
                    setIsEarly(true)
                    setDaysAgo(diffDays)
                } else {
                    setIsEarly(false)
                }
            setLoading(false)
            }
        }
    }, [localStorage.getItem('checkedInClients'), window.location.pathname, settings])

    function setEligibleItems() {
        let today = new Date(Date.now())
        client.eligibleItems = []

            if (client.mostRecentBackpack != null || client.mostRecentBackpack != undefined) {
                let lastBackpack = new Date(client.mostRecentBackpack.split('T')[0])
                let daysDiff = getDateDifference(today, lastBackpack)
                if (daysDiff > settings.backpackThreshold) {
                    client.eligibleItems.push('Backpack')
                }
            } else {
                client.eligibleItems.push('Backpack')
            }

            if (client.mostRecentSleepingBag != null || client.mostRecentSleepingBag != undefined) {
                let lastSleepingBag = new Date(client.mostRecentSleepingBag.split('T')[0])
                let diffDays = getDateDifference(today, lastSleepingBag)
                if (diffDays > settings.sleepingbagThreshold) {
                    client.eligibleItems.push('Sleeping Bag')
                }
            } else {
                client.eligibleItems.push('Sleeping Bag')
            }
    }


    function getDateDifference(rightNow, compareDate) {
        let diff = Math.abs(rightNow - compareDate)
        let daysDiff = Math.ceil(diff / (1000 * 60 * 60 * 24))
        return daysDiff
    }

    function override() {
        setOverrideEarly(true)
    }

    return (
        <div className="card bg-base-200 max-w-lg m-3">
            {!loading ? 
            <div className="card-body flex items-center">

                {client?.banned ? 
                  <Banned />
                : null }

                <h1 className="card-title mx-auto text-2xl">{client?.firstName} {client?.lastName} </h1>
                <div className="flex flex-row items-center">
                <RiCake2Fill />
                <h2 className="card-tite mx-auto text-xl pl-1">{new Date(client.birthday).toDateString()}</h2>
                </div>
                <div className="divider my-0"></div>
                { isEarly && 
                    daysAgo < settings.daysEarlyThreshold ? 
                <>
                <Early daysAgo={daysAgo} override={override} overrideOn={settings.override}/>
                <ClientBody
                    client={client}
                    view={view}
                    checkedIn={checkedIn}
                    handleCheckin={handleCheckin}
                    handleCheckout={handleCheckout}
                    goToProfile={goToProfile}
                    isEarly={isEarly}
                    />
                </>
                :
                <ClientBody
                    client={client}
                    view={view}
                    checkedIn={checkedIn}
                    handleCheckin={handleCheckin}
                    handleCheckout={handleCheckout}
                    goToProfile={goToProfile}
                    />
                }
        </div>
        :
        null}
    </div>
    )
}