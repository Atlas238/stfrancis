import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function checkout() {
    const [client, setClient] = useState(null)
    const router = useRouter()

    const { id } = router.query

    useEffect(() => {
        let checkedInClients = JSON.parse(localStorage.getItem('checkedInClients'))

        checkedInClients?.forEach(client => {
            if (client.id === id) setClient(client)
        })
    }, [localStorage.getItem('checkedInClients')])

    return (
        <div className="mt-20">
            <div className="card mx-auto w-8/12">
            <p className="card-title">Fill out what {client?.firstName} recieved today!</p>
            <p>client ID: {id}</p>

            <form className="card-body">

                <input type={"checkbox"} name="backpack" />
                <input type={"checkbox"} name="sleepingbag" />

            </form>
            </div>
        </div>
    )
}