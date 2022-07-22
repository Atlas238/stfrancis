export default function Client({ client }) {
    return (
        <div className="card bg-base-200 max-w-md p-3 m-3">
            <div className="card-body">
                <h1 className="card-title mx-auto text-2xl">{client?.firstName} {client?.lastName}</h1>
                <div className="card-actions justify-end">
                    <button className="btn btn-accent btn-sm">Check Out</button>
                </div>
            </div>
        </div>
    ) 
}