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
        <p style={{ color: "#10b981", margin: "5px 0" }}>
          Savings: {formatCurrency(payload[0].value)}
        </p>
        <p style={{ color: "#2563eb", margin: "5px 0" }}>
          Goal: {formatCurrency(payload[1].value)}
        </p>
      </div>
    );
  }

  return null;
};

const SavingsChart = ({ data }) => {
  const theme = useTheme();

  // Add monthly savings goal property to data
  const enhancedData = data.map((item) => ({
    ...item,
    savingsGoal: 2000, // Example monthly savings goal
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={enhancedData}
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
          yAxisId="left"
          tickFormatter={formatCurrency}
          tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
          axisLine={{ stroke: theme.palette.divider }}
          tickLine={{ stroke: theme.palette.divider }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar
          yAxisId="left"
          dataKey="savings"
          name="Monthly Savings"
          fill={theme.palette.secondary.main}
          radius={[4, 4, 0, 0]}
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="savingsGoal"
          name="Savings Goal"
          stroke={theme.palette.primary.main}
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default SavingsChart;
