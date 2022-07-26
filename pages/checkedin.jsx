import Client from "../components/Client"


export default function checkedin() {
    let clients = JSON.parse(localStorage.getItem('checkedInClients'))
    let mapped = clients.map((client) => {
        if (client.firstName && client.lastName) {
            return <Client client={client} key={client.id}/>
        }
    })

    return (
        <div className="mx-auto my-24 w-screen px-10">
           <h1 className="text-3xl text-primary-content">Checked In Clients</h1>
           <div className="divider"></div>
           <div className="flex">
            {mapped} 
           </div>
        </div>
    )
}