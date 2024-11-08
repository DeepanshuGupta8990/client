import { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

import { handleLogout } from '../helpers/utils';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA1142'];

interface XHistogramChartProps {
  apiUrl: string;
}

const XHistogramChart: React.FC<XHistogramChartProps> = ({apiUrl}) => {

  const [data, setData ] = useState([]);
  const token = window.localStorage.getItem('token');

  useEffect(
    () => {
      // API call to the server
      axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      }).catch((err) => {
        console.log(err)
        if(err.status == 401) {
          handleLogout();
        }
      });
    },
    []
  );

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />

        <Bar dataKey="count" fill={COLORS[0]} />
        <Bar dataKey="exploit_count" fill={COLORS[1]} />
        <Bar dataKey="patch_count" fill={COLORS[2]} />
        <Bar dataKey="detection_count" fill={COLORS[3]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default XHistogramChart;