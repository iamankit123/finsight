import React, { useRef, useEffect } from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";

// Financial icons/symbols that will float in the background
const SYMBOLS = [
  "₹",
  "💰",
  "💹",
  "📊",
  "📈",
  "🪙",
  "$",
  "€",
  "£",
  "¥",
  "💸",
  "📉",
  "💼",
];
const COINS = ["₹", "🪙", "$", "€", "£", "¥"];

const DynamicBackground = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  // Generate a random number of particles based on screen size
  const getRandomNumberOfParticles = () => {
    const width = window.innerWidth;
    // Fewer particles for mobile screens
    if (width < 768) return 10;
    if (width < 1200) return 15;
    return 20;
  };

  const particles = Array.from({ length: getRandomNumberOfParticles() }).map(
    () => ({
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() * 100, // random position (0-100%)
      y: Math.random() * 100, // random position (0-100%)
      symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      size: 10 + Math.random() * 20, // random size between 10-30px
      opacity: 0.03 + Math.random() * 0.1, // random opacity between 0.03-0.13
      duration: 60 + Math.random() * 120, // random animation duration (60-180s)
      isCoin: Math.random() > 0.7, // 30% chance of being a coin
    })
  );

  // Generate graph-like elements
  const generateGraphPoints = (width, height, segments = 10) => {
    const points = [];
    const segmentWidth = width / segments;

    // Starting point at the bottom left
    let currentX = 0;
    let currentY = height;

    points.push({ x: currentX, y: currentY });

    // Generate random points along the graph
    for (let i = 1; i <= segments; i++) {
      currentX = i * segmentWidth;
      // Random y position with upward trend
      const randomY = Math.max(0, currentY - (Math.random() * 40 - 10));
      points.push({ x: currentX, y: randomY });
      currentY = randomY;
    }

    return points;
  };

  const graphContainerRef = useRef(null);
  const [graphs, setGraphs] = React.useState([]);

  useEffect(() => {
    if (graphContainerRef.current) {
      const { clientWidth: width, clientHeight: height } =
        graphContainerRef.current;

      // Create multiple graph lines
      const graphLines = [
        {
          id: "graph1",
          points: generateGraphPoints(width, height),
          color: theme.palette.primary.main,
          opacity: 0.05,
          strokeWidth: 2,
        },
        {
          id: "graph2",
          points: generateGraphPoints(width, height),
          color: theme.palette.secondary.main,
          opacity: 0.07,
          strokeWidth: 3,
        },
        {
          id: "graph3",
          points: generateGraphPoints(width, height, 15),
          color: theme.palette.success.main,
          opacity: 0.04,
          strokeWidth: 2,
        },
      ];

      setGraphs(graphLines);
    }
  }, [theme.palette.mode]); // Re-generate when theme changes

  const renderGraph = (graph) => {
    const pathData = graph.points
      .map((point, index) =>
        index === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`
      )
      .join(" ");

    return (
      <motion.path
        key={graph.id}
        d={pathData}
        stroke={graph.color}
        strokeWidth={graph.strokeWidth}
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: 1,
          opacity: graph.opacity,
          transition: { duration: 3, ease: "easeInOut" },
        }}
      />
    );
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        overflow: "hidden",
        bgcolor: "transparent",
      }}
    >
      {/* Graph-like elements */}
      <Box
        ref={graphContainerRef}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <svg width="100%" height="100%">
          {graphs.map(renderGraph)}
        </svg>
      </Box>

      {/* Floating symbols */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          style={{
            position: "absolute",
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            fontSize: `${particle.size}px`,
            opacity: particle.opacity,
            color: isDarkMode
              ? particle.isCoin
                ? theme.palette.warning.light
                : theme.palette.primary.light
              : particle.isCoin
              ? theme.palette.warning.main
              : theme.palette.primary.main,
            userSelect: "none",
            pointerEvents: "none",
          }}
          animate={{
            x: [0, -10, 10, -5, 5, 0],
            y: [0, -15, -5, -10, -20, 0],
            rotate: particle.isCoin ? [0, 360] : [0, 0],
            transition: {
              duration: particle.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          }}
        >
          {particle.symbol}
        </motion.div>
      ))}

      {/* Grid overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `linear-gradient(to right, ${theme.palette.divider} 1px, transparent 1px), 
                         linear-gradient(to bottom, ${theme.palette.divider} 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
          opacity: 0.05,
        }}
      />
    </Box>
  );
};

export default DynamicBackground;
