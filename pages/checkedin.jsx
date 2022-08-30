import Loading from "components/Loading"
import Printout from "components/Printout"
import { useEffect, useState } from "react"
import Client from "../components/Client"

// Shows all currently checked in Clients
export default function checkedin() {
    const [loading, setLoading] = useState(false)
    const [settings, setSettings] = useState(null)
    const [mapped, setMapped] = useState(null)
    const [reprint, setReprint] = useState({
        form: null,
        client: null
    })

    useEffect(() => {
        async function getSettings() {
            let response = await fetch('/api/settings', { method: 'GET' })
            let data = await response.json()
            setSettings(data)
        }
        getSettings()
        let checkedInClients = JSON.parse(localStorage.getItem('checkedInClients'))
        if (checkedInClients) {
            setMapped(checkedInClients.map((data) => {
                return <Client key={data.client.clientID} client={data.client} settings={settings} setReprint={setReprint} />
            }))
        }
    },[settings])

    return (
        <>
        <div className="mx-auto mt-40 w-screen px-10 hide">
            <h1 className="text-3xl text-primary-content select-none">Checked In Clients</h1>
            <div className="divider hide"></div>
            {
            loading ? 
            <Loading loading={loading} />
            :  
            <div className="flex mx-auto container flex-row flex-wrap justify-center">
                {mapped} 
            </div>  
            }
        </div>
        <Printout formData={reprint.form} client={reprint.client} />
        </>
    )
}