import Client from "../components/Client"

// const clients = [
//     {
//         id: 0,
//         firstName: 'tex',
//         lastName: 'mex',
//         middleInitial: 'n',
//         dateOfBirth: new Date(),
//         eligibleItems: ['Backpack']
//     },
//     {
//         id: 1,
//         firstName: 'john',
//         lastName: 'mast',
//         middleInitial: 't',
//         dateOfBirth: new Date(),
//         eligibleItems: ['Sleeping Bag']
//     }
// ]

export default function checkedin() {
    // let clients = localStorage.getItem('checkedInClients')
    let clients = JSON.parse(localStorage.getItem('checkedInClients'))
    let mapped = clients.map((client) => {
        if (client.firstName && client.lastName) {
            return <Client client={client} key={client.id}/>
        }
    })

    return (
        <div className="my-20">
           <h1 className="text-lg text-primary-content">Checked In Clients</h1>
           <div className="flex">
            {mapped} 
           </div>
        </div>
    )
}