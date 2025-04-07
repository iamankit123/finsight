import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useTheme } from "@mui/material/styles";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
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
        <p style={{ color: "#10b981", margin: "5px 0", fontWeight: 500 }}>
          Growth: {payload[0].value.toFixed(1)}%
        </p>
      </div>
    );
  }

  return null;
};

const InvestmentGrowthChart = ({ data }) => {
  const theme = useTheme();

  // Calculate cumulative growth
  const cumulativeData = data.map((item, index, arr) => {
    let cumulativeGrowth = 100;
    if (index > 0) {
      cumulativeGrowth = arr
        .slice(0, index + 1)
        .reduce((acc, curr) => acc * (1 + curr.returns / 100), 100);
    }
    return {
      year: item.year,
      growth: cumulativeGrowth - 100, // Convert to percentage growth
    };
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={cumulativeData}
        margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
      >
        <defs>
          <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={theme.palette.success.main}
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor={theme.palette.success.main}
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
        <XAxis
          dataKey="year"
          tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
          axisLine={{ stroke: theme.palette.divider }}
          tickLine={{ stroke: theme.palette.divider }}
        />
        <YAxis
          tickFormatter={(value) => `${value.toFixed(0)}%`}
          domain={["dataMin", "dataMax"]}
          tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
          axisLine={{ stroke: theme.palette.divider }}
          tickLine={{ stroke: theme.palette.divider }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="growth"
          stroke={theme.palette.success.main}
          fillOpacity={1}
          fill="url(#growthGradient)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default InvestmentGrowthChart;
