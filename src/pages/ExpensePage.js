import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Slider,
  TextField,
  Button,
  Divider,
  Chip,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useFinancialData } from "../context/FinancialDataContext";
import { formatCurrency } from "../utils/formatters";

// Chart Components
import MonthlyExpensesChart from "../components/charts/MonthlyExpensesChart";
import CategoryBreakdownChart from "../components/charts/CategoryBreakdownChart";
import ExpenseTrendChart from "../components/charts/ExpenseTrendChart";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.05)",
  height: "100%",
}));

const ExpensePage = () => {
  const { financialData } = useFinancialData();
  const theme = useTheme();
  const [timeRange, setTimeRange] = useState("1y");
  const [thresholdValue, setThresholdValue] = useState(4000);

  if (!financialData) return null;

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  const handleThresholdChange = (event, newValue) => {
    setThresholdValue(newValue);
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

  // Update monthly data with threshold for chart
  const monthlyDataWithThreshold = financialData.expenses.monthly.map(
    (item) => ({
      ...item,
      threshold: thresholdValue,
      isExceeded: item.amount > thresholdValue,
    })
  );

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Box
        mb={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" component="h1" fontWeight="600">
          Expense Analysis
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
        {/* Overview Section */}
        <Grid item xs={12} lg={4}>
          <motion.div variants={itemVariants}>
            <StyledPaper>
              <Typography variant="h6" mb={2}>
                Expense Summary
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box
                    p={2}
                    bgcolor={theme.palette.background.default}
                    borderRadius={2}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Total Expenses (
                      {timeRange === "1y" ? "Last 12 months" : timeRange})
                    </Typography>
                    <Typography variant="h4" fontWeight="600" mt={1}>
                      {formatCurrency(financialData.summary.totalExpenses)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    p={2}
                    bgcolor={theme.palette.background.default}
                    borderRadius={2}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Average Monthly
                    </Typography>
                    <Typography variant="h6" fontWeight="600" mt={1}>
                      {formatCurrency(financialData.summary.totalExpenses / 12)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    p={2}
                    bgcolor={theme.palette.background.default}
                    borderRadius={2}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Highest Month
                    </Typography>
                    <Typography variant="h6" fontWeight="600" mt={1}>
                      {formatCurrency(
                        Math.max(
                          ...financialData.expenses.monthly.map((m) => m.amount)
                        )
                      )}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box mt={4}>
                <Typography variant="h6" mb={2}>
                  Monthly Threshold
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Set a spending limit to monitor your expenses
                </Typography>
                <Slider
                  value={thresholdValue}
                  onChange={handleThresholdChange}
                  aria-labelledby="threshold-slider"
                  min={1000}
                  max={10000}
                  step={100}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `₹${value}`}
                  sx={{ mb: 2 }}
                />
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="body1" fontWeight="600">
                    Current Threshold: {formatCurrency(thresholdValue)}
                  </Typography>
                  <Button variant="contained" size="small">
                    Set
                  </Button>
                </Box>
              </Box>
            </StyledPaper>
          </motion.div>
        </Grid>

        {/* Monthly Expenses Chart */}
        <Grid item xs={12} lg={8}>
          <motion.div variants={itemVariants}>
            <StyledPaper>
              <Typography variant="h6" mb={2}>
                Monthly Expenses vs Threshold
              </Typography>
              <Box sx={{ height: 350 }}>
                <MonthlyExpensesChart data={monthlyDataWithThreshold} />
              </Box>
            </StyledPaper>
          </motion.div>
        </Grid>

        {/* Category Breakdown */}
        <Grid item xs={12} md={5}>
          <motion.div variants={itemVariants}>
            <StyledPaper>
              <Typography variant="h6" mb={2}>
                Expense Categories
              </Typography>
              <Box
                sx={{ height: 340, display: "flex", justifyContent: "center" }}
              >
                <CategoryBreakdownChart
                  data={financialData.expenses.categories}
                />
              </Box>
            </StyledPaper>
          </motion.div>
        </Grid>

        {/* Expense Trend */}
        <Grid item xs={12} md={7}>
          <motion.div variants={itemVariants}>
            <StyledPaper>
              <Typography variant="h6" mb={2}>
                Expense Trends Over Time
              </Typography>
              <Box sx={{ height: 340 }}>
                <ExpenseTrendChart data={financialData.monthlyData} />
              </Box>
            </StyledPaper>
          </motion.div>
        </Grid>

        {/* Expense Details */}
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
                <TextField
                  placeholder="Search expenses..."
                  variant="outlined"
                  size="small"
                  sx={{ width: 250 }}
                />
              </Box>
              <TableContainer sx={{ maxHeight: 400 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell align="right">Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {financialData.expenses.details.map((expense, index) => (
                      <TableRow key={index} hover>
                        <TableCell>{expense.date}</TableCell>
                        <TableCell>{expense.description}</TableCell>
                        <TableCell>
                          <Chip
                            label={expense.category}
                            size="small"
                            sx={{
                              backgroundColor:
                                expense.category === "Housing"
                                  ? `${theme.palette.primary.main}20`
                                  : expense.category === "Food"
                                  ? `${theme.palette.secondary.main}20`
                                  : expense.category === "Transportation"
                                  ? `${theme.palette.error.main}20`
                                  : expense.category === "Entertainment"
                                  ? `${theme.palette.warning.main}20`
                                  : `${theme.palette.info.main}20`,
                              color:
                                expense.category === "Housing"
                                  ? theme.palette.primary.main
                                  : expense.category === "Food"
                                  ? theme.palette.secondary.main
                                  : expense.category === "Transportation"
                                  ? theme.palette.error.main
                                  : expense.category === "Entertainment"
                                  ? theme.palette.warning.main
                                  : theme.palette.info.main,
                              fontWeight: 500,
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          {formatCurrency(expense.amount)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </StyledPaper>
          </motion.div>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default ExpensePage;
