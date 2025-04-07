import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // Use navigation hook instead of Router
import {
  Box,
  Typography,
  Button,
  Paper,
  Container,
  Grid,
  CircularProgress,
  Alert,
  useTheme,
  Card,
  CardContent,
  Avatar,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { useFinancialData } from "../context/FinancialDataContext";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SecurityIcon from "@mui/icons-material/Security";
import SpeedIcon from "@mui/icons-material/Speed";
import InsightsIcon from "@mui/icons-material/Insights";
import SavingsIcon from "@mui/icons-material/Savings";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DashboardPreview from "../components/landing/DashboardPreview";

// Import animation data
import financeAnimation from "../assets/animations/finance-animation.json";

const PageWrapper = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  position: "relative",
  overflow: "hidden",
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(10),
  // Remove the background gradient since we're using the FinancialBackground component
}));

// Remove or comment out BackgroundGraphic component since it's being replaced
// const BackgroundGraphic = styled(Box)(({ theme }) => ({
//   position: "absolute",
//   top: 0,
//   right: 0,
//   width: "100%",
//   height: "100%",
//   opacity: 0.05,
//   backgroundImage: `url(/finance-pattern.svg)`,
//   backgroundSize: "cover",
//   backgroundPosition: "center",
//   zIndex: 0,
// }));

const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: "90vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  position: "relative",
  padding: theme.spacing(4),
  zIndex: 1,
}));

const StyledFeatureCard = styled(Card)(({ theme }) => ({
  height: "100%",
  borderRadius: theme.shape.borderRadius * 2,
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  background: theme.palette.background.paper,
  backdropFilter: "blur(10px)",
  boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 15px 30px rgba(31, 38, 135, 0.25)",
  },
}));

const StyledDropzone = styled(Paper)(
  ({ theme, isDragActive, isDragReject }) => ({
    padding: theme.spacing(6),
    textAlign: "center",
    borderRadius: theme.shape.borderRadius * 2,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: isDragReject
      ? theme.palette.error.main
      : isDragActive
      ? theme.palette.primary.main
      : theme.palette.divider,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(30, 41, 59, 0.8)"
        : "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 32px rgba(31, 38, 135, 0.1)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      borderColor: theme.palette.primary.light,
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(30, 41, 59, 0.9)"
          : "rgba(255, 255, 255, 0.95)",
      boxShadow: "0 15px 35px rgba(31, 38, 135, 0.15)",
    },
  })
);

const TestimonialCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  background:
    theme.palette.mode === "dark"
      ? "rgba(30, 41, 59, 0.7)"
      : "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
}));

const FeatureIcon = styled(Avatar)(({ theme, color }) => ({
  backgroundColor: color || theme.palette.primary.main,
  width: 56,
  height: 56,
  marginBottom: theme.spacing(2),
  boxShadow: "0 8px 16px rgba(31, 38, 135, 0.15)",
}));

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut", // Changed from cubic-bezier to a named easing
    },
  },
};

const floatAnimation = {
  y: [0, -15, 0],
  transition: {
    duration: 3,
    ease: "easeInOut",
    repeat: Infinity,
  },
};

const gradientTextStyle = {
  backgroundSize: "400% 400%",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundImage: "linear-gradient(90deg, #2563eb, #10b981, #2563eb)",
  animation: "gradient 6s ease infinite",
  "@keyframes gradient": {
    "0%": {
      backgroundPosition: "0% 50%",
    },
    "50%": {
      backgroundPosition: "100% 50%",
    },
    "100%": {
      backgroundPosition: "0% 50%",
    },
  },
};

const LandingPage = () => {
  const [pdfError, setPdfError] = useState(null);
  const theme = useTheme();
  const { processStatement, loadDummyData, isLoading, error } =
    useFinancialData();
  const navigate = useNavigate(); // Use this hook for navigation

  const onDrop = useCallback(
    (acceptedFiles) => {
      setPdfError(null);
      const file = acceptedFiles[0];

      // Check if file is a PDF
      if (file && file.type === "application/pdf") {
        processStatement(file);
      } else {
        setPdfError("Please upload a valid PDF file.");
      }
    },
    [processStatement]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "application/pdf": [".pdf"],
      },
      maxFiles: 1,
    });

  const features = [
    {
      title: "Smart Expense Tracking",
      description:
        "Automatically categorize and track all your expenses to understand where your money is going.",
      icon: <SpeedIcon fontSize="large" />,
      color: theme.palette.primary.main,
    },
    {
      title: "Investment Analysis",
      description:
        "Get insights on your investments with detailed analytics and performance tracking.",
      icon: <TrendingUpIcon fontSize="large" />,
      color: theme.palette.secondary.main,
    },
    {
      title: "Financial Insights",
      description:
        "AI-powered recommendations to optimize your spending and maximize savings.",
      icon: <InsightsIcon fontSize="large" />,
      color: theme.palette.success.main,
    },
    {
      title: "Secure & Private",
      description:
        "Your financial data never leaves your device, ensuring maximum privacy and security.",
      icon: <SecurityIcon fontSize="large" />,
      color: theme.palette.error.main,
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Product Manager",
      comment:
        "FinSight has completely transformed how I manage my finances. The insights are incredibly actionable.",
      avatar: "/avatar1.jpg",
    },
    {
      name: "Rahul Kapoor",
      role: "Entrepreneur",
      comment:
        "As someone who juggles multiple income streams, FinSight's organization tools are a life-saver.",
      avatar: "/avatar2.jpg",
    },
    {
      name: "Ananya Patel",
      role: "Software Engineer",
      comment:
        "The investment tracking features have helped me optimize my portfolio and increase my returns.",
      avatar: "/avatar3.jpg",
    },
  ];

  return (
    <PageWrapper>
      {/* Remove the BackgroundGraphic component */}
      {/* <BackgroundGraphic /> */}

      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Grid
            container
            spacing={6}
            alignItems="center"
            justifyContent="center"
            component={motion.div}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <Grid item xs={12} md={6}>
              <motion.div variants={itemVariants}>
                {/* "Best Finance App" Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Chip
                    icon={<CheckCircleOutlineIcon />}
                    label="Best Personal Finance App 2023"
                    sx={{
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      mb: 4,
                      bgcolor: theme.palette.primary.main + "20",
                      color: theme.palette.primary.main,
                      border: `1px solid ${theme.palette.primary.main}30`,
                      pl: 1,
                    }}
                  />
                </motion.div>

                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                    mb: 2,
                    ...gradientTextStyle,
                  }}
                >
                  Master Your Finances With Precision
                </Typography>
                <Typography
                  variant="h5"
                  color="textSecondary"
                  sx={{
                    mb: 4,
                    fontWeight: 400,
                    opacity: 0.9,
                    lineHeight: 1.6,
                  }}
                >
                  Upload your bank statement and get AI-powered insights that
                  help you save more, spend wisely, and grow your wealth.
                </Typography>

                <Box sx={{ display: "flex", gap: 2, mb: 6, flexWrap: "wrap" }}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      onClick={loadDummyData}
                      disabled={isLoading}
                      sx={{
                        borderRadius: "50px",
                        px: 4,
                        py: 1.5,
                        fontWeight: 600,
                        fontSize: "1rem",
                        textTransform: "none",
                        background: "linear-gradient(90deg, #2563eb, #1d4ed8)",
                        boxShadow: "0 10px 20px rgba(37, 99, 235, 0.3)",
                        "&:hover": {
                          boxShadow: "0 15px 30px rgba(37, 99, 235, 0.4)",
                        },
                      }}
                    >
                      Try Demo Version
                    </Button>
                  </motion.div>
                </Box>

                <Box sx={{ display: "flex", mb: 2, gap: 4, flexWrap: "wrap" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <SavingsIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="body1">Save 25% more</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <TrendingUpIcon color="secondary" sx={{ mr: 1 }} />
                    <Typography variant="body1">Track investments</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <AccountBalanceIcon color="success" sx={{ mr: 1 }} />
                    <Typography variant="body1">Plan your future</Typography>
                  </Box>
                </Box>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div variants={itemVariants} animate={floatAnimation}>
                <Box sx={{ maxWidth: "100%", position: "relative" }}>
                  <Lottie
                    animationData={financeAnimation}
                    loop={true}
                    style={{
                      width: "100%",
                      height: "100%",
                      filter: "drop-shadow(0 20px 30px rgba(0, 0, 0, 0.15))",
                    }}
                  />

                  {/* Decorative circles */}
                  <Box
                    component={motion.div}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                      transition: {
                        duration: 4,
                        repeat: Infinity,
                      },
                    }}
                    sx={{
                      position: "absolute",
                      width: "300px",
                      height: "300px",
                      borderRadius: "50%",
                      background: `radial-gradient(circle, ${theme.palette.primary.main}20 0%, transparent 70%)`,
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: -1,
                    }}
                  />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Upload Section */}
      <Container maxWidth="lg" sx={{ py: 8, position: "relative", zIndex: 2 }}>
        <Grid
          container
          spacing={8}
          alignItems="center"
          justifyContent="center"
          component={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                }}
              >
                Start Your Financial Journey Today
              </Typography>

              <Typography
                variant="body1"
                color="textSecondary"
                sx={{ mb: 4, fontSize: "1.1rem", lineHeight: 1.6 }}
              >
                Simply upload your bank statement and let our AI do the rest.
                Within seconds, you'll get a comprehensive analysis of your
                finances with actionable insights.
              </Typography>

              <Box component={motion.div} variants={itemVariants}>
                <StyledDropzone
                  {...getRootProps()}
                  isDragActive={isDragActive}
                  isDragReject={isDragReject}
                >
                  <input {...getInputProps()} />
                  {isLoading ? (
                    <Box sx={{ textAlign: "center" }}>
                      <CircularProgress
                        size={60}
                        thickness={4}
                        sx={{ mb: 3 }}
                      />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Processing your statement...
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ mt: 1 }}
                      >
                        This usually takes just a few seconds
                      </Typography>
                    </Box>
                  ) : (
                    <Box
                      component={motion.div}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Box
                        component={motion.div}
                        animate={{
                          y: [0, -10, 0],
                          transition: { duration: 2, repeat: Infinity },
                        }}
                        sx={{ mb: 2 }}
                      >
                        <Box
                          component="img"
                          src="/assets/icons/upload-icon.svg"
                          alt="Upload"
                          sx={{
                            width: 80,
                            height: 80,
                            opacity: 0.9,
                          }}
                        />
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                        Drag & drop your bank statement here
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        or click to browse files
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ mt: 1, opacity: 0.7 }}
                      >
                        Supports PDF format
                      </Typography>
                    </Box>
                  )}
                </StyledDropzone>
              </Box>

              {(error || pdfError) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {error || pdfError}
                  </Alert>
                </motion.div>
              )}
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              variants={itemVariants}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <Box
                sx={{
                  transform: "perspective(1000px) rotateY(-5deg) rotateX(5deg)",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform:
                      "perspective(1000px) rotateY(0deg) rotateX(0deg)",
                  },
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  borderRadius: 4,
                }}
              >
                <DashboardPreview />
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Container
        maxWidth="lg"
        sx={{ pb: 10, pt: 5, position: "relative", zIndex: 2 }}
        component={motion.div}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <Typography
            variant="h3"
            align="center"
            sx={{
              fontWeight: 700,
              mb: 2,
            }}
          >
            Why Choose FinSight?
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            sx={{ mb: 8, maxWidth: 700, mx: "auto" }}
          >
            Our platform offers powerful tools and insights to help you take
            control of your finances
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <StyledFeatureCard>
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      p: 4,
                    }}
                  >
                    <FeatureIcon color={feature.color}>
                      {feature.icon}
                    </FeatureIcon>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography color="textSecondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </StyledFeatureCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testimonials */}
      <Box
        sx={{
          py: 10,
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(180deg, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.8) 100%)"
              : "linear-gradient(180deg, rgba(241, 245, 249, 0) 0%, rgba(241, 245, 249, 0.8) 100%)",
          position: "relative",
          zIndex: 1,
        }}
        component={motion.div}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <Container maxWidth="lg">
          <motion.div variants={itemVariants}>
            <Typography
              variant="h3"
              align="center"
              sx={{
                fontWeight: 700,
                mb: 6,
              }}
            >
              What Our Users Say
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <TestimonialCard>
                    <Box sx={{ mb: 3 }}>
                      {[...Array(5)].map((_, i) => (
                        <Box
                          component="span"
                          key={i}
                          sx={{
                            color: theme.palette.warning.main,
                            fontSize: 20,
                            mr: 0.5,
                          }}
                        >
                          ★
                        </Box>
                      ))}
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 3,
                        fontStyle: "italic",
                        lineHeight: 1.7,
                      }}
                    >
                      "{testimonial.comment}"
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        sx={{ width: 48, height: 48, mr: 2 }}
                      />
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                  </TestimonialCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container
        maxWidth="md"
        sx={{ py: 12, textAlign: "center", position: "relative", zIndex: 2 }}
        component={motion.div}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 3,
            }}
          >
            Ready to Transform Your Financial Future?
          </Typography>
          <Typography
            variant="h6"
            color="textSecondary"
            sx={{ mb: 4, lineHeight: 1.6 }}
          >
            Join thousands of users who've already taken control of their
            finances with FinSight.
          </Typography>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              size="large"
              onClick={loadDummyData}
              disabled={isLoading}
              sx={{
                borderRadius: "50px",
                px: 6,
                py: 2,
                fontWeight: 600,
                fontSize: "1.1rem",
                textTransform: "none",
                background: "linear-gradient(90deg, #2563eb, #3b82f6)",
                boxShadow: "0 10px 20px rgba(37, 99, 235, 0.3)",
                "&:hover": {
                  boxShadow: "0 15px 30px rgba(37, 99, 235, 0.4)",
                },
              }}
            >
              Start Free Demo
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </PageWrapper>
  );
};

export default LandingPage;
