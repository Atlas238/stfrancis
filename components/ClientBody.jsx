export default function ClientBody({ client, mapped, view, checkedIn, handleCheckin, handleCheckout, goToProfile }) {
    return (
        <>
            <p>Allowed this vist:</p>
            <ul>
                {mapped}
            </ul>
            {/* dont render if nothing here? */}
            <label>Client Notes:</label>
            <p>{client?.clientNote ? client?.clientNote : "Looks like there's nothing here..."}</p>

            <label>Last Visit Notes:</label>
            {/* IF THIS REQUEST IS THE WORD NONE DONT RENDER */}
            <p>{client?.visits ? client?.visits[0].request : ""}</p>
            <div className="card-actions justify-end">
                { view === 0 || checkedIn === true 
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