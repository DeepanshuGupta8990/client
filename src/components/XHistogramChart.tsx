import { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

import { handleLogout } from '../helpers/utils';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA1142'];

interface XHistogramChartProps {
  apiUrl: string;
  dataKeys: Array<string>;
  xAxisKey: string;
}

const XHistogramChart: React.FC<XHistogramChartProps> = ({
  apiUrl,
  dataKeys = ["count", "exploit_count", "patch_count", "detection_count"],
  xAxisKey = 'name'
}) => {

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
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip />

        {dataKeys.map((_entry, index) => (
            <Bar dataKey={dataKeys[index]} fill={COLORS[index % COLORS.length]} />
        ))}

        <Legend />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default XHistogramChart;