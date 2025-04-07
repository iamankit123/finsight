import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { useTheme } from "@mui/material/styles";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const isGain = payload[0].value >= 0;
    return (
      <div
        style={{
          backgroundColor: "#fff",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      >
        <p style={{ fontWeight: "bold", marginTop: 0 }}>{label}</p>
        <p
          style={{
            color: isGain ? "#10b981" : "#ef4444",
            margin: "5px 0",
            fontWeight: 500,
          }}
        >
          Performance: {payload[0].value.toFixed(1)}%
        </p>
      </div>
    );
  }

  return null;
};

const InvestmentPerformanceChart = ({ data, timeRange }) => {
  const theme = useTheme();

  // Filter data based on timeRange
  let filteredData = [...data];
  if (timeRange === "1y" && data.length > 1) {
    filteredData = data.slice(data.length - 1);
  } else if (timeRange === "5y" && data.length > 5) {
    filteredData = data.slice(data.length - 5);
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={filteredData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
        <XAxis
          dataKey="year"
          tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
          axisLine={{ stroke: theme.palette.divider }}
          tickLine={{ stroke: theme.palette.divider }}
        />
        <YAxis
          tickFormatter={(value) => `${value.toFixed(1)}%`}
          tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
          axisLine={{ stroke: theme.palette.divider }}
          tickLine={{ stroke: theme.palette.divider }}
        />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={0} stroke={theme.palette.divider} />
        <Bar
          dataKey="returns"
          name="Annual Return"
          radius={[4, 4, 0, 0]}
          fill={(entry) =>
            entry.returns >= 0
              ? theme.palette.success.main
              : theme.palette.error.main
          }
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default InvestmentPerformanceChart;
