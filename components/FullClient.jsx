import { useEffect, useState } from "react";
import { useRouter } from "next/router"
import Visit from "./Visit";

export default function FullClient({ client }) {
    
    const router = useRouter()

    // Use client[0] to get client obj

    // TODO: See All Visits Button - changes view and displays all pages of visits
    // OTHERWISE just displays the 10 recieved from Client

    // Page state is for visit pages
    const [page, setPage] = useState(1)
    const [oldestVisit, setOldestVisit] = useState(null)
    const [mappedVisits, setMappedVisits] = useState(null)

    // Takes in the total visit arrays and creates 'pages' - may not use later on
    const paginate = (visits) => {
        let pages = visits.length / 10
        let cumulative = []

        let start = 0
        for (let i = 0; i < pages; i++) {
            let page = visits.slice(start, start + 10)
            cumulative.push(page)

            start += 10
        }

        return pages
    }

    const findOldestVisit = () => {
        let minID

        client?.visits?.forEach((visit) => {
            if (minID === undefined) minID = visit.visitID
            if (visit.visitID < minID) minID = visit.visitID
        })

        client?.visits?.forEach((visit) => {
            if (visit.visitID === minID) setOldestVisit(visit)
        })
    }

    // Update profile function
    const updateClientProfile = () => {
        router.push(`/updateclient/${client?.clientID}`)
    }

    useEffect(()=> {
        findOldestVisit()
        setMappedVisits(client.visits.reverse().map((visit) => {
            return <Visit key={visit.visitID} visit={visit} />
        }))
    },[oldestVisit])

    return (
        <div className="container mt-20 card w-8/12 bg-base-300 shadow-xl mx-auto">
            <div className="card-body min-w-full">
                <div className="grid grid-flow-col">
                    <div>
                        <h1 className="card-title text-5xl">{client?.firstName} {client?.middleInitial===undefined || client?.middleInitial==='' || client?.middleInitial === 'none' ? '' : client?.middleInitial + '.'} {client?.lastName} {client?.banned ?
                            <span className="font-bold text-lg bg-red-900 text-primary rounded-md px-4">BANNED</span> : <></>} 
                        </h1>
                    </div>
                    <div className="justify-self-end"><button onClick={()=> { updateClientProfile() }} className="btn btn-sm btn-outline">Edit Profile</button></div>
                </div>
                <ul className="flex">
                    <li className="p-2 text-xl"><span className="font-bold">Birthday:</span> {client?.birthday.split(' ')[0]}</li>
                    <li className="p-2 text-xl"><span className="font-bold">Gender:</span> {client?.gender}</li>
                    <li className="p-2 text-xl"><span className="font-bold">Race:</span> {client?.race}</li>
                    <li className="p-2 text-xl"><span className="font-bold">ZipCode:</span> {client?.zipCode}</li>
                    <li className="p-2 text-xl"><span className="font-bold">Number of Kids:</span> {client?.numFamily}</li>
                </ul>
                {oldestVisit ? 
                        <h3 className="card-title text-xl pt-1 pl-2">
                            Client since {new Date(oldestVisit.visitDate).toDateString()}
                        </h3>
                        : null}

                <div className="divider"></div>
                <ul>
                    {mappedVisits === null ? null : mappedVisits.reverse()}
                </ul>
            </div>
        </div>
    )
}