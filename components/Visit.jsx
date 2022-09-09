export default function Visit({ visit }) {

    const deleteVisit = async () => {
        let response = await fetch(`https://stfrancisone.herokuapp.com/home/deleteVisitByID?visitID=${visit.visitID}`)
        localStorage.setItem('lastClients', null)
        window.location.reload()
    }

    let visitDate = new Date(visit.visitDate)
    return (
        <li key={visit.visitID} className="card bg-base-100 shadow-md m-2">
            <div className="card-body">
                <h3 className="card-title font-bold underline underline-offset-1">Visit Date: {visitDate.toLocaleTimeString()}, {visitDate.toDateString()}</h3>
                <div className="flex flex-row justify-between">
                <ul className="ml-3">
                    {/* clothing */}
                    {visit.mens > 0 ? <li><span className="font-semibold">Mens Clothing:</span> {visit.mens}</li> : <></>}
                    {visit.womens > 0 ? <li><span className="font-semibold">Womens Clothing:</span> {visit.womens}</li> : <></>}
                    {visit.kids > 0 ? <li><span className="font-semibold">Kids Clothing:</span> {visit.kids}</li> : <></>}
                    {/* special items */}
                    <li><span className="font-semibold">Last Backpack:</span> {visit.lastBackpack.split('T')[0] === '0001-01-01' ? null : new Date(visit.lastBackpack).toDateString()}</li>
                    <li><span className="font-semibold">Last Sleeping Bag:</span> {visit.lastSleepingBag.split('T')[0] === '0001-01-01' ? null : new Date(visit.lastSleepingBag).toDateString()}</li>
                    {visit.busTicket > 0 ? <li><span className="font-semibold">Bus Ticket:</span> {visit.busTicket}</li> : <></>}
                    {visit.giftCard > 0 ? <li><span className="font-semibold">Gift Card:</span> {visit.giftCard}</li> : <></>}
                    {visit.diapers > 0 ? <li><span className="font-semibold">Diaper:</span> {visit.diapers}</li> : <></>}
                    {visit.financialAid > 0 ? <li><span className="font-semibold">Financial Aid:</span> {visit.financialAid}</li> : <></>}
                    {/* househole notes */}
                    {visit.houseHoldItems ? <li><span className="font-semibold">Household Items:</span> {visit.houseHoldItems}</li> : <></>}
                    {/* other requests */}
                    <li><span className="font-semibold">Requests:</span> {visit.request}</li>
                </ul>
                <div className='card-actions justify-end my-0 py-0'>
                    <label htmlFor="my-modal" className="btn modal-button btn-ghost">Delete</label>
                    <input type="checkbox" id="my-modal" className="modal-toggle" />
                    <label htmlFor="my-modal" className="modal cursor-pointer">                    
                    <label className="modal-box relative" htmlFor="my-modal">
                        <label htmlFor="my-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <h3 className="text-center text-lg font-bold">Delete this visit?</h3>
                        <div className="modal-action justify-center">
                            <label onClick={()=> {deleteVisit()}} htmlFor="my-modal" className="btn btn-sm btn-warning">DELETE</label>
                        </div>
                    </label>
                    </label>
                </div>
                </div>
            </div>
        </li>
    )
}