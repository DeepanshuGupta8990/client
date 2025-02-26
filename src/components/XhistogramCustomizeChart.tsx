import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Skeleton, Box } from "@mui/material";
import "./XCharts.css";
import { handleLogout } from "../helpers/utils";

export const BarChartSkeleton = ({ bars = 5 }) => {
  return (
    <Box display="flex" alignItems="flex-end" gap={1} height={200}>
      {[...Array(bars)].map((_, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          width={40}
          height={Math.random() * 150 + 50} // Random height to simulate bar variations
        />
      ))}
    </Box>
  );
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA1142"];

interface XHistogramProps {
  apiUrl: string;
  convertJsonObject: (data: any) => [];
}

const XhistogramCustomizeChart: React.FC<XHistogramProps> = ({ apiUrl, convertJsonObject }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    setLoading(true);
    axios
      .request({
        method: "GET",
        url: apiUrl,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const convObj = convertJsonObject(res.data.reports);
        setData(convObj);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.status === 401) {
          handleLogout();
        }
      });
  }, []);

  const CustomTooltip = (obj: any) => {
    const { active, payload, label } = obj;
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : ${payload[0].value}`}</p>
          <p className="intro">{`Range: ${payload[0].payload.range}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {loading ? (
        <ResponsiveContainer width="60%" height={300} style={{ marginInline: "auto" }}>
          <BarChartSkeleton bars={5} />
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            barSize={30} // Ensure bars are adjacent
            margin={{
              top: 20,
              right: 30,
              bottom: 5,
            }}
          >
            <XAxis dataKey="range" tick={{ fontSize: 14 }} />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />

            <Bar dataKey="frequency">
              {data.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default XhistogramCustomizeChart;
