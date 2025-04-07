import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";
import { useTheme } from "@mui/material/styles";
import { formatCurrency } from "../../utils/formatters";

// Remove the local formatCurrency function

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const isExceeded = payload[0].value > payload[1].value;
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
        <p
          style={{ color: isExceeded ? "#ef4444" : "#10b981", margin: "5px 0" }}
        >
          Expenses: {formatCurrency(payload[0].value)}
        </p>
        <p style={{ color: "#6B7280", margin: "5px 0" }}>
          Threshold: {formatCurrency(payload[1].value)}
        </p>
        {isExceeded && (
          <p style={{ color: "#ef4444", fontWeight: "bold", margin: "5px 0" }}>
            Exceeds threshold by{" "}
            {formatCurrency(payload[0].value - payload[1].value)}
          </p>
        )}
      </div>
    );
  }

  return null;
};

const MonthlyExpensesChart = ({ data }) => {
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={data}
        margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
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
          dataKey="amount"
          name="Expenses"
          fill={({ amount, threshold }) =>
            amount > threshold
              ? theme.palette.error.main
              : theme.palette.primary.main
          }
          radius={[4, 4, 0, 0]}
          fillOpacity={0.8}
        />
        <Line
          type="monotone"
          dataKey="threshold"
          name="Threshold"
          stroke={theme.palette.warning.main}
          strokeWidth={2}
          dot={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default MonthlyExpensesChart;
