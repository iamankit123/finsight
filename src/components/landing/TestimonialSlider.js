import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  Typography,
  Avatar,
  IconButton,
  Rating,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion, AnimatePresence } from "framer-motion";
import { styled } from "@mui/material/styles";

const TestimonialCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(4),
  position: "relative",
  height: "100%",
  boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
  background:
    theme.palette.mode === "dark"
      ? "rgba(30, 41, 59, 0.8)"
      : "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
  border: `1px solid ${
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(0, 0, 0, 0.05)"
  }`,
}));

const QuoteMark = styled(Typography)(({ theme }) => ({
  position: "absolute",
  top: 20,
  right: 30,
  fontFamily: "Georgia, serif",
  fontSize: "120px",
  lineHeight: 1,
  color:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.05)"
      : "rgba(0, 0, 0, 0.05)",
  pointerEvents: "none",
}));

const NavButton = styled(IconButton)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(0, 0, 0, 0.05)",
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.2)"
        : "rgba(0, 0, 0, 0.1)",
  },
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
}));

const TestimonialSlider = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const theme = useTheme();

  // Auto-scroll testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 7000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <Box sx={{ position: "relative", overflow: "hidden", p: 1 }}>
      <Box sx={{ height: { xs: 370, md: 290 }, position: "relative" }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          >
            <TestimonialCard>
              <QuoteMark>"</QuoteMark>
              <Rating
                value={5}
                readOnly
                sx={{ mb: 2, color: theme.palette.warning.main }}
              />
              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  fontStyle: "italic",
                  lineHeight: 1.7,
                  position: "relative",
                  zIndex: 1,
                  fontSize: "1.1rem",
                }}
              >
                {testimonials[currentIndex].comment}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  sx={{
                    width: 56,
                    height: 56,
                    mr: 2,
                    border: `2px solid ${theme.palette.primary.main}`,
                  }}
                />
                <Box>
                  <Typography variant="subtitle1" fontWeight="600">
                    {testimonials[currentIndex].name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {testimonials[currentIndex].role}
                  </Typography>
                </Box>
              </Box>
            </TestimonialCard>
          </motion.div>
        </AnimatePresence>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 3,
        }}
      >
        <NavButton onClick={goToPrevious} aria-label="Previous testimonial">
          <ArrowBackIcon />
        </NavButton>
        {testimonials.map((_, index) => (
          <Box
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              mx: 0.5,
              cursor: "pointer",
              backgroundColor:
                index === currentIndex
                  ? theme.palette.primary.main
                  : theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.2)"
                  : "rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
            }}
          />
        ))}
        <NavButton onClick={goToNext} aria-label="Next testimonial">
          <ArrowForwardIcon />
        </NavButton>
      </Box>
    </Box>
  );
};

export default TestimonialSlider;
