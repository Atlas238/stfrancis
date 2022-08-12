import Client from "../components/Client"


// Shows all currently checked in Clients
export default function checkedin() {
    // Pull clients from localstorage
    let clients = JSON.parse(localStorage.getItem('checkedInClients'))
    let mapped
    if (clients != null || clients != undefined) {
        // Create client component for each Client that is checked in 
        mapped = clients.map((client) => {
            if (client.firstName && client.lastName) {
                return <Client client={client} key={client.clientID}/>
            }
        })
    }

    return (
        <div className="mx-auto mt-40 w-screen px-10">
           <h1 className="text-3xl text-primary-content select-none">Checked In Clients</h1>
           <div className="divider"></div>
           <div className="flex">
            {mapped} 
           </div>
        </div>
    )
}