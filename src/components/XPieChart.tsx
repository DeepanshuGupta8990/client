import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

import { handleLogout } from '../helpers/utils';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA1142'];

interface XPieChartProps {
    apiUrl: string;
    convertJsonObject: (data: any) => []
}

const XPieChart: React.FC<XPieChartProps> = ({ apiUrl, convertJsonObject }) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const token = window.localStorage.getItem('token');

    useEffect(
        () => {
            // API call to the server
            axios.request({
                method: "GET",
                url: apiUrl,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                const convObj = convertJsonObject(res.data.reports);
                setData(convObj);
            }).catch((err) => {
                console.log(err)
                if (err.status == 401) {
                    handleLogout();
                } else if (err.status == 429) {
                    navigate("/error");
                }
            });
        },
        []
    );

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = (obj: any) => {
        const { cx, cy, midAngle, innerRadius, outerRadius, percent } = obj;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const CustomTooltip = (obj: any) => {
        const { active, payload } = obj;
        if (active && payload && payload.length) {
            console.log(JSON.stringify(payload));
            return (
                <div className="custom-tooltip">
                    <p className="label">{`${payload[0].name} : ${payload[0].value}`}</p>
                    {payload[0].payload.year ?
                        <p className="intro">{`Year : ${payload[0].payload.year}`}</p>
                        : null}
                    {payload[0].payload.title ?
                        <p className="intro">{`${payload[0].payload.title}`}</p>
                        : null}
                </div>
            );
        }

        return null;
    };

    return (
        <ResponsiveContainer width="100%" height={400}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="count"
                >
                    {data.map((_entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default XPieChart;