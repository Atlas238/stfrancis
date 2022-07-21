export default function Client({ client }) {
    return (
        <div className="card bg-base-100">
            <div className="card-body">
                <h1 className="card-title">{client.firstName} {client.lastName}</h1>
            </div>
        </div>
    ) 
}