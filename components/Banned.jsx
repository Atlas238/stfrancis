export default function Banned({ hidden }) {
    return (
        <h1 className={`${hidden ? 'opacity-0' : 'visible'} font-bold text-center text-lg bg-red-900 text-primary rounded-md px-4`}>BANNED</h1>
    )
}