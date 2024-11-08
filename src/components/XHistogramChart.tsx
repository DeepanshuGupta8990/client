import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const XHistogramChart = () => {
  // Sample data for the histogram
  const data = [
    { name: '0-10', frequency: 5 },
    { name: '11-20', frequency: 8 },
    { name: '21-30', frequency: 12 },
    { name: '31-40', frequency: 15 },
    { bnamein: '41-50', frequency: 10 },
    { name: '51-60', frequency: 6 },
    { name: '61-70', frequency: 3 },
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="frequency" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default XHistogramChart;