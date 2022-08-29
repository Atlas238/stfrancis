export default function SearchError({ loading }) {
    return (
        <div className={`flex flex-col ${loading ? 'hidden' : 'visible'}`}>
            <h3 className="text-3xl text-center p-4">Whoops!</h3>
            <p className="text-xl">Looks like we couldn't find anyone... Check the information entered and please try again!</p>
        </div>
    )
}