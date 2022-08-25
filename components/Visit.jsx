export default function Visit({ visit, deleteVisit }) {
    return (
        <div key={visit.visitID} className="card bg-base-100 shadow-md m-2">
            <div className="card-body">
                <h3 className="card-title font-bold underline underline-offset-1">Visit Date: {visit.visitDate?.split("T")[0]}</h3>
                <div className="flex flex-row justify-between">
                <ul className="ml-3">
                    <li><span className="font-semibold">Last Backpack:</span> {visit.lastBackpack?.split("T")[0]}</li>
                    <li><span className="font-semibold">Last Sleeping Bag:</span> {visit.lastSleepingBag?.split("T")[0]}</li>
                    <li><span className="font-semibold">Requests:</span> {visit.request?.split("T")[0]}</li>
                </ul>
                <button id="visitDelete" value={visit.visitID} onClick={deleteVisit} className="btn btn-ghost">Delete</button>
                </div>
            </div>
        </div>
    )
}