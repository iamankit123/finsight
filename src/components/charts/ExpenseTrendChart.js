import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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
        <p style={{ fontWeight: "bold", marginTop: 0 }}>{`Month: ${label}`}</p>
        <p style={{ color: "#ef4444", margin: "5px 0" }}>
          Expenses: {formatCurrency(payload[0].value)}
        </p>
        <p style={{ color: "#10b981", margin: "5px 0" }}>
          3-month Moving Avg: {formatCurrency(payload[1].value)}
        </p>
      </div>
    );
  }

  return null;
};

const ExpenseTrendChart = ({ data }) => {
  const theme = useTheme();

  // Calculate 3-month moving average
  const dataWithMovingAvg = data.map((item, index, array) => {
    let movingAvg = item.expenses;
    if (index > 0 && index < array.length - 1) {
      movingAvg =
        (array[index - 1].expenses +
          item.expenses +
          array[index + 1].expenses) /
        3;
    } else if (index === 0 && array.length > 1) {
      movingAvg = (item.expenses + array[index + 1].expenses) / 2;
    } else if (index === array.length - 1 && array.length > 1) {
      movingAvg = (array[index - 1].expenses + item.expenses) / 2;
    }
    return {
      ...item,
      movingAvg: Math.round(movingAvg),
    };
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={dataWithMovingAvg}
        margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
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
        <Line
          type="monotone"
          dataKey="expenses"
          name="Monthly Expenses"
          stroke={theme.palette.error.main}
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="movingAvg"
          name="3-Month Moving Avg"
          stroke={theme.palette.secondary.main}
          strokeWidth={2}
          dot={false}
          strokeDasharray="5 5"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ExpenseTrendChart;
