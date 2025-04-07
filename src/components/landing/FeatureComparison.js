import React from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import RemoveIcon from "@mui/icons-material/Remove";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
  overflow: "hidden",
  background:
    theme.palette.mode === "dark"
      ? "rgba(30, 41, 59, 0.7)"
      : "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
}));

const HeaderCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "1rem",
  textAlign: "center",
  borderBottom: `2px solid ${theme.palette.divider}`,
  padding: theme.spacing(2, 3),
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(15, 23, 42, 0.5)"
      : "rgba(241, 245, 249, 0.7)",
}));

const FeatureCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:first-of-type": {
    fontWeight: 500,
  },
}));

const HighlightedRow = styled(TableRow)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(37, 99, 235, 0.1)"
      : "rgba(37, 99, 235, 0.05)",
}));

/**
 * Feature comparison table component
 * @param {Object} props - Component props
 * @param {Array} props.features - Array of feature objects with name property
 * @param {Array} props.plans - Array of plan objects with name property
 * @param {Object} props.comparison - Object mapping features to plan availability
 * @param {string} [props.highlightedPlan] - Name of the plan to highlight
 */
const FeatureComparison = ({
  features,
  plans,
  comparison,
  highlightedPlan,
}) => {
  const theme = useTheme();

  // Cell content based on availability
  const getCellContent = (value) => {
    if (value === true) {
      return <CheckCircleIcon sx={{ color: theme.palette.success.main }} />;
    } else if (value === false) {
      return <CancelIcon sx={{ color: theme.palette.text.disabled }} />;
    } else if (value === null) {
      return <RemoveIcon sx={{ color: theme.palette.text.disabled }} />;
    } else {
      return value;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
    >
      <StyledTableContainer component={Paper}>
        <Table aria-label="feature comparison table">
          <TableHead>
            <TableRow>
              <HeaderCell>Features</HeaderCell>
              {plans.map((plan) => (
                <HeaderCell
                  key={plan.name}
                  sx={{
                    color:
                      plan.name === highlightedPlan
                        ? theme.palette.primary.main
                        : "inherit",
                    fontSize: plan.name === highlightedPlan ? "1.1rem" : "1rem",
                  }}
                >
                  {plan.name}
                </HeaderCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {features.map((feature, index) => {
              const isHighlighted = comparison[feature.id]?.highlight;

              return (
                <React.Fragment key={feature.id}>
                  {index > 0 &&
                    feature.category !== features[index - 1].category && (
                      <TableRow>
                        <TableCell
                          colSpan={plans.length + 1}
                          sx={{
                            backgroundColor:
                              theme.palette.mode === "dark"
                                ? "rgba(15, 23, 42, 0.5)"
                                : "rgba(241, 245, 249, 0.7)",
                            py: 1.5,
                          }}
                        >
                          <Typography variant="subtitle2" fontWeight={600}>
                            {feature.category}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}

                  <TableRow
                    component={isHighlighted ? HighlightedRow : TableRow}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <FeatureCell component="th" scope="row">
                      {feature.name}
                    </FeatureCell>

                    {plans.map((plan) => (
                      <FeatureCell
                        key={`${feature.id}-${plan.name}`}
                        align="center"
                        sx={{
                          color:
                            plan.name === highlightedPlan
                              ? theme.palette.primary.main
                              : "inherit",
                        }}
                      >
                        {getCellContent(comparison[feature.id]?.[plan.name])}
                      </FeatureCell>
                    ))}
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </motion.div>
  );
};

export default FeatureComparison;
