import { BallTriangle } from "react-loader-spinner";

export default function Loading({ loading, options }) {
    return (
        <div className={`${loading ? 'visible' : 'hidden'} mx-auto ${options}`}>
            <BallTriangle width={100} height={100} color="#000000" />
        </div>
    )
}