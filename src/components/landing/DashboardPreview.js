import React from "react";
import { Box, Typography, Grid, Paper, useTheme, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { motion } from "framer-motion";

// Create a mock chart component using pure CSS/SVG
const MockChart = ({ type, color, secondaryColor }) => {
  const theme = useTheme();

  // Area chart for net worth display
  if (type === "area") {
    return (
      <Box sx={{ height: "100%", width: "100%", position: "relative", mt: 2 }}>
        <svg
          width="100%"
          height="60"
          viewBox="0 0 100 20"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.5" />
              <stop offset="100%" stopColor={color} stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path
            d="M0,20 L0,15 C5,13 10,17 15,15 C20,13 25,10 30,11 C35,12 40,16 45,15 C50,14 55,11 60,10 C65,9 70,8 75,7 C80,6 85,4 90,3 C95,2 100,1 100,1 L100,20 Z"
            fill="url(#areaGradient)"
          />
          <path
            d="M0,15 C5,13 10,17 15,15 C20,13 25,10 30,11 C35,12 40,16 45,15 C50,14 55,11 60,10 C65,9 70,8 75,7 C80,6 85,4 90,3 C95,2 100,1 100,1"
            fill="none"
            stroke={color}
            strokeWidth="0.5"
          />
        </svg>
      </Box>
    );
  }

  // Bar chart for expenses
  if (type === "bar") {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          height: 40,
          gap: 1,
          mt: 2,
        }}
      >
        {[65, 40, 85, 60, 75, 50, 90].map((height, i) => (
          <Box
            key={i}
            component={motion.div}
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
            sx={{
              flex: 1,
              backgroundColor: color,
              borderRadius: "3px 3px 0 0",
              opacity: 0.7 + (i % 2) * 0.3, // alternate opacity
            }}
          />
        ))}
      </Box>
    );
  }

  // Pie chart for allocation
  if (type === "pie") {
    return (
      <Box
        sx={{ position: "relative", height: 80, width: 80, mx: "auto", mt: 1 }}
      >
        <svg width="80" height="80" viewBox="0 0 20 20">
          {/* Calculate stroke-dasharray for each segment */}
          <circle
            r="9"
            cx="10"
            cy="10"
            fill="transparent"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="calc(30 * 3.14159 / 100) calc(100 * 3.14159 / 100)"
            transform="rotate(-90) translate(-20)"
          />
          <circle
            r="9"
            cx="10"
            cy="10"
            fill="transparent"
            stroke={secondaryColor || theme.palette.secondary.main}
            strokeWidth="2"
            strokeDasharray="calc(45 * 3.14159 / 100) calc(100 * 3.14159 / 100)"
            transform="rotate(-198) translate(-20)"
          />
          <circle
            r="9"
            cx="10"
            cy="10"
            fill="transparent"
            stroke={theme.palette.warning.main}
            strokeWidth="2"
            strokeDasharray="calc(25 * 3.14159 / 100) calc(100 * 3.14159 / 100)"
            transform="rotate(-90) translate(-20)"
            strokeDashoffset="-calc(30 * 3.14159 / 100)"
          />
        </svg>
      </Box>
    );
  }

  return null;
};

const MetricCard = ({ label, value, trend, positive, color }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: 1.5,
        background:
          theme.palette.mode === "dark"
            ? "rgba(30, 41, 59, 0.7)"
            : "rgba(255, 255, 255, 0.8)",
        borderRadius: 2,
        height: "100%",
      }}
    >
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="subtitle1"
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          {value}
        </Typography>
        {trend && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: positive
                ? theme.palette.success.main
                : theme.palette.error.main,
              typography: "caption",
              fontWeight: "medium",
            }}
          >
            {positive ? (
              <TrendingUpIcon fontSize="inherit" />
            ) : (
              <TrendingDownIcon fontSize="inherit" />
            )}
            {trend}
          </Box>
        )}
      </Box>
    </Box>
  );
};

const DashboardHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  background:
    theme.palette.mode === "dark"
      ? "rgba(15, 23, 42, 0.8)"
      : "rgba(241, 245, 249, 0.9)",
  borderTopLeftRadius: theme.shape.borderRadius,
  borderTopRightRadius: theme.shape.borderRadius,
  display: "flex",
  alignItems: "center",
}));

const DashboardContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  background:
    theme.palette.mode === "dark"
      ? "rgba(30, 41, 59, 0.7)"
      : "rgba(255, 255, 255, 0.8)",
  height: "100%",
}));

const DashboardWidget = ({ title, children, sx }) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        height: "100%",
        backdropFilter: "blur(10px)",
        border: `1px solid ${
          theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, 0.05)"
            : "rgba(0, 0, 0, 0.03)"
        }`,
        ...sx,
      }}
    >
      <DashboardHeader>
        <Typography variant="caption" fontWeight="medium">
          {title}
        </Typography>
      </DashboardHeader>
      <DashboardContent>{children}</DashboardContent>
    </Paper>
  );
};

// Main component for dashboard preview
const DashboardPreview = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        background:
          theme.palette.mode === "dark"
            ? "rgba(15, 23, 42, 0.7)"
            : "rgba(248, 250, 252, 0.8)",
        backdropFilter: "blur(10px)",
        border: `1px solid ${
          theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, 0.05)"
            : "rgba(0, 0, 0, 0.05)"
        }`,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        height: "100%",
        width: "100%",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Dashboard Header */}
      <Box
        sx={{
          p: 2,
          pb: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold">
          Financial Dashboard
        </Typography>
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: "#fff",
            borderRadius: 5,
            px: 1.5,
            py: 0.5,
            fontSize: "0.75rem",
            fontWeight: "bold",
          }}
        >
          Last 12 months
        </Box>
      </Box>

      {/* Dashboard Overview */}
      <Box sx={{ px: 2, pb: 2 }}>
        <Grid container spacing={2}>
          {/* Summary Cards Row */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <MetricCard
                  label="Net Worth"
                  value="₹15,42,800"
                  trend="+5.8%"
                  positive={true}
                  color={theme.palette.primary.main}
                />
              </Grid>
              <Grid item xs={3}>
                <MetricCard
                  label="Income"
                  value="₹1,85,200"
                  trend="+3.2%"
                  positive={true}
                  color={theme.palette.success.main}
                />
              </Grid>
              <Grid item xs={3}>
                <MetricCard
                  label="Expenses"
                  value="₹92,450"
                  trend="+2.1%"
                  positive={false}
                  color={theme.palette.error.main}
                />
              </Grid>
              <Grid item xs={3}>
                <MetricCard
                  label="Investments"
                  value="₹5,78,350"
                  trend="+8.4%"
                  positive={true}
                  color={theme.palette.secondary.main}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Charts Row */}
          <Grid item xs={7}>
            <DashboardWidget title="Net Worth Trend">
              <Box sx={{ pt: 1, pb: 0 }}>
                <Box sx={{ display: "flex", alignItems: "baseline", mb: 1 }}>
                  <Typography variant="h6" component="div" fontWeight="bold">
                    ₹15,42,800
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      ml: 2,
                      color: theme.palette.success.main,
                      typography: "caption",
                    }}
                  >
                    <ArrowUpwardIcon fontSize="inherit" sx={{ mr: 0.5 }} />
                    12.5% from last year
                  </Box>
                </Box>
                <MockChart type="area" color={theme.palette.primary.main} />
              </Box>
            </DashboardWidget>
          </Grid>

          <Grid item xs={5}>
            <Grid container spacing={2} sx={{ height: "100%" }}>
              <Grid item xs={12} sx={{ height: "50%" }}>
                <DashboardWidget title="Monthly Expenses">
                  <MockChart type="bar" color={theme.palette.error.main} />
                </DashboardWidget>
              </Grid>
              <Grid item xs={12} sx={{ height: "50%" }}>
                <DashboardWidget title="Investment Allocation">
                  <MockChart
                    type="pie"
                    color={theme.palette.primary.main}
                    secondaryColor={theme.palette.secondary.main}
                  />
                </DashboardWidget>
              </Grid>
            </Grid>
          </Grid>

          {/* Transactions */}
          <Grid item xs={12}>
            <DashboardWidget title="Recent Transactions">
              <Box sx={{ overflow: "hidden" }}>
                {[
                  {
                    desc: "Amazon.in",
                    category: "Shopping",
                    amount: "-₹3,450",
                    date: "Today",
                  },
                  {
                    desc: "Salary Credit",
                    category: "Income",
                    amount: "+₹75,000",
                    date: "Aug 30",
                    isPositive: true,
                  },
                  {
                    desc: "Grocery Store",
                    category: "Food",
                    amount: "-₹1,850",
                    date: "Aug 28",
                  },
                ].map((tx, i) => (
                  <React.Fragment key={i}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        py: 1,
                      }}
                    >
                      <Box>
                        <Typography variant="body2">{tx.desc}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {tx.date} · {tx.category}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "medium",
                          color: tx.isPositive
                            ? theme.palette.success.main
                            : "inherit",
                        }}
                      >
                        {tx.amount}
                      </Typography>
                    </Box>
                    {i < 2 && <Divider />}
                  </React.Fragment>
                ))}
              </Box>
            </DashboardWidget>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DashboardPreview;
