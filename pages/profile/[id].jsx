import FullClient from "components/FullClient"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { BallTriangle } from "react-loader-spinner"

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
                setClient(data[0])
                setLoading(false)
            }
        }

        getClient()
    }, [])

    return (
        <div className="py-20">
            {loading ? 
            <div className={`w-fit mx-auto mt-20 ${loading ? 'visible' : 'hidden'}`}>
                <BallTriangle color="#000000" height={100} width={100} timeout={3000} />
            </div> : 
            <FullClient client={client} />}
        </div>
    )
}