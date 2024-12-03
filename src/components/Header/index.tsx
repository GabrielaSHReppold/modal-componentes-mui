import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { themeColors } from "../../config/global/themeColors";

const pages = [
  { label: "Home", to: "/" },
  { label: "Blog", to: "/blog" },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export function Header() {

  const { pathname } = useLocation();

  const counterRedux = useAppSelector((st) => st.counter);


  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: themeColors.background, color: themeColors.text }}
      elevation={0}
    >
      <Container maxWidth="lg">

        <Toolbar
          disableGutters
          sx={{ minHeight: 300 }}>
          
          <Avatar
            alt="Logo"
            src="/src/assets/icone.webp" 
            sx={{ width: 60, height: 60, mr: 1, bgcolor: themeColors.accent }}/>
          
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", color: themeColors.primary }}>
            {counterRedux.value}
            Heinen <Typography variant="caption"></Typography>
          </Typography>    
          
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, mr: 2 }}>

            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: themeColors.text }}>
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >

                {pages.map((page) => (
                <MenuItem key={page.to} onClick={handleCloseNavMenu}>
                  <Link to={page.to} style={{ textAlign: "center" }}>
                    {page.label}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography variant="h6" sx={{ mr: 2 }}>
            {counterRedux.value}
          </Typography>

          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 2 }}
          >
            {pages.map((page) => (
              <Link
                key={page.to}
                to={page.to}
                onClick={handleCloseNavMenu}
                style={{
                  margin: "2px 0",
                  display: "block",
                  color: pathname === page.to ? "black" : "white",
                }}
              >
                {page.label}
              </Link>
            ))}
          </Box>


          <IconButton size="large" sx={{ color: themeColors.text }}>
            <SearchIcon />
          </IconButton>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" src="https://via.placeholder.com/40" sx={{ bgcolor: themeColors.accent }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" sx={{ color: themeColors.text }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}


