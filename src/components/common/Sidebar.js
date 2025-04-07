import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
  IconButton,
  Typography,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SavingsIcon from "@mui/icons-material/Savings";
import SecurityIcon from "@mui/icons-material/Security";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";

const DRAWER_WIDTH = 280;
const COLLAPSED_DRAWER_WIDTH = 72;

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) =>
    prop !== "open" && prop !== "isMobile" && prop !== "collapsed",
})(({ theme, open, isMobile, collapsed }) => ({
  width: isMobile ? 0 : collapsed ? COLLAPSED_DRAWER_WIDTH : DRAWER_WIDTH,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: isMobile
      ? DRAWER_WIDTH
      : collapsed
      ? COLLAPSED_DRAWER_WIDTH
      : DRAWER_WIDTH,
    boxSizing: "border-box",
    border: 0,
    background:
      theme.palette.mode === "dark"
        ? "rgba(15, 23, 42, 0.95)"
        : "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
    transition: theme.transitions.create(["width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const Logo = styled(Box)(({ theme, collapsed }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: collapsed ? "center" : "flex-start",
  padding: theme.spacing(collapsed ? 1 : 3),
  paddingLeft: collapsed ? theme.spacing(1) : theme.spacing(3),
  paddingRight: collapsed ? theme.spacing(1) : theme.spacing(3),
  backgroundColor: "transparent",
}));

const ListItemStyled = styled(ListItem)(({ theme, active }) => ({
  padding: theme.spacing(0.5),
  margin: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius * 1.5,
  backgroundColor: active ? `${theme.palette.primary.main}15` : "transparent",
  transition: "all 0.2s ease",
  "& .MuiListItemButton-root": {
    borderRadius: theme.shape.borderRadius * 1.5,
    padding: theme.spacing(1),
  },
}));

const ExpandButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: -12,
  top: 82,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "50%",
  width: 24,
  height: 24,
  zIndex: 10,
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  "& .MuiSvgIcon-root": {
    fontSize: "1rem",
  },
  "&:hover": {
    backgroundColor: theme.palette.background.default,
  },
  display: { xs: "none", md: "flex" },
}));

const Sidebar = ({ mobileOpen, onMobileClose }) => {
  const [collapsed, setCollapsed] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Check for saved state in localStorage
  useEffect(() => {
    const savedCollapsed = localStorage.getItem("sidebarCollapsed");
    if (savedCollapsed !== null) {
      setCollapsed(savedCollapsed === "true");
    }
  }, []);

  // Store collapse state in localStorage
  const toggleCollapsed = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    localStorage.setItem("sidebarCollapsed", newCollapsed.toString());
  };

  const handleDrawerClose = () => {
    onMobileClose();
  };

  const mainMenuItems = [
    {
      text: "Home",
      icon: <HomeIcon />,
      path: "/",
    },
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard",
    },
    {
      text: "Expenses",
      icon: <ReceiptIcon />,
      path: "/expenses",
    },
    {
      text: "Investments",
      icon: <AccountBalanceWalletIcon />,
      path: "/investments",
    },
    {
      text: "Savings",
      icon: <SavingsIcon />,
      path: "/savings",
    },
    {
      text: "Insurance",
      icon: <SecurityIcon />,
      path: "/insurance",
    },
  ];

  const otherMenuItems = [
    {
      text: "Settings",
      icon: <SettingsIcon />,
      path: "/settings",
    },
    {
      text: "Logout",
      icon: <LogoutIcon />,
      path: "/logout",
    },
  ];

  const sidebarContent = (
    <Box sx={{ position: "relative", height: "100%" }}>
      {/* Logo */}
      <Logo collapsed={collapsed}>
        {collapsed ? (
          <Box
            component="img"
            src="/logo-icon.svg"
            alt="FinSight"
            sx={{ height: 32, width: 32 }}
          />
        ) : (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              component="img"
              src="/logo-icon.svg"
              alt="FinSight"
              sx={{ height: 36, width: 36, mr: 1.5 }}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              FinSight
            </Typography>
          </Box>
        )}
      </Logo>

      {/* Expand/Collapse Button */}
      <ExpandButton
        onClick={toggleCollapsed}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </ExpandButton>

      {/* Mobile Close Button */}
      {isMobile && (
        <IconButton
          onClick={handleDrawerClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
      )}

      <Divider sx={{ mt: 1, mb: 2 }} />

      {/* Main Menu Items */}
      <List component={motion.div} layout>
        {mainMenuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Tooltip
                title={collapsed ? item.text : ""}
                placement="right"
                arrow
              >
                <ListItemStyled active={isActive ? 1 : 0} disablePadding>
                  <ListItemButton
                    onClick={() => navigate(item.path)}
                    sx={{
                      px: collapsed ? 1 : 2,
                      justifyContent: collapsed ? "center" : "flex-start",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: collapsed ? 0 : 40,
                        mr: collapsed ? 0 : 3,
                        justifyContent: "center",
                        color: isActive ? "primary.main" : "text.primary",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {!collapsed && (
                      <ListItemText
                        primary={item.text}
                        primaryTypographyProps={{
                          fontWeight: isActive ? 600 : 400,
                          color: isActive ? "primary.main" : "inherit",
                        }}
                      />
                    )}
                  </ListItemButton>
                </ListItemStyled>
              </Tooltip>
            </motion.div>
          );
        })}
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Bottom Menu Items */}
      <List
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          mb: 1,
        }}
        component={motion.div}
        layout
      >
        {otherMenuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <Tooltip
                title={collapsed ? item.text : ""}
                placement="right"
                arrow
              >
                <ListItemStyled active={isActive ? 1 : 0} disablePadding>
                  <ListItemButton
                    onClick={() => navigate(item.path)}
                    sx={{
                      px: collapsed ? 1 : 2,
                      justifyContent: collapsed ? "center" : "flex-start",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: collapsed ? 0 : 40,
                        mr: collapsed ? 0 : 3,
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {!collapsed && <ListItemText primary={item.text} />}
                  </ListItemButton>
                </ListItemStyled>
              </Tooltip>
            </motion.div>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile drawer */}
      <StyledDrawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        isMobile={true}
      >
        {sidebarContent}
      </StyledDrawer>

      {/* Desktop drawer */}
      <StyledDrawer
        variant="permanent"
        open={true}
        collapsed={collapsed}
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        {sidebarContent}
      </StyledDrawer>
    </>
  );
};

export default Sidebar;
