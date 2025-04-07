import React, { Component } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // Log error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });

    // Attempt to recover by clearing localStorage and reloading
    if (this.props.clearDataOnError) {
      localStorage.removeItem("financialData");
    }

    // Reload only if specified in props
    if (this.props.reloadOnReset) {
      window.location.reload();
    }
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
            minHeight: "400px",
            p: 3,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              textAlign: "center",
              maxWidth: 500,
              borderRadius: 2,
            }}
          >
            <ErrorOutlineIcon color="error" sx={{ fontSize: 60, mb: 2 }} />

            <Typography
              variant="h5"
              fontWeight="bold"
              color="error"
              gutterBottom
            >
              Oops! Something went wrong.
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {this.props.message ||
                "We encountered an error while processing your request. Please try again."}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={this.handleReset}
              sx={{ mt: 2 }}
            >
              {this.props.reloadOnReset ? "Reload Application" : "Try Again"}
            </Button>

            {this.props.showDetails && this.state.error && (
              <Box sx={{ mt: 3, textAlign: "left" }}>
                <Typography
                  variant="caption"
                  component="pre"
                  sx={{
                    p: 2,
                    bgcolor: "grey.100",
                    color: "error.main",
                    borderRadius: 1,
                    overflow: "auto",
                    maxHeight: "200px",
                  }}
                >
                  {this.state.error.toString()}
                </Typography>
              </Box>
            )}
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
