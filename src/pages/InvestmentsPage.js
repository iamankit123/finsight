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
  Button,
  Divider,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useFinancialData } from "../context/FinancialDataContext";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

// Chart Components
import InvestmentAllocationChart from "../components/charts/InvestmentAllocationChart";
import InvestmentPerformanceChart from "../components/charts/InvestmentPerformanceChart";
import InvestmentGrowthChart from "../components/charts/InvestmentGrowthChart";

import { formatCurrency, formatPercentage } from "../utils/formatters";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.05)",
  height: "100%",
}));

const InvestmentsPage = () => {
  const { financialData } = useFinancialData();
  const theme = useTheme();
  const [timeRange, setTimeRange] = useState("1y");

  if (!financialData) return null;

  const { investments } = financialData;

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
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Box
        mb={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" component="h1" fontWeight="600">
          Investment Portfolio
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Button variant="contained" color="primary">
            Add Investment
          </Button>
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
              <MenuItem value="5y">5 Years</MenuItem>
              <MenuItem value="all">All Time</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Portfolio Overview */}
        <Grid item xs={12} md={4}>
          <motion.div variants={itemVariants}>
            <StyledPaper>
              <Typography variant="h6" mb={2}>
                Portfolio Summary
              </Typography>
              <Box
                p={2}
                bgcolor={theme.palette.background.default}
                borderRadius={2}
                mb={2}
              >
                <Typography variant="body2" color="text.secondary">
                  Total Portfolio Value
                </Typography>
                <Typography variant="h4" fontWeight="600" mt={1}>
                  {formatCurrency(investments.total)}
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box
                    p={2}
                    bgcolor={theme.palette.background.default}
                    borderRadius={2}
                  >
                    <Typography variant="body2" color="text.secondary">
                      YTD Return
                    </Typography>
                    <Box display="flex" alignItems="center" mt={1}>
                      <Typography variant="h6" fontWeight="600" mr={1}>
                        {formatPercentage(
                          investments.performance[
                            investments.performance.length - 1
                          ].returns
                        )}
                      </Typography>
                      {investments.performance[
                        investments.performance.length - 1
                      ].returns > 0 ? (
                        <TrendingUpIcon color="success" />
                      ) : (
                        <TrendingDownIcon color="error" />
                      )}
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    p={2}
                    bgcolor={theme.palette.background.default}
                    borderRadius={2}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Top Holding
                    </Typography>
                    <Typography variant="h6" fontWeight="600" mt={1}>
                      {
                        investments.holdings.reduce(
                          (max, holding) =>
                            max.value > holding.value ? max : holding,
                          { value: 0 }
                        ).name
                      }
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </StyledPaper>
          </motion.div>
        </Grid>

        {/* Asset Allocation */}
        <Grid item xs={12} md={8}>
          <motion.div variants={itemVariants}>
            <StyledPaper>
              <Typography variant="h6" mb={2}>
                Asset Allocation
              </Typography>
              <Box
                sx={{ height: 300, display: "flex", justifyContent: "center" }}
              >
                <InvestmentAllocationChart data={investments.allocation} />
              </Box>
            </StyledPaper>
          </motion.div>
        </Grid>

        {/* Performance Chart */}
        <Grid item xs={12} lg={8}>
          <motion.div variants={itemVariants}>
            <StyledPaper>
              <Typography variant="h6" mb={2}>
                Investment Performance
              </Typography>
              <Box sx={{ height: 350 }}>
                <InvestmentPerformanceChart
                  data={investments.performance}
                  timeRange={timeRange}
                />
              </Box>
            </StyledPaper>
          </motion.div>
        </Grid>

        {/* Investment Growth */}
        <Grid item xs={12} md={6} lg={4}>
          <motion.div variants={itemVariants}>
            <StyledPaper>
              <Typography variant="h6" mb={2}>
                Investment Growth
              </Typography>
              <Box sx={{ height: 350 }}>
                <InvestmentGrowthChart
                  data={financialData.investments.performance}
                />
              </Box>
            </StyledPaper>
          </motion.div>
        </Grid>

        {/* Holdings Table */}
        <Grid item xs={12}>
          <motion.div variants={itemVariants}>
            <StyledPaper>
              <Typography variant="h6" mb={2}>
                Investment Holdings
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Asset</TableCell>
                      <TableCell align="right">Value</TableCell>
                      <TableCell align="right">Growth</TableCell>
                      <TableCell align="right">Allocation</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {investments.holdings.map((holding, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        hover
                      >
                        <TableCell component="th" scope="row">
                          {holding.name}
                        </TableCell>
                        <TableCell align="right">
                          {formatCurrency(holding.value)}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            color:
                              holding.growth >= 0
                                ? theme.palette.success.main
                                : theme.palette.error.main,
                            fontWeight: 500,
                          }}
                        >
                          {holding.growth > 0 ? "+" : ""}
                          {holding.growth}%
                          {holding.growth >= 0 ? (
                            <TrendingUpIcon
                              fontSize="small"
                              sx={{ ml: 0.5, verticalAlign: "middle" }}
                            />
                          ) : (
                            <TrendingDownIcon
                              fontSize="small"
                              sx={{ ml: 0.5, verticalAlign: "middle" }}
                            />
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {((holding.value / investments.total) * 100).toFixed(
                            1
                          )}
                          %
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

export default InvestmentsPage;
