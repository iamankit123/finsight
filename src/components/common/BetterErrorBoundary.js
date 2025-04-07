import React, { Component } from "react";
import { Box, Typography, Paper, Button, Stack, Divider } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CodeIcon from "@mui/icons-material/Code";
import RefreshIcon from "@mui/icons-material/Refresh";
import HomeIcon from "@mui/icons-material/Home";
import { styled } from "@mui/material/styles";

const ErrorBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
  margin: theme.spacing(2),
  maxWidth: "800px",
  width: "100%",
  background:
    theme.palette.mode === "dark"
      ? "rgba(15, 23, 42, 0.9)"
      : "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
}));

const ErrorCode = styled(Box)(({ theme }) => ({
  background:
    theme.palette.mode === "dark"
      ? "rgba(0, 0, 0, 0.3)"
      : "rgba(0, 0, 0, 0.05)",
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  fontFamily: "monospace",
  fontSize: "0.9rem",
  overflowX: "auto",
  color: theme.palette.error.main,
  whiteSpace: "pre-wrap",
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

class BetterErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Extract file information from stack trace
    let errorDetails = {
      message: error.message,
      file: "Unknown file",
      line: "Unknown line",
      stack: error.stack,
    };

    if (error.stack) {
      // Regex to find file path and line number
      const stackLines = error.stack.split("\n");
      for (let line of stackLines) {
        // Match file paths, focusing on project files
        const match = line.match(/\((.*?):([\d]+):([\d]+)\)/);
        if (match && match[1] && match[1].includes("src")) {
          errorDetails.file = match[1].split("/src/").pop();
          errorDetails.line = match[2];
          break;
        }
      }
    }

    this.setState({
      error: errorDetails,
      errorInfo: errorInfo,
    });

    // Log to console for debugging
    console.error("Error caught by BetterErrorBoundary:", error, errorInfo);
  }

  handleReset = () => {
    // Clear localStorage and reload if specified
    if (this.props.clearDataOnError) {
      localStorage.removeItem("financialData");
    }
    window.location.reload();
  };

  toggleDetails = () => {
    this.setState((prevState) => ({
      showDetails: !prevState.showDetails,
    }));
  };

  goToHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: 2,
            backgroundColor: (theme) => theme.palette.background.default,
          }}
        >
          <ErrorBox elevation={3}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <ErrorOutlineIcon color="error" sx={{ fontSize: 40 }} />
              <Typography variant="h5" fontWeight="bold" color="error">
                Something went wrong
              </Typography>
            </Box>

            <Typography variant="body1" paragraph>
              {this.props.message ||
                "We encountered an error while rendering this component."}
            </Typography>

            {this.state.error && (
              <>
                <Box sx={{ mb: 3, mt: 2 }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                  >
                    Error details:
                  </Typography>
                  <Typography variant="body2" component="div" sx={{ mb: 1 }}>
                    <strong>Message:</strong> {this.state.error.message}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="div"
                    color="error"
                    sx={{ mb: 1 }}
                  >
                    <strong>File:</strong> {this.state.error.file}:
                    {this.state.error.line}
                  </Typography>
                </Box>

                {this.state.showDetails && (
                  <ErrorCode>{this.state.error.stack}</ErrorCode>
                )}
              </>
            )}

            <Divider sx={{ my: 2 }} />

            <Stack direction="row" spacing={2} justifyContent="space-between">
              <Button
                variant="outlined"
                startIcon={<CodeIcon />}
                onClick={this.toggleDetails}
              >
                {this.state.showDetails
                  ? "Hide Stack Trace"
                  : "Show Stack Trace"}
              </Button>

              <Box>
                <Button
                  variant="outlined"
                  startIcon={<HomeIcon />}
                  onClick={this.goToHome}
                  sx={{ mr: 2 }}
                >
                  Go to Home
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<RefreshIcon />}
                  onClick={this.handleReset}
                >
                  Reload App
                </Button>
              </Box>
            </Stack>
          </ErrorBox>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default BetterErrorBoundary;
