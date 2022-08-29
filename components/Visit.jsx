export default function Visit({ visit }) {

    const deleteVisit = async () => {
        let response = await fetch(`https://stfrancisone.herokuapp.com/home/deleteVisitByID?visitID=${visit.visitID}`)
        localStorage.setItem('lastClients', null)
        window.location.reload()
    }
    return (
        <li key={visit.visitID} className="card bg-base-100 shadow-md m-2">
            <div className="card-body">
                <h3 className="card-title font-bold underline underline-offset-1">Visit Date: {new Date(visit.visitDate).toDateString()}</h3>
                <div className="flex flex-row justify-between">
                <ul className="ml-3">
                    {/* clothing */}
                    {visit.mens > 0 ? <li><span className="font-semibold">Mens Clothing:</span> {visit.mens}</li> : <></>}
                    {visit.womens > 0 ? <li><span className="font-semibold">Womens Clothing:</span> {visit.womens}</li> : <></>}
                    {visit.kids > 0 ? <li><span className="font-semibold">Kids Clothing:</span> {visit.kids}</li> : <></>}
                    {/* special items */}
                    <li><span className="font-semibold">Last Backpack:</span> {new Date(visit.lastBackpack).toDateString()}</li>
                    <li><span className="font-semibold">Last Sleeping Bag:</span> {new Date(visit.lastSleepingBag).toDateString()}</li>
                    {visit.busTicket > 0 ? <li><span className="font-semibold">Bus Ticket:</span> {visit.busTicket}</li> : <></>}
                    {visit.giftCard > 0 ? <li><span className="font-semibold">Gift Card:</span> {visit.giftCard}</li> : <></>}
                    {visit.diapers > 0 ? <li><span className="font-semibold">Diaper:</span> {visit.diapers}</li> : <></>}
                    {visit.financialAid > 0 ? <li><span className="font-semibold">Financial Aid:</span> {visit.financialAid}</li> : <></>}
                    {/* househole notes */}
                    {visit.houseHoldItems ? <li><span className="font-semibold">Household Items:</span> {visit.houseHoldItems}</li> : <></>}
                    {/* other requests */}
                    <li><span className="font-semibold">Requests:</span> {visit.request}</li>
                </ul>
                <button id="visitDelete" value={visit.visitID} onClick={deleteVisit} className="btn btn-ghost">Delete</button>
                </div>
            </div>
        </li>
    )
}