import StatiticsNumberCard from '../components/statistics/StatisticsNumberCard';
import { useEffect, useState } from 'react';
import StatisticsAreaCard from '../components/statistics/StatisticsAreaCard';

const data = [
    {
        'name': '00:00', 
        'Connexions': 120,
        'Messages': 1400,
    },
    {
        'name': '04:00', 
        'Connexions': 420,
        'Messages': 3950,
    },
    {
        'name': '08:00', 
        'Connexions': 440,
        'Messages': 3950,
    },
    {
        'name': '12:00', 
        'Connexions': 420,
        'Messages': 3950,
    },
    {
        'name': '16:00', 
        'Connexions': 420,
        'Messages': 3950,
    },
    {
        'name': '20:00', 
        'Connexions': 140,
        'Messages': 2340,
    },
    {
        'name': '0:00', 
        'Connexions': 150,
        'Messages': 3950,
    },
];

const StatisticsPage = (props) => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.onresize = () => {
            setWidth(width);
        }
    });

    return (
        <>
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
                    title='Estimate revenue'
                    value={{
                    'actual': 320,
                    'previous': 220,
                    'unit': '$',
                    }}
                />
            </section>
            <section className="app_grid">
                <StatisticsAreaCard data={data} title={'Nombre de connexion'}/>
                <div className='app_stats-double-columns-container'>
                    <div className="app_stats-column-container">
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
                        <StatiticsNumberCard
                            title='Estimate revenue'
                            value={{
                            'actual': 320,
                            'previous': 220,
                            'unit': '$',
                            }}
                        />
                    </div>
                    <StatisticsAreaCard data={data} title={'Nombre de connexion'}/>
                </div>
            </section>
            <section className="app_grid">
                <div className='app_stats-double-columns-container'>
                    <div className="app_stats-column-container">
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
                            title='Estimate revenue'
                            value={{
                            'actual': 320,
                            'previous': 220,
                            'unit': '$',
                            }}
                        />
                    </div>
                    <div className="app_stats-column-container">
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
                        <StatiticsNumberCard
                            title='Estimate revenue'
                            value={{
                            'actual': 320,
                            'previous': 220,
                            'unit': '$',
                            }}
                        />
                    </div>
                </div>
                <StatisticsAreaCard data={data} title={'Nombre de connexion'}/>
            </section>
        </>
    )
}

export default StatisticsPage;