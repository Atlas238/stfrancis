import { useEffect, useState } from "react"
import { TbConfetti } from 'react-icons/tb'
import Early from "./Early"

export default function ClientBody({ client, view, settings, checkedIn, handleCheckin, handleCheckout, goToProfile, setReprint }) {
    const [overridden, setOverriden] = useState(false)

    const override = () => {
        setOverriden(true)
        client.isEarly = false
    }

    const rePrint = () => {
        let data = localStorage.getItem('checkedInClients') 
        if (!data) return
        data = JSON.parse(data)
        data.forEach((d) => {
            if (client.clientID === d.client.clientID) {
                console.log('clicked client found, setting reprint data')
                setReprint(d)
            }
        })
        setTimeout(()=>{
            window.print()
        }, 500)
    }

    if (!settings) return null

    return (
        <>
            {client.isEarly && !overridden ? 
            <Early daysAgo={client.daysEarly} override={override} overrideOn={settings.override}  /> 
            : null
            }
            {client.visits?.length > 0 ?
            <>
                <label className="font-semibold">Last Visit</label>
                <p>{new Date(client.visits[0].visitDate).toLocaleTimeString() === '12:00:00 AM' ? '' : new Date(client.visits[0].visitDate).toLocaleTimeString() + ','} {new Date(client.visits[0].visitDate).toDateString()}</p>
            </>
            : 
            <>
                <p className="font-semibold text-lg flex">New Client!<span className="text-xl pl-2"><TbConfetti /></span></p>
            </>
            }

            {client.clientNote === 'none' ? null : <><label className="font-semibold">Client Note:</label><p className="text-center">{client.clientNote}</p></> }

            {client.visits?.length > 0 ?
            <>
                <label className="font-semibold">Last Visit Notes: </label>
                <p className="text-center">{client.visits[0]?.request}</p>
            </>
            :
            null
            }

            <div className="card-actions justify-center">
                { view === 0 
                  || checkedIn === true 
                  || client.isEarly === true ? 
                  <></> 
                  : view === 1 && client?.banned === false ? 
                  <button className="btn btn-accent btn-sm" onClick={handleCheckin}>Check In</button> 
                  : view === 2 && client?.banned === false ? 
                  <>
                  <button className="btn btn-secondary btn-sm" onClick={rePrint}>Reprint</button> 
                  <button className="btn btn-secondary btn-sm" onClick={handleCheckout}>Check Out</button> 
                  </>
                  : 
                  <></>
                }
                <button className="btn btn-primary btn-sm" onClick={goToProfile}>Profile</button>
            </div>
        </>
    )
}