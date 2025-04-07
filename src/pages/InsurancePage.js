import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  IconButton,
  Divider,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useFinancialData } from "../context/FinancialDataContext";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import DescriptionIcon from "@mui/icons-material/Description";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatCurrency, formatDate } from "../utils/formatters";

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

const StyledIconBox = styled(Box)(({ theme, bgcolor }) => ({
  backgroundColor: bgcolor,
  width: 48,
  height: 48,
  borderRadius: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
  marginRight: theme.spacing(2),
}));

const InsurancePage = () => {
  const { financialData } = useFinancialData();
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("life"); // "life", "medical", or "claim"
  const [selectedItem, setSelectedItem] = useState(null);

  if (!financialData) return null;

  const { insurance } = financialData;

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
          Insurance Management
        </Typography>
        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleIcon />}
            onClick={() => handleOpenDialog("life")}
          >
            Add Life Policy
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddCircleIcon />}
            onClick={() => handleOpenDialog("medical")}
          >
            Add Medical Policy
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={6} lg={3}>
          <motion.div variants={itemVariants}>
            <StyledCard>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <StyledIconBox bgcolor={`${theme.palette.primary.main}15`}>
                    <HealthAndSafetyIcon color="primary" />
                  </StyledIconBox>
                  <Typography variant="h6">Life Insurance</Typography>
                </Box>
                <Typography variant="h4" fontWeight="600" mb={1}>
                  {formatCurrency(insurance.life.totalCoverage)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Annual Premium:{" "}
                  <Typography
                    component="span"
                    fontWeight="600"
                    color="text.primary"
                  >
                    {formatCurrency(insurance.life.annualPremium)}
                  </Typography>
                </Typography>
              </CardContent>
            </StyledCard>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <motion.div variants={itemVariants}>
            <StyledCard>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <StyledIconBox bgcolor={`${theme.palette.secondary.main}15`}>
                    <LocalHospitalIcon color="secondary" />
                  </StyledIconBox>
                  <Typography variant="h6">Medical Insurance</Typography>
                </Box>
                <Typography variant="h4" fontWeight="600" mb={1}>
                  {formatCurrency(insurance.medical.totalAnnualPremium)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Deductible:{" "}
                  <Typography
                    component="span"
                    fontWeight="600"
                    color="text.primary"
                  >
                    {formatCurrency(insurance.medical.totalDeductible)}
                  </Typography>
                </Typography>
              </CardContent>
            </StyledCard>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <motion.div variants={itemVariants}>
            <StyledCard>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <StyledIconBox bgcolor={`${theme.palette.info.main}15`}>
                    <DescriptionIcon color="info" />
                  </StyledIconBox>
                  <Typography variant="h6">Recent Claims</Typography>
                </Box>
                <Typography variant="h4" fontWeight="600" mb={1}>
                  {insurance.claims.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Amount:{" "}
                  <Typography
                    component="span"
                    fontWeight="600"
                    color="text.primary"
                  >
                    {formatCurrency(
                      insurance.claims.reduce(
                        (sum, claim) => sum + claim.amount,
                        0
                      )
                    )}
                  </Typography>
                </Typography>
              </CardContent>
            </StyledCard>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <motion.div variants={itemVariants}>
            <StyledCard>
              <CardContent
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Quick Actions
                </Typography>
                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    onClick={() => handleOpenDialog("claim")}
                  >
                    File New Claim
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    onClick={() => handleOpenDialog("life")}
                  >
                    Update Beneficiaries
                  </Button>
                  <Button variant="outlined" fullWidth>
                    Download Policy Details
                  </Button>
                </Box>
              </CardContent>
            </StyledCard>
          </motion.div>
        </Grid>

        {/* Life Insurance Policies */}
        <Grid item xs={12} lg={6}>
          <motion.div variants={itemVariants}>
            <StyledPaper>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="h6">Life Insurance Policies</Typography>
                <Button
                  variant="text"
                  color="primary"
                  startIcon={<AddCircleIcon />}
                  onClick={() => handleOpenDialog("life")}
                >
                  Add Policy
                </Button>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Provider</TableCell>
                      <TableCell>Policy Number</TableCell>
                      <TableCell align="right">Coverage</TableCell>
                      <TableCell align="right">Premium</TableCell>
                      <TableCell align="right">Expiry</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {insurance.life.policies.map((policy, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        hover
                      >
                        <TableCell>{policy.provider}</TableCell>
                        <TableCell>{policy.policyNumber}</TableCell>
                        <TableCell align="right">
                          {formatCurrency(policy.coverageAmount)}
                        </TableCell>
                        <TableCell align="right">
                          {formatCurrency(policy.premium)}/yr
                        </TableCell>
                        <TableCell align="right">
                          {formatDate(policy.expiryDate)}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            size="small"
                            onClick={() => handleOpenDialog("life", policy)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" color="error">
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </StyledPaper>
          </motion.div>
        </Grid>

        {/* Medical Insurance Policies */}
        <Grid item xs={12} lg={6}>
          <motion.div variants={itemVariants}>
            <StyledPaper>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="h6">Medical Insurance Policies</Typography>
                <Button
                  variant="text"
                  color="primary"
                  startIcon={<AddCircleIcon />}
                  onClick={() => handleOpenDialog("medical")}
                >
                  Add Policy
                </Button>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Provider</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell align="right">Premium</TableCell>
                      <TableCell align="right">Deductible</TableCell>
                      <TableCell align="right">Expiry</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {insurance.medical.policies.map((policy, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        hover
                      >
                        <TableCell>{policy.provider}</TableCell>
                        <TableCell>{policy.type}</TableCell>
                        <TableCell align="right">
                          {formatCurrency(policy.premium)}/yr
                        </TableCell>
                        <TableCell align="right">
                          {formatCurrency(policy.deductible)}
                        </TableCell>
                        <TableCell align="right">
                          {formatDate(policy.expiryDate)}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            size="small"
                            onClick={() => handleOpenDialog("medical", policy)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" color="error">
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </StyledPaper>
          </motion.div>
        </Grid>

        {/* Claims History */}
        <Grid item xs={12}>
          <motion.div variants={itemVariants}>
            <StyledPaper>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
              >
                <Typography variant="h6">Claims History</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<AddCircleIcon />}
                  onClick={() => handleOpenDialog("claim")}
                >
                  File New Claim
                </Button>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="center">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {insurance.claims.map((claim, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        hover
                      >
                        <TableCell>{formatDate(claim.date)}</TableCell>
                        <TableCell>{claim.type}</TableCell>
                        <TableCell>{claim.description}</TableCell>
                        <TableCell align="right">
                          {formatCurrency(claim.amount)}
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={claim.status}
                            size="small"
                            color={
                              claim.status === "Approved"
                                ? "success"
                                : claim.status === "Processing"
                                ? "warning"
                                : "error"
                            }
                            sx={{ fontWeight: 500 }}
                          />
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

      {/* Add/Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {dialogType === "life"
            ? selectedItem
              ? "Edit Life Insurance Policy"
              : "Add Life Insurance Policy"
            : dialogType === "medical"
            ? selectedItem
              ? "Edit Medical Insurance Policy"
              : "Add Medical Insurance Policy"
            : "File New Claim"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ py: 1 }}>
            {dialogType === "life" && (
              <>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Provider"
                  type="text"
                  fullWidth
                  variant="outlined"
                  defaultValue={selectedItem?.provider || ""}
                  sx={{ mb: 2 }}
                />
                <TextField
                  margin="dense"
                  label="Policy Number"
                  type="text"
                  fullWidth
                  variant="outlined"
                  defaultValue={selectedItem?.policyNumber || ""}
                  sx={{ mb: 2 }}
                />
                <TextField
                  margin="dense"
                  label="Coverage Amount"
                  type="number"
                  fullWidth
                  variant="outlined"
                  defaultValue={selectedItem?.coverageAmount || ""}
                  InputProps={{
                    startAdornment: "₹",
                  }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  margin="dense"
                  label="Annual Premium"
                  type="number"
                  fullWidth
                  variant="outlined"
                  defaultValue={selectedItem?.premium || ""}
                  InputProps={{
                    startAdornment: "₹",
                  }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  margin="dense"
                  label="Beneficiaries (comma separated)"
                  type="text"
                  fullWidth
                  variant="outlined"
                  defaultValue={
                    selectedItem?.beneficiaries
                      ? selectedItem.beneficiaries.join(", ")
                      : ""
                  }
                  sx={{ mb: 2 }}
                />
                <TextField
                  margin="dense"
                  label="Expiry Date"
                  type="date"
                  fullWidth
                  variant="outlined"
                  defaultValue={
                    selectedItem?.expiryDate
                      ? selectedItem.expiryDate.substring(0, 10)
                      : ""
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </>
            )}

            {dialogType === "medical" && (
              <>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Provider"
                  type="text"
                  fullWidth
                  variant="outlined"
                  defaultValue={selectedItem?.provider || ""}
                  sx={{ mb: 2 }}
                />
                <TextField
                  margin="dense"
                  label="Policy Number"
                  type="text"
                  fullWidth
                  variant="outlined"
                  defaultValue={selectedItem?.policyNumber || ""}
                  sx={{ mb: 2 }}
                />
                <TextField
                  margin="dense"
                  label="Type"
                  type="text"
                  fullWidth
                  variant="outlined"
                  defaultValue={selectedItem?.type || ""}
                  sx={{ mb: 2 }}
                />
                <TextField
                  margin="dense"
                  label="Coverage Details"
                  type="text"
                  multiline
                  rows={3}
                  fullWidth
                  variant="outlined"
                  defaultValue={selectedItem?.coverageDetails || ""}
                  sx={{ mb: 2 }}
                />
                <TextField
                  margin="dense"
                  label="Annual Premium"
                  type="number"
                  fullWidth
                  variant="outlined"
                  defaultValue={selectedItem?.premium || ""}
                  InputProps={{
                    startAdornment: "₹",
                  }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  margin="dense"
                  label="Deductible"
                  type="number"
                  fullWidth
                  variant="outlined"
                  defaultValue={selectedItem?.deductible || ""}
                  InputProps={{
                    startAdornment: "₹",
                  }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  margin="dense"
                  label="Expiry Date"
                  type="date"
                  fullWidth
                  variant="outlined"
                  defaultValue={
                    selectedItem?.expiryDate
                      ? selectedItem.expiryDate.substring(0, 10)
                      : ""
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </>
            )}

            {dialogType === "claim" && (
              <>
                <TextField
                  select
                  autoFocus
                  margin="dense"
                  label="Type"
                  fullWidth
                  variant="outlined"
                  defaultValue="Medical"
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="Medical">Medical</MenuItem>
                  <MenuItem value="Dental">Dental</MenuItem>
                  <MenuItem value="Vision">Vision</MenuItem>
                  <MenuItem value="Life">Life</MenuItem>
                </TextField>
                <TextField
                  margin="dense"
                  label="Description"
                  type="text"
                  multiline
                  rows={3}
                  fullWidth
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  margin="dense"
                  label="Amount"
                  type="number"
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    startAdornment: "₹",
                  }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  margin="dense"
                  label="Date of Service"
                  type="date"
                  fullWidth
                  variant="outlined"
                  defaultValue={new Date().toISOString().substring(0, 10)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleCloseDialog}
            color={dialogType === "claim" ? "secondary" : "primary"}
          >
            {selectedItem
              ? "Save Changes"
              : dialogType === "claim"
              ? "Submit Claim"
              : "Add Policy"}
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};

export default InsurancePage;
