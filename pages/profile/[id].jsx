import FullClient from "components/FullClient"

// Client Profile Page - Offloads client data to FullClient Component
export default function profile({ data }) {
    console.log(data)
    return (
        <div className="py-20">
            <FullClient client={data} />
        </div>
    )
}

// Fetches client data - All Visits right now
export async function getServerSideProps(context) {
    let id = context.params.id
    let regex = new RegExp(/\d+/g)
    if (id.match(regex)) {
        
        const res = await fetch(`https://stfrancisone.herokuapp.com/home/getClientVisits?clientID=${id}`)
        const data = await res.json()

        return { props: { data } }
    }

    return { props: { undefined }}
}