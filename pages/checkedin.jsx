import { useEffect, useState } from "react"
import { BallTriangle } from "react-loader-spinner"
import Client from "../components/Client"


// Shows all currently checked in Clients
export default function checkedin() {
    const [loading, setLoading] = useState(false)
    const [mapped, setMapped] = useState(null)

    useEffect(() => {
        async function getClients() {
            setLoading(true)
            let clients = JSON.parse(localStorage.getItem('checkedInClients'))
            let mappedClients
            if (clients != null || clients != undefined) {
                mappedClients = clients.map((client) => {
                    if (client.firstName && client.lastName) {
                        return <Client client={client} key={client.clientID}/>
                    }
                })
                setMapped(mappedClients)
            }
            setLoading(false)
        }
        getClients()
    },[])

    return (
        <div className="mx-auto mt-40 w-screen px-10">
            <h1 className="text-3xl text-primary-content select-none">Checked In Clients</h1>
            <div className="divider"></div>
            {
            loading ? 
            <div className="w-fit mx-auto px-10">
                <BallTriangle color="#000000" width={100} height={100} timeout={3000} />
            </div>
            :  
            <div className="flex mx-auto container flex-row flex-wrap justify-center">
                {mapped} 
            </div>  
           }
        </div>
    )
}