import { useState } from "react";
import { useRouter } from "next/router"

export default function FullClient({ client }) {
    
    const router = useRouter()

    // Use client[0] to get client obj

    // Page state is for visit pages
    const [page, setPage] = useState(1)

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

    let pages = paginate(client[0].visits)
   
    // Creates mini components for the visits
    let mappedVisits = client[0].visits.reverse().map((visit) => {
        return (
            <div key={visit.visitID} className="card bg-base-100 shadow-md m-2">
                <div className=" card-body">
                <h3 className="card-title font-bold underline underline-offset-1">Visit Date: {visit.visitDate?.split("T")[0]}</h3>
                    <ul className="ml-3">
                        <li><span className="font-semibold">Last Backpack:</span> {visit.lastBackpack?.split("T")[0]}</li>
                        <li><span className="font-semibold">Last Sleeping Bag:</span> {visit.lastSleepingBag?.split("T")[0]}</li>
                        <li><span className="font-semibold">Requests:</span> {visit.request?.split("T")[0]}</li>
                    </ul>
                    <button>Delete</button>
                </div>
            </div>
        )
    })

    // Pagination w/o the above function
    let visitsPageOne = mappedVisits.splice(0, 10)
    let visitsPageTwo = mappedVisits.splice(10, 20)
    let visitsPageThree = mappedVisits.splice(20, 30)
    let visitsPageFour = mappedVisits.splice(30, 40)

    // Update profile function
    const updateClientProfile = () => {
        console.log(`/updateclient/${client[0].clientID}`)
        router.push(`/updateclient/${client[0].clientID}`)
    }

    return (
        <div className="container mt-20 card w-8/12 bg-base-300 shadow-xl mx-auto">
            <div className="card-body min-w-full">
                <div className="grid grid-flow-col">
                    <div><h1 className="card-title text-5xl">{client[0].firstName} {client[0].middleInitial}. {client[0].lastName} {client[0].banned ?
                        <span className="font-bold text-lg bg-red-900 text-primary rounded-md px-4">BANNED</span> : <></>} </h1></div>
                    <div className="justify-self-end"><button onClick={()=> { updateClientProfile() }} className="btn btn-sm btn-outline">Edit Profile</button></div>
                </div>
                <ul className="flex">
                    <li className="p-1 text-xl"><span className="font-bold">Birthday:</span> {client[0].birthday.split(' ')[0]}</li>
                    <li className="p-1 text-xl"><span className="font-bold">Gender:</span> {client[0].gender}</li>
                    <li className="p-1 text-xl"><span className="font-bold">Race:</span> {client[0].race}</li>
                    <li className="p-1 text-xl"><span className="font-bold">ZipCode:</span> {client[0].zipCode}</li>
                </ul>
                <div className="divider"></div>
                <ul>
                    {page === 1 ? visitsPageOne : 
                    page === 2 ? visitsPageTwo : 
                    page === 3 ? visitsPageThree : 
                    page === 4 ? visitsPageFour : <></>}
                    <div className="btn-group justify-center">
                        { visitsPageTwo.length > 0 ? <button className={`btn ${page == 1 ? "btn-active" : ""}`} onClick={()=>{setPage(1)}}>1</button> : <></>}
                        { visitsPageTwo.length > 0 ? <button className={`btn ${page == 2 ? "btn-active" : ""}`} onClick={()=>{setPage(2)}}>2</button> : <></>}
                        { visitsPageThree.length > 0 ? <button className={`btn ${page == 3 ? "btn-active" : ""}`} onClick={()=>{setPage(3)}}>3</button> : <></>}
                        { visitsPageFour.length > 0 ? <button className={`btn ${page == 4 ? "btn-active" : ""}`} onClick={()=>{setPage(4)}}>4</button> : <></>}
                    </div>
                </ul>
            </div>
        </div>
    )
}