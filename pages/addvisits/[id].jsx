import { useRouter } from "next/router"
import VisitForm from "components/VisitForm"

export default function AddVisits() {
    const router = useRouter()
    if (!router.isReady) return 

    const { id } = router.query

    return (
        <div className="py-42">
            <VisitForm id={id} />
        </div>
    )
}