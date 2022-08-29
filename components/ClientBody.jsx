export default function ClientBody({ client, view, checkedIn, handleCheckin, handleCheckout, goToProfile }) {
    return (
        <>
            {client.eligibleItems?.length > 0 ? 
            <div>
            <p className="font-semibold">Allowed this visit: </p>
            <ul className="flex">
                {client.eligibleItems.map((item) => {
                    return <li className="p-2" key={item}>{item}</li>
                })}
            </ul>
            </div>
            : 
            <>
            <p className="font-semibold">No Backpack or Sleeping Bag</p>
            </>
            }

            {client.clientNote === 'none' ? null : <><label className="font-semibold">Client Note:</label><p className="text-center">{client.clientNote}</p></> }

            {(client.visits === null || client.visits[0]?.request === 'none') ? null : <><label className="font-semibold">Last Visit Notes: </label><p className="text-center">{client.visits[0]?.request}</p></>}

            <div className="card-actions justify-end">
                { view === 0 || checkedIn === true || client.isEarly === true
                    ? <></> 
                    : view === 1 && client?.banned === false 
                    ? <button className="btn btn-accent btn-sm" onClick={handleCheckin}>Check In</button> 
                    : view === 2 && client?.banned === false
                    ? <button className="btn btn-secondary btn-sm" onClick={handleCheckout}>Check Out</button> 
                    : <></>}
                    <button className="btn btn-primary btn-sm" onClick={goToProfile}>Profile</button>
                </div>
        </>
    )
}