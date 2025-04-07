import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useInView } from "framer-motion";

/**
 * Animated counter component that counts up when in view
 * @param {Object} props - Component props
 * @param {string|number} props.end - The final value to count to
 * @param {string} [props.prefix=''] - Optional prefix (e.g. '$', '₹')
 * @param {string} [props.suffix=''] - Optional suffix (e.g. '%', '+')
 * @param {number} [props.duration=2000] - Animation duration in milliseconds
 * @param {Object} [props.typographyProps] - Props for Typography component
 * @param {function} [props.formatter] - Optional formatter function
 */
const AnimatedCounter = ({
  end,
  prefix = "",
  suffix = "",
  duration = 2000,
  typographyProps = {},
  formatter = null,
}) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Parse the end value to a number
  const parseEndValue = () => {
    // If end is a string that doesn't only contain numbers (e.g. "5M+", "₹1.5B")
    if (typeof end === "string" && !/^\d+(\.\d+)?$/.test(end)) {
      // Extract the numeric part and convert it
      const numericValue = parseFloat(end.replace(/[^0-9.]/g, ""));
      return isNaN(numericValue) ? 0 : numericValue;
    }
    return parseFloat(end);
  };

  const numericEnd = parseEndValue();

  useEffect(() => {
    let startTime;
    let animationFrame;

    const easeOutQuad = (t) => t * (2 - t);

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutQuad(progress);

      setCount(Math.floor(easedProgress * numericEnd));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(numericEnd);
      }
    };

    if (isInView) {
      animationFrame = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [numericEnd, duration, isInView]);

  const formatValue = () => {
    if (formatter) return formatter(count);

    // Handle suffix if it's part of the end string
    if (typeof end === "string") {
      // Extract any non-numeric suffix from the end (like "M+", "B", etc.)
      const nonNumericSuffix = end.match(/[^0-9.]+$/);
      if (nonNumericSuffix) {
        return `${prefix}${count}${nonNumericSuffix[0]}`;
      }
    }

    return `${prefix}${count}${suffix}`;
  };

  return (
    <Box ref={ref}>
      <Typography {...typographyProps}>{formatValue()}</Typography>
    </Box>
  );
};

export default AnimatedCounter;
