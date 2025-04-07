import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useTheme } from "@mui/material/styles";
import { formatCurrency } from "../../utils/formatters";
import { chartCurrencyFormatter } from "../../utils/chartFormatters";

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
        <p style={{ color: "#2563eb", margin: "5px 0" }}>
          Net Worth: {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }

  return null;
};

const NetWorthChart = ({ data }) => {
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
      >
        <defs>
          <linearGradient id="netWorthGradient" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={theme.palette.primary.main}
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor={theme.palette.primary.main}
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
          axisLine={{ stroke: theme.palette.divider }}
          tickLine={{ stroke: theme.palette.divider }}
        />
        <YAxis
          tickFormatter={chartCurrencyFormatter} // Use the safer formatter
          tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
          axisLine={{ stroke: theme.palette.divider }}
          tickLine={{ stroke: theme.palette.divider }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Area
          type="monotone"
          dataKey="netWorth"
          name="Net Worth"
          stroke={theme.palette.primary.main}
          fill="url(#netWorthGradient)"
          strokeWidth={2}
          activeDot={{ r: 6 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default NetWorthChart;
