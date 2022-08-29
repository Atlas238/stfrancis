export default function Early({ daysAgo, override, overrideOn }) {
    return (
        <>
          <h4 className="text-xl text-center font-bold">Early! {overrideOn ? <span className="relative left-10 bottom-5 font-light"><button type="button" onClick={override}>x</button></span> : <></>}</h4>
          <p className="text-lg text-center">Last visit was {daysAgo} days ago.</p>
        </>
    )
}