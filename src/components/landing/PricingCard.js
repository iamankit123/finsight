import React from "react";
import {
  Box,
  Card,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";

const StyledPricingCard = styled(Card)(({ theme, featured }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(4),
  height: "100%",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  overflow: "hidden",
  background: featured
    ? `linear-gradient(135deg, ${theme.palette.primary.main}CC, ${theme.palette.primary.dark})`
    : theme.palette.mode === "dark"
    ? "rgba(30, 41, 59, 0.8)"
    : "rgba(255, 255, 255, 0.9)",
  color: featured ? "#fff" : "inherit",
  backdropFilter: "blur(10px)",
  boxShadow: featured
    ? "0 15px 30px rgba(0, 0, 0, 0.2)"
    : "0 10px 20px rgba(0, 0, 0, 0.1)",
  border: `1px solid ${
    featured
      ? "rgba(255, 255, 255, 0.1)"
      : theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.05)"
      : "rgba(0, 0, 0, 0.05)"
  }`,
  transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: featured
      ? "0 20px 40px rgba(0, 0, 0, 0.25)"
      : "0 15px 30px rgba(0, 0, 0, 0.15)",
  },
}));

const PlanLabel = styled(Box)(({ theme, featured }) => ({
  position: "absolute",
  top: 20,
  right: -35,
  transform: "rotate(45deg)",
  background: featured
    ? theme.palette.warning.main
    : theme.palette.success.main,
  color: "#fff",
  padding: "4px 40px",
  fontSize: "0.75rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "1px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  display: featured ? "block" : "none",
}));

const FeatureList = styled(List)(({ theme, featured }) => ({
  padding: 0,
  "& .MuiListItemIcon-root": {
    minWidth: "30px",
    color: featured ? "#fff" : theme.palette.success.main,
  },
  "& .MuiListItemText-primary": {
    fontSize: "0.95rem",
    color: featured ? "#fff" : "inherit",
  },
}));

const PricingCard = ({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  featured = false,
  onButtonClick,
  label,
}) => {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      whileHover={{ y: -8 }}
    >
      <StyledPricingCard featured={featured}>
        {label && <PlanLabel featured={featured}>{label}</PlanLabel>}

        <Typography variant="h5" fontWeight={600} sx={{ mb: 1 }}>
          {title}
        </Typography>

        <Typography
          variant="body2"
          color={featured ? "rgba(255,255,255,0.7)" : "text.secondary"}
          sx={{ mb: 3, minHeight: 40 }}
        >
          {description}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "baseline", mb: 3 }}>
          <Typography variant="h3" fontWeight={700}>
            {price}
          </Typography>
          {period && (
            <Typography
              variant="body2"
              color={featured ? "rgba(255,255,255,0.7)" : "text.secondary"}
              sx={{ ml: 1 }}
            >
              {period}
            </Typography>
          )}
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <FeatureList featured={featured}>
            {features.map((feature, index) => (
              <ListItem key={index} disableGutters sx={{ py: 0.5 }}>
                <ListItemIcon>
                  <CheckCircleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={feature} />
              </ListItem>
            ))}
          </FeatureList>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Button
            variant={featured ? "contained" : "outlined"}
            color={featured ? "secondary" : "primary"}
            fullWidth
            size="large"
            onClick={onButtonClick}
            sx={{
              borderRadius: "50px",
              py: 1.5,
              textTransform: "none",
              fontWeight: 600,
              fontSize: "1rem",
              boxShadow: featured ? "0 8px 16px rgba(0, 0, 0, 0.2)" : "none",
            }}
          >
            {buttonText}
          </Button>
        </Box>
      </StyledPricingCard>
    </motion.div>
  );
};

export default PricingCard;
