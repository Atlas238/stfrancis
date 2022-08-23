import { useEffect, useState } from "react"

export default function stats() {
    // Todays Date for future use...
    const [today, setToday] = useState(null)
    const [monthPrior, setMonthPrior] = useState(null)
    const [yearPrior, setYearPrior] = useState(null)

    const [statsData, setStatsData] = useState(null)

    const subtractMonths = (numMonths, date) => {
        date.setMonth(date.getMonth() - numMonths)

        return date
    }

    useEffect(() => {
        // Get all Dates set
        let dateToday = new Date(Date.now())
        setToday(dateToday)
        setMonthPrior(subtractMonths(1, dateToday))
        setYearPrior(subtractMonths(12, dateToday))
    },[])

    // Update with routes
    const getSummaryStats = async () => {
        // Fetch Total Clients Served in the last month
        let totalClientsResponse = await fetch()
        let totalClientsData = await totalClientsResponse.json()

        // Fetch Total New Clients in the last month
        let newClientsResponse = await fetch()
        let newClientsData = await newClientsResponse.json()

        // Fetch Total Visits in the last month
        let totalVisitResponse = await fetch()
        let totalVisitData = await totalVisitResponse.json()

        // Fetch Total FAMILIES served in the last month
            // count of clients with family size > 0 + lastVisitDate sooner than 30Days before today
        let totalFamiliesResponse = await fetch()
        let totalFamiliesData = await totalFamiliesResponse.json()

        // Demographics of Clients Served in the last month
        let clientsServedByDemoResponse = await fetch()
        let clientsServedByDemoData = await clientsServedByDemoResponse.json()


        setStatsData({
            totalClients: totalClientsData,
            newClients: newClientsData,
            totalVisits: totalVisitData,
            totalFamilies: totalFamiliesData,
            demographics: clientsServedByDemoData
        })
    }

    return (
        <div>
            {/* Summary Stats - Total Clients Serviced (Last Month)*/}
            <div class="stats shadow">
                <div class="stat">
                    <div class="stat-figure text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    </div>
                    <div class="stat-title">Total Clients Served</div>
                    <div class="stat-value text-primary">25.6K</div>
                    <div class="stat-desc">21% more than last month</div>
                </div>
  
                <div class="stat">
                    <div class="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <div class="stat-title">New Clients</div>
                    <div class="stat-value text-secondary">2.6M</div>
                    <div class="stat-desc">21% more than last month</div>
                </div>
  
            </div>
        </div>
    )
}