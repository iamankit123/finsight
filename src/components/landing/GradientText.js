import React from "react";
import { Typography, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { keyframes } from "@emotion/react";

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const GradientTypography = styled(Typography)(
  ({ theme, gradientcolors, animate }) => ({
    backgroundImage: `linear-gradient(90deg, ${
      gradientcolors || "#2563eb, #10b981, #2563eb"
    })`,
    backgroundSize: "300% 100%",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textFillColor: "transparent",
    animation: animate ? `${gradientAnimation} 6s ease infinite` : "none",
    display: "inline-block",
  })
);

/**
 * Typography component with gradient text
 * @param {Object} props - Props for Typography component
 * @param {string} [props.gradientColors] - Comma-separated list of colors for gradient
 * @param {boolean} [props.animate=true] - Whether to animate the gradient
 */
const GradientText = ({
  children,
  gradientColors,
  animate = true,
  ...props
}) => {
  return (
    <GradientTypography
      gradientcolors={gradientColors}
      animate={animate}
      {...props}
    >
      {children}
    </GradientTypography>
  );
};

export default GradientText;
