import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { motion, useAnimation, useInView } from "framer-motion";

/**
 * A component that reveals its children when scrolled into view
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child elements to reveal
 * @param {string} [props.direction='up'] - Direction to animate from ('up', 'down', 'left', 'right')
 * @param {number} [props.duration=0.8] - Animation duration in seconds
 * @param {number} [props.delay=0] - Animation delay in seconds
 * @param {Object} [props.sx] - MUI sx props passed to container
 * @param {number} [props.distance=50] - Distance to animate in pixels
 */
const ScrollRevealSection = ({
  children,
  direction = "up",
  duration = 0.8,
  delay = 0,
  sx = {},
  distance = 50,
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Get animation properties based on direction
  const getAnimationProps = () => {
    const variants = {
      hidden: {},
      visible: {},
    };

    switch (direction) {
      case "down":
        variants.hidden = { y: -distance, opacity: 0 };
        variants.visible = { y: 0, opacity: 1 };
        break;
      case "left":
        variants.hidden = { x: distance, opacity: 0 };
        variants.visible = { x: 0, opacity: 1 };
        break;
      case "right":
        variants.hidden = { x: -distance, opacity: 0 };
        variants.visible = { x: 0, opacity: 1 };
        break;
      default: // 'up' is default
        variants.hidden = { y: distance, opacity: 0 };
        variants.visible = { y: 0, opacity: 1 };
    }

    return variants;
  };

  const variants = getAnimationProps();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <Box ref={ref} sx={{ overflow: "hidden", ...sx }}>
      <motion.div
        initial="hidden"
        animate={controls}
        variants={variants}
        transition={{
          duration: duration,
          delay: delay,
          ease: "easeOut", // Changed from cubic-bezier to a named easing
        }}
      >
        {children}
      </motion.div>
    </Box>
  );
};

export default ScrollRevealSection;
