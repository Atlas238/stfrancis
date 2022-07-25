import FullClient from "components/FullClient"

export default function profile({ data }) {
    return (
        <div>
            <FullClient client={data} />
        </div>
    )
}

export async function getServerSideProps(context) {
    let id = context.params.id

    const res = await fetch(`https://stfrancisone.herokuapp.com/home/getClientVisits?clientID=${id}`)
    const data = await res.json()

    return { props: { data } }
}