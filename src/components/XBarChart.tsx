import { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

import './XCharts.css'
import { handleLogout } from '../helpers/utils';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA1142'];

interface XBarChartProps {
  apiUrl: string;
  convertJsonObject: (data: any) => []
}

const XBarChart: React.FC<XBarChartProps> = ({apiUrl, convertJsonObject}) => {

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

  const CustomTooltip = (obj: any) => {
    const { active, payload, label } = obj;
    if (active && payload && payload.length) {
        // console.log(JSON.stringify(payload));
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : ${payload[0].value}`}</p>
          <p className="intro">{`Year : ${payload[0].payload.year}`}</p>
          {payload[0].payload.title ?
          <p className="intro">{`Title : ${payload[0].payload.title}`}</p>
          : null}
        </div>
      );
    }
  
    return null;
  };


  return (
    <ResponsiveContainer width="100%" height={400}>
    <BarChart
      data={data}
      maxBarSize={20}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      {/* <Legend /> */}

      <Bar dataKey="value">
        {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
    </Bar>
    </BarChart>
  </ResponsiveContainer>
  );
};

export default XBarChart;