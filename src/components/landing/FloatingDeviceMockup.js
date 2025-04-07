import React from "react";
import { Box, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";

const DeviceFrame = styled(Box)(({ theme, type = "browser" }) => {
  const commonStyles = {
    position: "relative",
    borderRadius: type === "browser" ? "12px" : "24px",
    overflow: "hidden",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    background: theme.palette.background.paper,
    "&:after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: "none",
      boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
      borderRadius: "inherit",
      zIndex: 2,
    },
  };

  // Specific styles for different device types
  if (type === "browser") {
    return {
      ...commonStyles,
      "&:before": {
        content: '""',
        height: "32px",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(30, 41, 59, 0.8)"
            : "rgba(240, 240, 240, 0.8)",
        zIndex: 1,
        display: "flex",
        alignItems: "center",
        paddingLeft: "12px",
      },
      "&:after": {
        ...commonStyles["&:after"],
        backdropFilter: "blur(0)",
      },
    };
  }

  if (type === "phone") {
    return {
      ...commonStyles,
      borderRadius: "36px",
      "&:before": {
        content: '""',
        position: "absolute",
        top: "12px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "30%",
        height: "24px",
        backgroundColor: "black",
        borderRadius: "12px",
        zIndex: 3,
      },
      maxWidth: "280px",
      margin: "0 auto",
    };
  }

  if (type === "laptop") {
    return {
      ...commonStyles,
      "&:after": {
        ...commonStyles["&:after"],
        borderBottom: "none",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      },
      "&:before": {
        content: '""',
        position: "absolute",
        bottom: "-20px",
        left: "-10%",
        width: "120%",
        height: "30px",
        backgroundColor: theme.palette.mode === "dark" ? "#1a1a1a" : "#d1d1d1",
        borderRadius: "0 0 8px 8px",
        zIndex: 0,
      },
    };
  }

  return commonStyles;
});

const Shadow = styled(Box)(() => ({
  position: "absolute",
  bottom: "-10%",
  left: "5%",
  width: "90%",
  height: "20px",
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  filter: "blur(15px)",
  borderRadius: "50%",
  zIndex: -1,
}));

const BrowserDots = styled(Box)(() => ({
  position: "absolute",
  top: "10px",
  left: "12px",
  display: "flex",
  gap: "6px",
  zIndex: 2,
  "& span": {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    display: "block",
  },
  "& span:nth-of-type(1)": { backgroundColor: "#ff5f57" },
  "& span:nth-of-type(2)": { backgroundColor: "#febc2e" },
  "& span:nth-of-type(3)": { backgroundColor: "#28c840" },
}));

/**
 * Floating device mockup component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Image or content to display inside the device
 * @param {string} [props.type='browser'] - Device type: 'browser', 'phone', 'laptop'
 * @param {Object} [props.sx] - Additional MUI sx styles to apply to container
 * @param {boolean} [props.animate=true] - Whether to animate the device
 */
const FloatingDeviceMockup = ({
  children,
  type = "browser",
  sx = {},
  animate = true,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        perspective: "1000px",
        ...sx,
      }}
    >
      <motion.div
        initial={animate ? { y: 20, rotateX: 5, rotateY: -5 } : false}
        animate={
          animate
            ? {
                y: [20, 0, 20],
                rotateX: [5, 0, 5],
                rotateY: [-5, 0, -5],
              }
            : false
        }
        transition={
          animate
            ? {
                duration: 5,
                ease: "easeInOut",
                repeat: Infinity,
              }
            : {}
        }
        style={{ transformStyle: "preserve-3d" }}
      >
        <DeviceFrame type={type}>
          {type === "browser" && (
            <BrowserDots>
              <span />
              <span />
              <span />
            </BrowserDots>
          )}

          <Box
            sx={{
              pt: type === "browser" ? "32px" : 0,
              height: "100%",
              width: "100%",
              overflow: "hidden",
            }}
          >
            {children}
          </Box>
        </DeviceFrame>
      </motion.div>

      <Shadow />
    </Box>
  );
};

export default FloatingDeviceMockup;
