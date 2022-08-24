import StatiticsNumberCard from '../components/statistics/StatisticsNumberCard';
import { useEffect, useState } from 'react';
import StatisticsAreaCard from '../components/statistics/StatisticsAreaCard';
import { getStatusCount, getUsersByDate, getVisitDate, getVisitHour, getVisitToday } from '../utils/data_management';

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
    const [statusCount, setStatusCount] = useState(null);
    const [visitToday, setVisitToday] = useState(null);
    const [visitYesterday, setVisitYesterday] = useState(null);
    const [visitHour, setVisitHour] = useState(null);
    const [usersDate, setUsersDate] = useState(null);

    useEffect(() => {
        initStatusCount();
        initVisitToday();
        initVisitHour();
        initUsersDate();
    }, []);

    const initStatusCount = async () => {
        const data = await getStatusCount();
        setStatusCount(data);
    }

    const initVisitToday = async () => {
        const data = await getVisitToday();
        const todayDate = new Date();
        setVisitToday(data);
        // set yesterday date
        const yesterdayDate = todayDate.setDate(todayDate.getDate() - 1);
        const yesterdayData = await getVisitDate(yesterdayDate);
        setVisitYesterday(yesterdayData);
    }

    const initVisitHour = async () => {
        const data = await getVisitHour();
        setVisitHour(
            transformCreationHour(data, 4)
        );
    }

    const initUsersDate = async () => {
        const data = await getUsersByDate();
        console.log(data);
        setUsersDate(
            transformCreationHour(data)
        );
    }

    return (
        <>
            <section className="app_grid">
                {
                    visitHour
                        ? <StatisticsAreaCard data={visitHour} title={'Connexion par heure'}/>
                        : ''
                }
                {
                    usersDate
                        ? <StatisticsAreaCard data={usersDate} title={'Création de compte'}/>
                        : ''
                }
                <div className='app_stats-double-columns-container'>
                    <div className="app_stats-column-container">
                        <StatiticsNumberCard
                            title="Visites aujourd'hui"
                            value={{
                                'actual': visitToday,
                                'previous': visitYesterday,
                                'unit': '',
                            }}
                        />
                    </div>
                    {
                        true ? '' : <StatisticsAreaCard data={data} title={'Nombre de connexion'}/>
                    }
                </div>
            </section>
        </>
    )
}

export default StatisticsPage;

const transformCreationHour = (data, adjuster = 1) => {
    const todayDate = new Date();
    const todayStr = dateToStr(todayDate);

    const hours = [];
    for (let h = 0; h < 24; h++) {
        const hour = {
            'name': `${numberTo10(h)}:00`, 
            "Aujourdhui": 0,
            "Hier": 0,
        };
        
        for (let index in data) {
            const mongoHour = h - 2;
            const singleData = data[index];
            const dataFound = singleData.hours.find(
                (hour) => hour.hour == (mongoHour < 0 ? h + 22 : h - 2)
            );
            if (dataFound) {
                const dataToAdd = Math.floor((dataFound.count ?? 0) / adjuster);
                if (singleData._id === todayStr || mongoHour < 0) {
                    hour["Aujourdhui"] += dataToAdd;
                } else {
                    hour["Hier"] += dataToAdd;
                }
            }
        }

        hours.push(hour);
    }
    return hours;
}

const changeTimeZone = (date, timeZone) => {
    if (typeof date === 'string') {
        return new Date(
            new Date(date).toLocaleString('en-US', {
                timeZone,
            }),
        );
    }
  
    return new Date(
        date.toLocaleString('en-US', {
            timeZone,
        }),
    );
}

const dateToStr = (date) => {
    return `${date.getFullYear()}-${numberTo10(date.getMonth() + 1)}-${numberTo10(date.getDate())}`;
}

const numberTo10 = (nbr) => {
    return nbr < 10 ? `0${nbr}` : nbr;
}