import { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

import { handleLogout } from '../helpers/utils';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA1142'];

interface XPieChartProps {
  apiUrl: string;
  convertJsonObject: (data: any) => []
}

const XPieChart: React.FC<XPieChartProps> = ({apiUrl, convertJsonObject}) => {
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
        const convObj = convertJsonObject(res.data.data);
        setData(convObj);
      }).catch((err) => {
        console.log(err)
        if(err.status == 401) {
          handleLogout();
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
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default XPieChart;