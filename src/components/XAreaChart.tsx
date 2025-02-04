import { useEffect, useState } from 'react';
import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

import { handleLogout } from '../helpers/utils';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA1142'];

interface XHistogramChartProps {
  apiUrl: string;
  dataKeys: Array<string>;
  xAxisKey: string;
}

const XAreaChart: React.FC<XHistogramChartProps> = ({
  apiUrl,
  dataKeys = ["count", "exploit_count", "patch_count", "detection_count"],
  xAxisKey = 'name'
}) => {

  const [data, setData] = useState([]);
  const token = window.localStorage.getItem('token');

  useEffect(
    () => {
      // API call to the server
      axios.request({
        method: "POST",
        url: apiUrl,
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {}
      }).then((res) => {
        console.log(res.data.data);
        setData(res.data.reports);
      }).catch((err) => {
        console.log(err)
        if (err.status == 401) {
          handleLogout();
        }
      });
    },
    []
  );

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >

        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
        <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
        <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" /> */}

        {dataKeys.map((_entry, index) => (
          <Area type="monotone" stackId={1} dataKey={dataKeys[index]} fill={COLORS[index % COLORS.length]} />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default XAreaChart;