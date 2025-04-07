import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";

/**
 * Decorative shapes component for background interest
 * @param {Object} props - Component props
 * @param {string} [props.color] - Override default color
 * @param {number} [props.opacity=0.1] - Opacity for the shapes
 * @param {Object} [props.sx] - Additional MUI sx styles
 */
const BackgroundShapes = ({ color, opacity = 0.1, sx = {} }) => {
  const theme = useTheme();
  const shapeColor = color || theme.palette.primary.main;

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
        zIndex: -1,
        pointerEvents: "none",
        ...sx,
      }}
    >
      {/* Large circle */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          position: "absolute",
          width: "40vw",
          height: "40vw",
          maxWidth: "600px",
          maxHeight: "600px",
          borderRadius: "50%",
          border: `2px solid ${shapeColor}`,
          opacity: opacity * 0.7,
          right: "-10%",
          top: "-20%",
          transformOrigin: "center center",
        }}
      />

      {/* Small circle */}
      <motion.div
        animate={{
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          position: "absolute",
          width: "15vw",
          height: "15vw",
          maxWidth: "200px",
          maxHeight: "200px",
          borderRadius: "50%",
          backgroundColor: shapeColor,
          opacity: opacity * 0.2,
          left: "10%",
          top: "30%",
        }}
      />

      {/* Square */}
      <motion.div
        animate={{
          rotate: [0, 180, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          position: "absolute",
          width: "20vw",
          height: "20vw",
          maxWidth: "300px",
          maxHeight: "300px",
          borderRadius: "30px",
          border: `2px solid ${shapeColor}`,
          opacity: opacity * 0.5,
          right: "15%",
          bottom: "10%",
          transformOrigin: "center center",
        }}
      />

      {/* Donut shape */}
      <motion.div
        animate={{
          rotate: [0, -360, 0],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          position: "absolute",
          width: "25vw",
          height: "25vw",
          maxWidth: "400px",
          maxHeight: "400px",
          borderRadius: "50%",
          border: `15px solid ${shapeColor}`,
          opacity: opacity * 0.15,
          left: "-5%",
          bottom: "-10%",
          transformOrigin: "center center",
        }}
      />

      {/* Small squares group */}
      <Box sx={{ position: "absolute", left: "60%", top: "40%" }}>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -10 * (i + 1), 0],
              opacity: [opacity * 0.6, opacity * 0.9, opacity * 0.6],
            }}
            transition={{
              duration: 2 + i,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.2,
            }}
            style={{
              position: "absolute",
              width: 10 + i * 5,
              height: 10 + i * 5,
              backgroundColor: shapeColor,
              borderRadius: "2px",
              top: i * 15,
              left: i * 15,
              transformOrigin: "center center",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default BackgroundShapes;
