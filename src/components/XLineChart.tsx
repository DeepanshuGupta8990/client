  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
  } from 'recharts';
  import { handleLogout } from '../helpers/utils';

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA1142'];

  interface LineChartProps {
    apiUrl: string;
    dataKeys: Array<string>;
    xAxisKey: string;
    transformData?: (data: any[]) => any[]; // Optional transformer function for data
  }

  const XLineChart: React.FC<LineChartProps> = ({
    apiUrl,
    dataKeys,
    xAxisKey,
    transformData,
  }) => {
    const [data, setData] = useState<any[]>([]);
    const token = window.localStorage.getItem('token');

    useEffect(() => {
      // Fetch data from the API
      axios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          let fetchedData = res.data.reports;

          console.log("fetchedData::", fetchedData);

          // If a transform function is provided, apply it to the data
          if (transformData) {
            fetchedData = transformData(fetchedData);
          }

          setData(fetchedData);
        })
        .catch((err) => {
          console.log(err);
          if (err.response?.status === 401) {
            handleLogout();
          }
        });
    }, [apiUrl, token, transformData]);

    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
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
          {/* Dynamically create Line components based on dataKeys */}
          {dataKeys.map((key, index) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={COLORS[index % COLORS.length]}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    );
  };

  export default XLineChart;
