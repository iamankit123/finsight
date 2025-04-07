import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
  Badge,
  InputBase,
  alpha,
  Button,
  useTheme,
  useScrollTrigger,
  useMediaQuery,
  ListItemIcon,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LanguageIcon from "@mui/icons-material/Language";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const ElevationScroll = (props) => {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    sx: {
      backdropFilter: trigger ? "blur(20px)" : "none",
      backgroundColor: trigger
        ? (theme) =>
            theme.palette.mode === "dark"
              ? alpha(theme.palette.background.paper, 0.96)
              : alpha(theme.palette.background.paper, 0.96)
        : (theme) =>
            theme.palette.mode === "dark"
              ? alpha(theme.palette.background.paper, 0.8)
              : alpha(theme.palette.background.paper, 0.8),
      transition: "all 0.3s ease",
    },
  });
};

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius * 5,
  backgroundColor:
    theme.palette.mode === "dark"
      ? alpha(theme.palette.common.white, 0.08)
      : alpha(theme.palette.common.black, 0.04),
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? alpha(theme.palette.common.white, 0.12)
        : alpha(theme.palette.common.black, 0.06),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  transition: theme.transitions.create("width"),
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "18ch",
      "&:focus": {
        width: "28ch",
      },
    },
  },
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
  display: "none",
  [theme.breakpoints.up("sm")]: {
    display: "block",
  },
}));

const Header = ({ toggleThemeMode, onSidebarToggle, pageTitle }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      message: "Your investment portfolio increased by 2.3%",
      read: false,
    },
    { id: 2, message: "New statement available for analysis", read: false },
    {
      id: 3,
      message: "Budget alert: Dining expenses exceeded limit",
      read: true,
    },
  ];

  const unreadNotifications = notifications.filter((n) => !n.read).length;

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenNotificationsMenu = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseNotificationsMenu = () => {
    setAnchorElNotifications(null);
  };

  // Use pathname to determine current active section
  let currentPage = pageTitle;
  if (!currentPage) {
    if (location.pathname === "/") currentPage = "Home";
    else
      currentPage =
        location.pathname.substring(1).charAt(0).toUpperCase() +
        location.pathname.substring(2);
  }

  return (
    <ElevationScroll>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <StyledToolbar>
          {/* Left side - Menu Icon & Title */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isMobile && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={onSidebarToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <PageTitle variant="h6" component="div">
              {currentPage}
            </PageTitle>

            {/* Search Bar */}
            <Search sx={{ display: { xs: "none", md: "flex" } }}>
              <SearchIconWrapper>
                <SearchIcon fontSize="small" />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>

          {/* Right side - Actions/Profile */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Upload Statement Button */}
            <Button
              variant="outlined"
              startIcon={<FileUploadIcon />}
              sx={{
                display: { xs: "none", sm: "flex" },
                borderRadius: "20px",
                textTransform: "none",
              }}
              onClick={() => navigate("/upload")}
            >
              Upload Statement
            </Button>

            {/* Theme Toggle Button */}
            <Tooltip
              title={theme.palette.mode === "dark" ? "Light Mode" : "Dark Mode"}
            >
              <IconButton
                onClick={toggleThemeMode}
                color="inherit"
                size="small"
              >
                {theme.palette.mode === "dark" ? (
                  <LightModeIcon />
                ) : (
                  <DarkModeIcon />
                )}
              </IconButton>
            </Tooltip>

            {/* Notifications */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Notifications">
                <IconButton onClick={handleOpenNotificationsMenu} size="small">
                  <Badge badgeContent={unreadNotifications} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="notifications-menu"
                anchorEl={anchorElNotifications}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElNotifications)}
                onClose={handleCloseNotificationsMenu}
                PaperProps={{
                  sx: {
                    width: 320,
                    maxHeight: 400,
                    overflowY: "auto",
                  },
                }}
              >
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={600}>
                    Notifications
                  </Typography>
                  <Button size="small">Mark all as read</Button>
                </Box>
                <Divider />
                {notifications.length === 0 ? (
                  <Box sx={{ p: 2, textAlign: "center" }}>
                    <Typography color="text.secondary">
                      No notifications
                    </Typography>
                  </Box>
                ) : (
                  notifications.map((notification) => (
                    <MenuItem
                      key={notification.id}
                      onClick={handleCloseNotificationsMenu}
                      sx={{
                        py: 1.5,
                        borderLeft: notification.read
                          ? "none"
                          : `4px solid ${theme.palette.primary.main}`,
                        backgroundColor: notification.read
                          ? "inherit"
                          : alpha(theme.palette.primary.main, 0.05),
                        whiteSpace: "normal",
                      }}
                    >
                      <Typography variant="body2">
                        {notification.message}
                      </Typography>
                    </MenuItem>
                  ))
                )}
                <Divider />
                <Box sx={{ p: 1, textAlign: "center" }}>
                  <Button
                    size="small"
                    onClick={() => navigate("/notifications")}
                  >
                    View All
                  </Button>
                </Box>
              </Menu>
            </Box>

            {/* Help Button */}
            <Tooltip title="Help">
              <IconButton color="inherit" size="small">
                <HelpOutlineIcon />
              </IconButton>
            </Tooltip>

            {/* Language Menu - For future implementation */}
            <Tooltip title="Change language">
              <IconButton
                color="inherit"
                size="small"
                sx={{ display: { xs: "none", md: "flex" } }}
              >
                <LanguageIcon />
              </IconButton>
            </Tooltip>

            {/* User Menu */}
            <Box sx={{ flexGrow: 0, ml: 1 }}>
              <Tooltip title="Account settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="User Profile"
                    src="/avatar.jpg"
                    sx={{
                      width: 36,
                      height: 36,
                      border: `2px solid ${theme.palette.primary.main}`,
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Box sx={{ px: 3, py: 1.5 }}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Arjun Sharma
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    arjun@example.com
                  </Typography>
                </Box>
                <Divider />
                <MenuItem onClick={handleCloseUserMenu}>
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography textAlign="center">Settings</Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleCloseUserMenu}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </StyledToolbar>
      </AppBar>
    </ElevationScroll>
  );
};

export default Header;
