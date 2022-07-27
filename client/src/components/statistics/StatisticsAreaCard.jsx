import { useEffect, useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const colors = ['#feaaff', '#aeaaff'];

const StatisticsAreaCard = (props) => {
    const dataKeys = Object.keys(props.data[0]).filter(dataKey => {
        return dataKey !== 'name';
    });

    console.log(dataKeys.map((dataKey, index) => {
        console.log(`color${dataKey}`);
        console.log(colors[index]);
    }))

    return (
        <div className="app_card app_card-colored" style={{flex: 1}}>
            <h2>{props.title}</h2>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={props.data}
                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                    <defs>
                        {
                            dataKeys.map((dataKey, index) => {
                                console.log(`color${dataKey}`);
                                console.log(colors[index]);
                                return <>
                                    <linearGradient id={`color${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={colors[index]} stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor={colors[index]} stopOpacity={0}/>
                                    </linearGradient>
                                </>
                            })
                        }
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    {
                        dataKeys.map((dataKey, index) => {
                            return <Area 
                                key={dataKey} 
                                type="monotone" 
                                dataKey={dataKey} 
                                stroke={colors[index]}
                                fillOpacity={1} 
                                fill={`url(#color${dataKey})`}
                            />
                        })
                    }
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default StatisticsAreaCard;