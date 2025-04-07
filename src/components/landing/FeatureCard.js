import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  borderRadius: theme.shape.borderRadius * 2,
  position: "relative",
  overflow: "hidden",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  background:
    theme.palette.mode === "dark"
      ? "rgba(30, 41, 59, 0.8)"
      : "rgba(255, 255, 255, 0.85)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.15)",
  },
  "&:hover .feature-icon": {
    transform: "scale(1.1)",
  },
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: (props) => props.accentcolor || theme.palette.primary.main,
  },
}));

const FeatureIcon = styled(Avatar)(({ theme, color }) => ({
  backgroundColor: color || theme.palette.primary.main,
  width: 60,
  height: 60,
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease",
  marginBottom: theme.spacing(2),
}));

const FeatureCard = ({ title, description, icon, color, index }) => {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: "easeOut", // Changed from cubic-bezier to a named easing
      }}
      whileHover={{ y: -8 }}
    >
      <StyledCard accentcolor={color}>
        <CardContent sx={{ p: 4 }}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
          >
            <FeatureIcon color={color} className="feature-icon">
              {icon}
            </FeatureIcon>
            <Typography variant="h5" gutterBottom fontWeight={600}>
              {title}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 1.7 }}
            >
              {description}
            </Typography>
          </Box>
        </CardContent>
      </StyledCard>
    </motion.div>
  );
};

export default FeatureCard;
