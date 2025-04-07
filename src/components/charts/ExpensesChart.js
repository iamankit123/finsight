import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useTheme } from "@mui/material/styles";
import { formatCurrency } from "../../utils/formatters";

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
        <p style={{ fontWeight: "bold", marginTop: 0 }}>{`Month: ${label}`}</p>
        <p style={{ color: "#ef4444", margin: "5px 0" }}>
          Expenses: {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }

  return null;
};

const ExpensesChart = ({ data }) => {
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
          axisLine={{ stroke: theme.palette.divider }}
          tickLine={{ stroke: theme.palette.divider }}
        />
        <YAxis
          tickFormatter={formatCurrency}
          tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
          axisLine={{ stroke: theme.palette.divider }}
          tickLine={{ stroke: theme.palette.divider }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar
          dataKey="expenses"
          name="Expenses"
          fill={theme.palette.error.main}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ExpensesChart;
