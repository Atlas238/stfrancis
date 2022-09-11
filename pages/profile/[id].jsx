import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import FullClient from "components/FullClient"
import Loading from "components/Loading"

// Client Profile Page - Offloads client data to FullClient Component
export default function profile() {
    const router = useRouter()
    const [client, setClient] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getClient() {
            setLoading(true)
            if (router.isReady) {
                let { id } = router.query
                let response = await fetch(`https://stfrancisone.herokuapp.com/home/getClientVisits?clientID=${id}`)
                let data = await response.json()
                let client = data[0]
                
                client.firstName = (client.firstName.length > 0? client.firstName[0].toUpperCase() : '') + (client.firstName.length > 1 ? client.firstName.slice(1).toLowerCase() : '')
                client.lastName = (client.lastName.length > 0? client.lastName[0].toUpperCase() : '') + (client.lastName.length > 1 ? client.lastName.slice(1).toLowerCase() : '')
                client.middleInitial = client.middleInitial.toUpperCase()
                client.birthday = client.birthday.split(' ')[0] === '01/01/0001' ? null : client.birthday.split(' ')[0]

                setClient(client)
                setLoading(false)
            }
        }

        getClient()
    }, [])

    return (
        <div className="py-20">
            {loading ? 
              <Loading loading={loading} options={'py-10 mx-auto w-3/12'} />
            : 
              <FullClient key={client.clientID} client={client} />
            }
        </div>
    )
}