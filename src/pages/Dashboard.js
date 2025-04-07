import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  CardContent,
  Divider,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { useFinancialData } from "../context/FinancialDataContext";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SavingsIcon from "@mui/icons-material/Savings";
import PaymentsIcon from "@mui/icons-material/Payments";

// Import the styled components
import { StyledPaper, StyledCard } from "../components/common/StyledComponents";
import { styled } from "@mui/material/styles";

// Chart Components
import NetWorthChart from "../components/charts/NetWorthChart";
import ExpensesChart from "../components/charts/ExpensesChart";
import AllocationChart from "../components/charts/AllocationChart";
import SavingsChart from "../components/charts/SavingsChart";
import SpendingByCategoryChart from "../components/charts/SpendingByCategoryChart";

import { formatCurrency } from "../utils/formatters";

// Remove the existing StyledPaper and StyledCard definitions
// And keep the StyledIconBox that's not in the common components

const StyledIconBox = styled(Box)(({ theme, bgcolor }) => ({
  backgroundColor: bgcolor,
  width: 56,
  height: 56,
  borderRadius: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 6px 10px rgba(0, 0, 0, 0.08)",
}));

const Dashboard = () => {
  const { financialData } = useFinancialData();
  const [timeRange, setTimeRange] = useState("1y");
  const theme = useTheme();

  if (!financialData) return null;

  const { summary, monthlyData } = financialData;

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="dashboard-container"
    >
      <Box
        mb={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" component="h1" fontWeight="600">
          Financial Dashboard
        </Typography>
        <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Time Range</InputLabel>
          <Select
            value={timeRange}
            onChange={handleTimeRangeChange}
            label="Time Range"
          >
            <MenuItem value="1m">1 Month</MenuItem>
            <MenuItem value="3m">3 Months</MenuItem>
            <MenuItem value="6m">6 Months</MenuItem>
            <MenuItem value="1y">1 Year</MenuItem>
            <MenuItem value="all">All Time</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={3}>
          <motion.div variants={itemVariants}>
            <StyledCard>
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <StyledIconBox bgcolor={`${theme.palette.primary.main}15`}>
                    <AccountBalanceWalletIcon
                      color="primary"
                      fontSize="medium"
                    />
                  </StyledIconBox>
                  <TrendingUpIcon color="success" />
                </Box>
                <Typography variant="h6" fontWeight="500">
                  Net Worth
                </Typography>
                <Typography variant="h4" fontWeight="700" mt={1}>
                  {formatCurrency(summary.netWorth)}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  5.8% increase this month
                </Typography>
              </CardContent>
            </StyledCard>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={3}>
          <motion.div variants={itemVariants}>
            <StyledCard>
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <StyledIconBox bgcolor={`${theme.palette.error.main}15`}>
                    <PaymentsIcon color="error" fontSize="medium" />
                  </StyledIconBox>
                  <TrendingUpIcon color="error" />
                </Box>
                <Typography variant="h6" fontWeight="500">
                  Total Expenses
                </Typography>
                <Typography variant="h4" fontWeight="700" mt={1}>
                  {formatCurrency(summary.totalExpenses)}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  3.2% increase this month
                </Typography>
              </CardContent>
            </StyledCard>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={3}>
          <motion.div variants={itemVariants}>
            <StyledCard>
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <StyledIconBox bgcolor={`${theme.palette.secondary.main}15`}>
                    <SavingsIcon color="secondary" fontSize="medium" />
                  </StyledIconBox>
                  <TrendingUpIcon color="success" />
                </Box>
                <Typography variant="h6" fontWeight="500">
                  Savings
                </Typography>
                <Typography variant="h4" fontWeight="700" mt={1}>
                  {formatCurrency(summary.totalSavings)}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  2.5% increase this month
                </Typography>
              </CardContent>
            </StyledCard>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={3}>
          <motion.div variants={itemVariants}>
            <StyledCard>
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <StyledIconBox bgcolor={`${theme.palette.info.main}15`}>
                    <TrendingUpIcon color="info" fontSize="medium" />
                  </StyledIconBox>
                  <TrendingDownIcon color="error" />
                </Box>
                <Typography variant="h6" fontWeight="500">
                  Investments
                </Typography>
                <Typography variant="h4" fontWeight="700" mt={1}>
                  {formatCurrency(summary.totalInvestments)}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  1.5% decrease this month
                </Typography>
              </CardContent>
            </StyledCard>
          </motion.div>
        </Grid>

        {/* Net Worth Chart */}
        <Grid item xs={12} lg={8}>
          <motion.div variants={itemVariants}>
            <StyledPaper>
              <Typography variant="h6" mb={2}>
                Net Worth Trend
              </Typography>
              <Box sx={{ height: 360 }}>
                <NetWorthChart data={monthlyData} />
              </Box>
            </StyledPaper>
          </motion.div>
        </Grid>

        {/* Expense Categories */}
        <Grid item xs={12} md={6} lg={4}>
          <motion.div variants={itemVariants}>
            <StyledPaper>
              <Typography variant="h6" mb={2}>
                Spending by Category
              </Typography>
              <Box
                sx={{
                  height: 360,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SpendingByCategoryChart
                  data={financialData.expenses.categories}
                />
              </Box>
            </StyledPaper>
          </motion.div>
        </Grid>

        {/* Monthly Income vs Expense */}
        <Grid item xs={12} md={6}>
          <motion.div variants={itemVariants}>
            <StyledPaper>
              <Typography variant="h6" mb={2}>
                Monthly Expenses
              </Typography>
              <Box sx={{ height: 300 }}>
                <ExpensesChart data={monthlyData} />
              </Box>
            </StyledPaper>
          </motion.div>
        </Grid>

        {/* Investment Allocation */}
        <Grid item xs={12} md={6}>
          <motion.div variants={itemVariants}>
            <StyledPaper>
              <Typography variant="h6" mb={2}>
                Investment Allocation
              </Typography>
              <Box
                sx={{ height: 300, display: "flex", justifyContent: "center" }}
              >
                <AllocationChart data={financialData.investments.allocation} />
              </Box>
            </StyledPaper>
          </motion.div>
        </Grid>

        {/* Recent Transactions */}
        <Grid item xs={12}>
          <motion.div variants={itemVariants}>
            <StyledPaper>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="h6">Recent Transactions</Typography>
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{ cursor: "pointer" }}
                >
                  See All
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                {financialData.transactions
                  .slice(0, 5)
                  .map((transaction, index) => (
                    <Grid item xs={12} key={index}>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        py={1}
                      >
                        <Box>
                          <Typography variant="body1" fontWeight="500">
                            {transaction.description}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {transaction.date} • {transaction.category}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body1"
                          fontWeight="600"
                          color={
                            transaction.amount > 0
                              ? "success.main"
                              : "text.primary"
                          }
                        >
                          {formatCurrency(transaction.amount)}
                        </Typography>
                      </Box>
                      {index < 4 && <Divider sx={{ my: 1 }} />}
                    </Grid>
                  ))}
              </Grid>
            </StyledPaper>
          </motion.div>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default Dashboard;
