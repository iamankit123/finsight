import React from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const GlowButton = styled(Button)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  borderRadius: "50px",
  padding: theme.spacing(1.5, 4),
  fontSize: "1.1rem",
  fontWeight: 600,
  textTransform: "none",
  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  transition: "all 0.3s ease",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "-50%",
    left: "-50%",
    width: "200%",
    height: "200%",
    backgroundColor: theme.palette.primary.main,
    opacity: 0.1,
    borderRadius: "40%",
    transform: "scale(0)",
    transition: "transform 0.6s ease",
  },
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: `0 10px 25px -5px ${theme.palette.primary.main}80`,
    "&::before": {
      transform: "scale(1)",
      transition: "transform 0.6s ease",
    },
  },
}));

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    repeatType: "reverse",
  },
};

const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    repeatType: "reverse",
  },
};

/**
 * Animated call-to-action component with glowing button effect
 * @param {Object} props - Component props
 * @param {string} props.title - CTA title text
 * @param {string} [props.subtitle] - Optional subtitle text
 * @param {string} props.buttonText - Text for the CTA button
 * @param {function} props.onButtonClick - Click handler for the button
 * @param {Object} [props.sx] - Additional MUI sx styles
 * @param {string} [props.align='center'] - Text alignment: 'left', 'center', 'right'
 */
const AnimatedCta = ({
  title,
  subtitle,
  buttonText,
  onButtonClick,
  sx = {},
  align = "center",
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        textAlign: align,
        ...sx,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
      >
        <Typography
          variant="h3"
          component="h2"
          fontWeight={700}
          gutterBottom
          sx={{ mb: subtitle ? 2 : 4 }}
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              mb: 4,
              maxWidth: align === "center" ? "700px" : "none",
              mx: align === "center" ? "auto" : 0,
            }}
          >
            {subtitle}
          </Typography>
        )}

        <Box
          sx={{
            display: align === "center" ? "flex" : "block",
            justifyContent: "center",
          }}
        >
          <motion.div
            variants={pulseAnimation}
            animate="scale"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <GlowButton
              variant="contained"
              size="large"
              onClick={onButtonClick}
              endIcon={
                <motion.div animate={floatAnimation}>
                  <ArrowForwardIcon />
                </motion.div>
              }
            >
              {buttonText}
            </GlowButton>
          </motion.div>
        </Box>
      </motion.div>
    </Box>
  );
};

export default AnimatedCta;
