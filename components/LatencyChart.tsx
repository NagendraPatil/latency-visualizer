"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type LatencyPoint = {
  timestamp: number;
  latency: number;
};

type Props = {
  server: string;
};

const LatencyChart = ({ server }: Props) => {
  const [data, setData] = useState<LatencyPoint[]>([]);
  const [range, setRange] = useState("1h");

  // Fetch latency data for selected server and range
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `/api/latency-history?range=${range}&server=${server}`
        );
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Failed to fetch latency data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // Refresh every minute

    return () => clearInterval(interval);
  }, [range, server]);

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-md w-full h-80 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-lg font-semibold">
          Historical Latency Trends
        </h2>
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="bg-gray-700 text-white rounded px-2 py-1 focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="1h">Last 1 Hour</option>
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
        </select>
      </div>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(tick) =>
                new Date(tick).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }
              stroke="#ccc"
              tick={{ fontSize: 12 }}
            />
            <YAxis
              stroke="#ccc"
              tick={{ fontSize: 12 }}
              domain={["auto", "auto"]}
              label={{
                value: "Latency (ms)",
                angle: -90,
                position: "insideLeft",
                fill: "#ccc",
              }}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#333", borderRadius: "6px" }}
              labelFormatter={(label) =>
                new Date(label).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }
              formatter={(value: number) => [`${value} ms`, "Latency"]}
            />
            <Line
              type="monotone"
              dataKey="latency"
              stroke="#00d8ff"
              strokeWidth={2}
              dot={{ r: 3, stroke: "#00d8ff", strokeWidth: 1, fill: "#fff" }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          No data available for this range.
        </div>
      )}
    </div>
  );
};

export default LatencyChart;
