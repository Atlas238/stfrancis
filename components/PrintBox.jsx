export default function PrintBox({ title }) {
    return (
        <div className="p-2">
            <label className="p-4">{title}</label>
            <div className="border border-solid border-black w-10 h-10 p-4 ml-4"></div>
        </div>
    )
}