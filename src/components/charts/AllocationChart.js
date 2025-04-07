import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
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

// Remove the local formatCurrency function

const CustomTooltip = ({ active, payload }) => {
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
        <p style={{ fontWeight: "bold", marginTop: 0 }}>
          {payload[0].name}: {formatCurrency(payload[0].value)}
        </p>
        <p style={{ margin: "5px 0" }}>
          {payload[0].payload.percentage.toFixed(1)}% of total
        </p>
      </div>
    );
  }

  return null;
};

const AllocationChart = ({ data }) => {
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="amount"
          nameKey="type"
          paddingAngle={2}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              stroke={theme.palette.background.paper}
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          layout="vertical"
          verticalAlign="middle"
          align="right"
          iconType="circle"
          iconSize={10}
          formatter={(value, entry, index) => {
            return (
              <span style={{ color: theme.palette.text.primary }}>{value}</span>
            );
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default AllocationChart;
