import { useState } from "react";
import { useRouter } from "next/router"
import Visit from "./Visit";

export default function FullClient({ client }) {
    
    const router = useRouter()

    // Use client[0] to get client obj

    // TODO: See All Visits Button - changes view and displays all pages of visits
    // OTHERWISE just displays the 10 recieved from Client

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

    // let pages = paginate(client[0].visits)

    const deleteVisit = async () => {
        let visitID = document.getElementById('visitDelete').value
        let response = await fetch(`https://stfrancisone.herokuapp.com/home/?visitID=${visitID}`)
        let data = await response.json()

        window.location.reload()
    }
   
    // Creates mini components for the visits
    let mappedVisits = client?.visits?.reverse().map((visit) => {
        return (
            <Visit visit={visit} deleteVisit={deleteVisit} />
        )
    })

    // Pagination w/o the above function
    let visitsPageOne = mappedVisits?.splice(0, 10)
    let visitsPageTwo = mappedVisits?.splice(10, 20)
    let visitsPageThree = mappedVisits?.splice(20, 30)
    let visitsPageFour = mappedVisits?.splice(30, 40)

    // Update profile function
    const updateClientProfile = () => {
        router.push(`/updateclient/${client?.clientID}`)
    }

    return (
        <div className="container mt-20 card w-8/12 bg-base-300 shadow-xl mx-auto">
            <div className="card-body min-w-full">
                <div className="grid grid-flow-col">
                    <div>
                        <h1 className="card-title text-5xl">{client?.firstName} {client?.middleInitial}. {client?.lastName} {client?.banned ?
                            <span className="font-bold text-lg bg-red-900 text-primary rounded-md px-4">BANNED</span> : <></>} 
                        </h1>
                    </div>
                    <div className="justify-self-end"><button onClick={()=> { updateClientProfile() }} className="btn btn-sm btn-outline">Edit Profile</button></div>
                </div>
                <ul className="flex">
                    <li className="p-1 text-xl"><span className="font-bold">Birthday:</span> {client?.birthday.split(' ')[0]}</li>
                    <li className="p-1 text-xl"><span className="font-bold">Gender:</span> {client?.gender}</li>
                    <li className="p-1 text-xl"><span className="font-bold">Race:</span> {client?.race}</li>
                    <li className="p-1 text-xl"><span className="font-bold">ZipCode:</span> {client?.zipCode}</li>
                </ul>
                <div className="divider"></div>
                <ul>
                    {page === 1 ? 
                      visitsPageOne 
                    : page === 2 ? 
                      visitsPageTwo 
                    : page === 3 ? 
                      visitsPageThree 
                    : page === 4 ? 
                      visitsPageFour 
                    : null}
                    <div className="btn-group justify-center">
                        { visitsPageTwo?.length > 0 ? <button className={`btn ${page == 1 ? "btn-active" : ""}`} onClick={()=>{setPage(1)}}>1</button> : <></>}
                        { visitsPageTwo?.length > 0 ? <button className={`btn ${page == 2 ? "btn-active" : ""}`} onClick={()=>{setPage(2)}}>2</button> : <></>}
                        { visitsPageThree?.length > 0 ? <button className={`btn ${page == 3 ? "btn-active" : ""}`} onClick={()=>{setPage(3)}}>3</button> : <></>}
                        { visitsPageFour?.length > 0 ? <button className={`btn ${page == 4 ? "btn-active" : ""}`} onClick={()=>{setPage(4)}}>4</button> : <></>}
                    </div>
                </ul>
            </div>
        </div>
    )
}