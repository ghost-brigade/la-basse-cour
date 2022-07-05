import StatiticsNumberCard from '../components/statistics/StatisticsNumberCard';

const StatisticsPage = (props) => {
    return (
        <section className="app_grid">
            <StatiticsNumberCard
                title='Views'
                value={{
                'actual': 276.5,
                'previous': 240,
                'unit': 'K',
                }}
            />
            <StatiticsNumberCard
                title='Watch time'
                value={{
                'actual': 4.2,
                'previous': 4.1,
                'unit': ' hours',
                }}
            />
            <StatiticsNumberCard
                title='Subscribers'
                value={{
                'actual': 8.2,
                'previous': 8.4,
                'unit': 'K',
                }}
            />
            <StatiticsNumberCard
                title='Estimate revenue'
                value={{
                'actual': 320,
                'previous': 220,
                'unit': '$',
                }}
            />
        </section>
    )
}

export default StatisticsPage;