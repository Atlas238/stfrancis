import FullClient from "components/FullClient"

const tempData = {
    clientID: 34,
    lastName: "Hendrickson",
    firstName: "Celestina",
    middleInitial: "T",
    birthday: "6/15/1982 12:00:00 AM",
    zipCode: 98033,
    race: "Caucasian",
    gender: 'F',
    visits: [
        {
            visitID: 4,
            clientID: 34,
            visitDate: "0001-01-01T00:00:00",
            lastBackpack: "0001-01-01T00:00:00",
            lastSleepingBag: "0001-01-01T00:00:00",
            requests: "0001-01-01T00:00:00"
        },
        {
            visitID: 14,
            clientID: 34,
            visitDate: "2022-05-23T00:00:00",
            lastBackpack: "0001-01-01T00:00:00",
            lastSleepingBag: "0001-01-01T00:00:00",
            requests: "0001-01-01T00:00:00"
        }
    ]
}

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