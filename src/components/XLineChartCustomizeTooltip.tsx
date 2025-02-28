import { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Skeleton, Box } from "@mui/material";
import './XCharts.css';
import { handleLogout } from '../helpers/utils';

export const LineChartSkeleton = () => {
    return (
      <Box sx={{ width: "100%", height: 300, display: "flex", flexDirection: "column", justifyContent: "space-between", p: 2 }}>
        {[...Array(5)].map((_, index) => (
          <Skeleton key={index} variant="rectangular" width="100%" height={2} animation="wave" />
        ))}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} variant="circular" width={12} height={12} animation="wave" />
          ))}
        </Box>
      </Box>
    );
  };
  

interface XLineChartProps {
    apiUrl: string;
    convertJsonObject: (data: any) => [];
}

const XLineChartCustomizeTooltip: React.FC<XLineChartProps> = ({ apiUrl, convertJsonObject }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = window.localStorage.getItem('token');

    useEffect(() => {
        setLoading(true);
        axios.request({
            method: "GET",
            url: apiUrl,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            const convObj = convertJsonObject(res.data.reports);
            setData(convObj);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            setLoading(false);
            if (err.status === 401) {
                handleLogout();
            }
        });
    }, [apiUrl, convertJsonObject, token]);

    const CustomTooltip = ({ active, payload, label }:{active?:any, payload?:any, label?:any}) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{`${label} : ${payload[0].value}`}</p>
                    <p className="intro">{`Year : ${payload[0].payload.year}`}</p>
                    {payload[0].payload.title && <p className="intro">{`Title : ${payload[0].payload.title}`}</p>}
                </div>
            );
        }
        return null;
    };

    return (
        <>
            {loading ? (
                <ResponsiveContainer width="60%" height={300} style={{ marginInline: 'auto' }}>
                    <LineChartSkeleton />
                </ResponsiveContainer>
            ) : (
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data} margin={{ top: 20, right: 30, bottom: 5 }}>
                        <XAxis dataKey="name" tick={{ fontSize: 14 }} />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Line type="monotone" dataKey="value" stroke="#0088FE" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </>
    );
};

export default XLineChartCustomizeTooltip;
