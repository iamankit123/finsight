import React, { useRef, useEffect } from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";

// Financial symbols for the background
const FINANCE_SYMBOLS = ["₹", "$", "€", "¥", "£", "฿", "₽", "₩", "₴", "₫"];

// Chart patterns
const PATTERNS = [
  "M0,50 L20,30 L40,45 L60,20 L80,40 L100,30", // Line chart
  "M0,50 C20,30 40,70 60,20 S80,50 100,30", // Curved line chart
  "M0,0 L30,0 L30,100 L60,100 L60,50 L90,50 L90,20 L120,20", // Bar chart
];

const FinancialBackground = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const canvasRef = useRef(null);

  // Generate random financial elements
  const generateElements = (count, width, height) => {
    const elements = [];

    // Add symbols
    for (let i = 0; i < count * 0.7; i++) {
      elements.push({
        type: "symbol",
        symbol:
          FINANCE_SYMBOLS[Math.floor(Math.random() * FINANCE_SYMBOLS.length)],
        x: Math.random() * width,
        y: Math.random() * height,
        size: 10 + Math.random() * 20,
        rotation: Math.random() * 30 - 15,
        opacity: 0.05 + Math.random() * 0.1,
      });
    }

    // Add patterns/charts
    for (let i = 0; i < count * 0.3; i++) {
      elements.push({
        type: "pattern",
        path: PATTERNS[Math.floor(Math.random() * PATTERNS.length)],
        x: Math.random() * width,
        y: Math.random() * height,
        scale: 0.5 + Math.random() * 1,
        rotation: Math.random() * 360,
        opacity: 0.05 + Math.random() * 0.08,
      });
    }

    return elements;
  };

  // Draw elements on the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const devicePixelRatio = window.devicePixelRatio || 1;

    // Set canvas dimensions
    const updateCanvasSize = () => {
      const { innerWidth: width, innerHeight: height } = window;
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(devicePixelRatio, devicePixelRatio);

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Generate elements based on screen size
      let elementCount = Math.floor((width * height) / 20000);
      elementCount = Math.max(20, Math.min(200, elementCount));
      const elements = generateElements(elementCount, width, height);

      // Draw everything
      drawElements(ctx, elements, isDarkMode);
    };

    // Draw all elements
    const drawElements = (ctx, elements, isDark) => {
      elements.forEach((elem) => {
        ctx.save();
        ctx.translate(elem.x, elem.y);
        ctx.rotate((elem.rotation * Math.PI) / 180);
        ctx.globalAlpha = elem.opacity;

        const color = isDark
          ? "rgba(255, 255, 255, 0.8)"
          : "rgba(0, 0, 60, 0.8)";
        ctx.fillStyle = color;
        ctx.strokeStyle = color;

        if (elem.type === "symbol") {
          ctx.font = `${elem.size}px Arial`;
          ctx.fillText(elem.symbol, 0, 0);
        } else {
          ctx.lineWidth = 1.5;
          const pathData = elem.path.split(" ");
          ctx.beginPath();

          for (let i = 0; i < pathData.length; i += 2) {
            const command = pathData[i][0];
            const x = parseFloat(pathData[i].substring(1));
            const y = parseFloat(pathData[i + 1]);

            if (command === "M") ctx.moveTo(x * elem.scale, y * elem.scale);
            else if (command === "L")
              ctx.lineTo(x * elem.scale, y * elem.scale);
            else if (command === "C" || command === "S") {
              // Handle curves - simplification for this example
              i += 2; // Skip control points for simplicity
              ctx.lineTo(x * elem.scale, y * elem.scale);
            }
          }

          ctx.stroke();
        }

        ctx.restore();
      });

      // Add subtle grid pattern
      drawGrid(
        ctx,
        ctx.canvas.width / devicePixelRatio,
        ctx.canvas.height / devicePixelRatio,
        isDark
      );
    };

    // Draw a subtle grid
    const drawGrid = (ctx, width, height, isDark) => {
      const gridSize = 50;
      const gridColor = isDark
        ? "rgba(255, 255, 255, 0.03)"
        : "rgba(0, 0, 0, 0.03)";

      ctx.beginPath();
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }

      // Horizontal lines
      for (let y = 0; y <= height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }

      ctx.stroke();
    };

    // Initialize and update on resize
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, [isDarkMode]);

  // Add some floating elements with framer motion for extra visual interest
  const floatingElements = Array.from({ length: 15 }).map((_, i) => {
    const symbol =
      FINANCE_SYMBOLS[Math.floor(Math.random() * FINANCE_SYMBOLS.length)];
    const size = 20 + Math.random() * 30;

    return {
      id: `floating-${i}`,
      symbol,
      size,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      duration: 20 + Math.random() * 40,
    };
  });

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: -1,
        overflow: "hidden",
      }}
    >
      {/* Canvas background with many financial elements */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />

      {/* A few animated elements with framer motion */}
      {floatingElements.map((elem) => (
        <motion.div
          key={elem.id}
          style={{
            position: "absolute",
            left: elem.x,
            top: elem.y,
            fontSize: elem.size,
            opacity: 0.07,
            color: isDarkMode ? "#ffffff" : "#000033",
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, -10, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: elem.duration,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          {elem.symbol}
        </motion.div>
      ))}

      {/* Add a subtle gradient overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDarkMode
            ? "radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0.3) 0%, rgba(15, 23, 42, 0.9) 100%)"
            : "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.8) 100%)",
        }}
      />
    </Box>
  );
};

export default FinancialBackground;
