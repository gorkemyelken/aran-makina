import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShareIcon from "@mui/icons-material/Share";
import { Box } from "@mui/system";
import { useMediaQuery } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMobile = useMediaQuery("(max-width: 900px)");
  const location = useLocation();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Aran Makina",
        url: window.location.href,
      });
    } else {
      alert("Sharing not supported in your browser.");
    }
  };

  const pages = [
    { name: "ANA SAYFA", path: "/" },
    { name: "HAKKIMIZDA", path: "/hakkimizda" },
    { name: "ÜRÜNLER", path: "/urunler" },
    { name: "İLETİŞİM", path: "/iletisim" },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#ffffff",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
        color: "#000",
        zIndex: 1300,
      }}
    >
      <Toolbar sx={{ justifyContent: isMobile ? "space-between" : "center" }}>
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon sx={{ color: "black" }} />
            </IconButton>

            <a href="/" style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6" sx={{ color: "black", fontFamily: "Roboto", fontWeight: "bold" }}>
                Aran Makina
              </Typography>
            </a>

            <IconButton color="inherit" onClick={handleShare}>
              <ShareIcon sx={{ color: "black" }} />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              keepMounted
            >
              {pages.map((page, index) => (
                <MenuItem
                  key={index}
                  onClick={handleMenuClose}
                  component={Link}
                  to={page.path}
                  sx={{
                    fontFamily: "Roboto",
                    color: "#000",
                    textDecoration:
                      location.pathname === page.path ? "underline" : "none",
                  }}
                >
                  {page.name}
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <>
            <Box sx={{ position: "absolute", left: "20px" }}>
              <a href="/" style={{ textDecoration: "none" }}>
                <Typography variant="h5" sx={{ color: "#000", fontFamily: "Roboto", fontWeight: "bold" }}>
                  Aran Makina
                </Typography>
              </a>
            </Box>

            <Box sx={{ display: "flex", gap: 3 }}>
              {pages.map((page, index) => (
                <Button
                  key={index}
                  component={Link}
                  to={page.path}
                  sx={{
                    fontFamily: "Roboto",
                    letterSpacing: "2px",
                    fontSize: "1.2rem",
                    color: "#000",
                    textDecoration:
                      location.pathname === page.path ? "underline" : "none",
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            <IconButton
              sx={{
                position: "absolute",
                right: "20px",
                color: "black",
              }}
              onClick={handleShare}
            >
              <ShareIcon />
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
