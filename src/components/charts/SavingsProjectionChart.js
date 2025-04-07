import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceArea,
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
        <p style={{ fontWeight: "bold", marginTop: 0 }}>{`Month ${label}`}</p>
        <p style={{ color: "#2563eb", margin: "5px 0" }}>
          Balance: {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }

  return null;
};

const SavingsProjectionChart = ({
  currentSavings,
  monthlyContribution,
  interestRate,
}) => {
  const theme = useTheme();
  const [projectionData, setProjectionData] = useState([]);
  const years = 5; // Project for 5 years
  const monthsToProject = years * 12;

  useEffect(() => {
    const generateProjection = () => {
      const data = [];
      let balance = currentSavings;
      const monthlyRate = interestRate / 100 / 12;

      for (let i = 0; i <= monthsToProject; i++) {
        data.push({
          month: i,
          balance: Math.round(balance),
        });

        // Calculate next month's balance with compound interest
        balance = balance * (1 + monthlyRate) + monthlyContribution;
      }

      return data;
    };

    setProjectionData(generateProjection());
  }, [currentSavings, monthlyContribution, interestRate]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={projectionData}
        margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
      >
        <defs>
          <linearGradient id="projectionGradient" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={theme.palette.primary.main}
              stopOpacity={0.2}
            />
            <stop
              offset="95%"
              stopColor={theme.palette.primary.main}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
          axisLine={{ stroke: theme.palette.divider }}
          tickLine={{ stroke: theme.palette.divider }}
          tickFormatter={(value) => {
            return value % 12 === 0 ? `${value / 12}y` : "";
          }}
        />
        <YAxis
          tickFormatter={formatCurrency}
          tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
          axisLine={{ stroke: theme.palette.divider }}
          tickLine={{ stroke: theme.palette.divider }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <ReferenceArea
          x1={0}
          x2={monthsToProject}
          fill="url(#projectionGradient)"
        />
        <Line
          type="monotone"
          dataKey="balance"
          name="Projected Savings"
          stroke={theme.palette.primary.main}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SavingsProjectionChart;
