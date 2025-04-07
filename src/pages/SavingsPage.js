import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  LinearProgress,
  Card,
  CardContent,
  Divider,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  useTheme,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useFinancialData } from "../context/FinancialDataContext";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";

// Chart Components
import SavingsGrowthChart from "../components/charts/SavingsGrowthChart";
import SavingsProjectionChart from "../components/charts/SavingsProjectionChart";
import { formatCurrency } from "../utils/formatters";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.05)",
  height: "100%",
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 1.5,
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.05)",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  height: "100%",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 12px 20px rgba(0, 0, 0, 0.08)",
  },
}));

const StyledLinearProgress = styled(LinearProgress)(({ theme, value }) => ({
  height: 8,
  borderRadius: 5,
  backgroundColor:
    value < 25
      ? `${theme.palette.error.light}40`
      : value < 50
      ? `${theme.palette.warning.light}40`
      : value < 75
      ? `${theme.palette.info.light}40`
      : `${theme.palette.success.light}40`,
  "& .MuiLinearProgress-bar": {
    borderRadius: 5,
    backgroundColor:
      value < 25
        ? theme.palette.error.main
        : value < 50
        ? theme.palette.warning.main
        : value < 75
        ? theme.palette.info.main
        : theme.palette.success.main,
  },
}));

const SavingsPage = () => {
  const { financialData } = useFinancialData();
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("account"); // "account" or "goal"
  const [selectedItem, setSelectedItem] = useState(null);

  if (!financialData) return null;

  const { savings } = financialData;

  const handleOpenDialog = (type, item = null) => {
    setDialogType(type);
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem(null);
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
          Savings Overview
        </Typography>
        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleIcon />}
            onClick={() => handleOpenDialog("account")}
          >
            Add Account
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddCircleIcon />}
            onClick={() => handleOpenDialog("goal")}
          >
            Add Goal
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Total Savings */}
        <Grid item xs={12}>
          <motion.div variants={itemVariants}>
            <StyledPaper>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography variant="h6" color="text.secondary">
                      Total Savings
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{ fontWeight: 700, mt: 1, mb: 0.5 }}
                    >
                      {formatCurrency(savings.total)}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.success.main,
                        fontWeight: 500,
                      }}
                    >
                      +9.5% from last year
                    </Typography>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Box sx={{ width: "100%", height: 120 }}>
                    <SavingsGrowthChart data={savings.growth} />
                  </Box>
                </Grid>
              </Grid>
            </StyledPaper>
          </motion.div>
        </Grid>

        {/* Accounts Section */}
        <Grid item xs={12} md={7}>
          <motion.div variants={itemVariants}>
            <StyledPaper>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="h6">Savings Accounts</Typography>
              </Box>
              <Grid container spacing={2}>
                {savings.accounts.map((account, index) => (
                  <Grid item xs={12} key={index}>
                    <StyledCard>
                      <CardContent>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="flex-start"
                        >
                          <Box>
                            <Typography variant="h6">{account.name}</Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mb: 1 }}
                            >
                              Interest Rate: {account.interestRate}%
                            </Typography>
                            <Typography
                              variant="h5"
                              fontWeight="600"
                              sx={{ color: theme.palette.primary.main }}
                            >
                              {formatCurrency(account.balance)}
                            </Typography>
                          </Box>
                          <IconButton
                            size="small"
                            onClick={() => handleOpenDialog("account", account)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </CardContent>
                    </StyledCard>
                    {index < savings.accounts.length - 1 && (
                      <Divider sx={{ my: 1 }} />
                    )}
                  </Grid>
                ))}
              </Grid>
            </StyledPaper>
          </motion.div>
        </Grid>

        {/* Projection Chart */}
        <Grid item xs={12} md={5}>
          <motion.div variants={itemVariants}>
            <StyledPaper>
              <Typography variant="h6" mb={2}>
                Savings Projection
              </Typography>
              <Box sx={{ height: 300 }}>
                <SavingsProjectionChart
                  currentSavings={savings.total}
                  monthlyContribution={2000}
                  interestRate={1.5}
                />
              </Box>
            </StyledPaper>
          </motion.div>
        </Grid>

        {/* Savings Goals */}
        <Grid item xs={12}>
          <motion.div variants={itemVariants}>
            <StyledPaper>
              <Typography variant="h6" mb={3}>
                Savings Goals
              </Typography>
              <Grid container spacing={3}>
                {savings.goals.map((goal, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <StyledCard>
                      <CardContent>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="flex-start"
                        >
                          <Typography variant="h6">{goal.name}</Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleOpenDialog("goal", goal)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Box>
                        <Box mt={2} mb={1.5}>
                          <StyledLinearProgress
                            variant="determinate"
                            value={goal.percentage}
                          />
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography variant="body2">
                            {formatCurrency(goal.current)}
                          </Typography>
                          <Typography
                            variant="body2"
                            fontWeight="600"
                            color="text.secondary"
                          >
                            {goal.percentage}%
                          </Typography>
                          <Typography variant="body2">
                            {formatCurrency(goal.target)}
                          </Typography>
                        </Box>
                      </CardContent>
                    </StyledCard>
                  </Grid>
                ))}
              </Grid>
            </StyledPaper>
          </motion.div>
        </Grid>
      </Grid>

      {/* Add/Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {dialogType === "account"
            ? selectedItem
              ? "Edit Savings Account"
              : "Add Savings Account"
            : selectedItem
            ? "Edit Savings Goal"
            : "Add Savings Goal"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ py: 1 }}>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={selectedItem?.name || ""}
              sx={{ mb: 2 }}
            />

            {dialogType === "account" ? (
              <>
                <TextField
                  margin="dense"
                  label="Balance"
                  type="number"
                  fullWidth
                  variant="outlined"
                  defaultValue={selectedItem?.balance || ""}
                  InputProps={{
                    startAdornment: "₹",
                  }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  margin="dense"
                  label="Interest Rate (%)"
                  type="number"
                  fullWidth
                  variant="outlined"
                  defaultValue={selectedItem?.interestRate || ""}
                  inputProps={{
                    step: 0.1,
                  }}
                />
              </>
            ) : (
              <>
                <TextField
                  margin="dense"
                  label="Current Amount"
                  type="number"
                  fullWidth
                  variant="outlined"
                  defaultValue={selectedItem?.current || ""}
                  InputProps={{
                    startAdornment: "₹",
                  }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  margin="dense"
                  label="Target Amount"
                  type="number"
                  fullWidth
                  variant="outlined"
                  defaultValue={selectedItem?.target || ""}
                  InputProps={{
                    startAdornment: "₹",
                  }}
                  sx={{ mb: 2 }}
                />
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleCloseDialog}>
            {selectedItem ? "Save Changes" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};

export default SavingsPage;
