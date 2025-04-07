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
import { formatCurrency } from "../../utils/formatters";

// Remove the local formatCurrency function

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
        <p style={{ color: "#10b981", margin: "5px 0" }}>
          Savings: {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }

  return null;
};

const SavingsGrowthChart = ({ data }) => {
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={theme.palette.secondary.main}
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor={theme.palette.secondary.main}
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="year"
          tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
          axisLine={{ stroke: theme.palette.divider }}
          tickLine={{ stroke: theme.palette.divider }}
        />
        <YAxis hide domain={["dataMin", "dataMax"]} />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="amount"
          stroke={theme.palette.secondary.main}
          fillOpacity={1}
          fill="url(#savingsGradient)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SavingsGrowthChart;
