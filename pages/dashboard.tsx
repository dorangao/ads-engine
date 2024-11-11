import { useEffect, useState } from "react";

interface AnalyticsData {
    adId: number;
    adTitle: string;
    impressions: number;
    clicks: number;
    ctr: string;
}

export default function Dashboard() {
    const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0]);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`/api/analytics/ctr?date=${selectedDate}`);
            const data = await res.json();
            setAnalyticsData(data);
        }

        fetchData();
    }, [selectedDate]);

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };

    return (
        <div>
            <h1>Ad Performance Dashboard</h1>

            <label htmlFor="date">Select Date: </label>
            <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={handleDateChange}
            />

            <table>
                <thead>
                <tr>
                    <th>Ad Title</th>
                    <th>Impressions</th>
                    <th>Clicks</th>
                    <th>CTR (%)</th>
                </tr>
                </thead>
                <tbody>
                {analyticsData.map((data) => (
                    <tr key={data.adId}>
                        <td>{data.adTitle}</td>
                        <td>{data.impressions}</td>
                        <td>{data.clicks}</td>
                        <td>{data.ctr}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}