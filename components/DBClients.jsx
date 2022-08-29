import Loading from "./Loading"
import Client from "./Client"

export default function DBClients({ loading, dbclients }) {
    return (
        <>
            {loading ? 
                <Loading loading={loading} /> 
            : 
                dbclients.map((client) => {
                    return <Client key={client.clientID} client={client} />
                })
            }
        </>
    )
}