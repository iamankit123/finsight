import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import { useTheme } from "@mui/material/styles";
import { formatCurrency } from "../../utils/formatters";

const COLORS = [
  "#2563eb", // primary
  "#10b981", // secondary
  "#ef4444", // error
  "#f59e0b", // warning
  "#3b82f6", // info
  "#8b5cf6", // purple
  "#ec4899", // pink
  "#14b8a6", // teal
];

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
        <p style={{ margin: "5px 0" }}>
          Amount: {formatCurrency(payload[0].value)}
        </p>
        <p style={{ margin: "5px 0" }}>
          Percentage: {payload[0].payload.percentage.toFixed(1)}%
        </p>
      </div>
    );
  }

  return null;
};

const CategoryBreakdownChart = ({ data }) => {
  const theme = useTheme();
  const sortedData = [...data].sort((a, b) => b.amount - a.amount);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        layout="vertical"
        data={sortedData}
        margin={{ top: 10, right: 30, left: 80, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
        <XAxis
          type="number"
          tickFormatter={formatCurrency}
          tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
          axisLine={{ stroke: theme.palette.divider }}
          tickLine={{ stroke: theme.palette.divider }}
        />
        <YAxis
          type="category"
          dataKey="category"
          tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
          axisLine={{ stroke: theme.palette.divider }}
          tickLine={{ stroke: theme.palette.divider }}
          width={80}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
          {sortedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CategoryBreakdownChart;
