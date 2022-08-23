export default function Early({ daysAgo }) {
    return (
        <>
          <h4 className="text-xl text-center font-bold">Early!</h4>
          <p className="text-lg text-center">Last visit was {daysAgo} days ago.</p>
        </>
    )
}