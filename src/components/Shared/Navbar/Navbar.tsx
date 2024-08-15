"use client";
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import Link from "next/link";
import logoutUser from "@/app/services/actions/logoutUser";
import { getUserInfo } from "@/app/services/auth.services";

const Navbar = () => {
  const AuthButton = dynamic(
    () => import("@/components/UI/AuthButton/AuthButton"),
    { ssr: false }
  );
  const [user, setUser] = useState<{ role?: string } | null>(null);

  useEffect(() => {
    const userFromStorage = getUserInfo();
    setUser(userFromStorage);
  }, []);

  const router = useRouter();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const buttonProps = {
    sx: {
      color: "primary.main",
      bgcolor: "#FFFFFF",
      ":hover": {
        bgcolor: "#F2F2F2",
      },
    },
  };

  const menuItemProps = {
    sx: {
      color: "inherit",
      textDecoration: "none",
    },
  };

  return (
    <AppBar position="static" elevation={0}>
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            fontWeight={600}
            component={Link}
            href="/"
            sx={{
              display: { xs: "flex", md: "flex" },
              color: "inherit",
              textDecoration: "none",
              flexGrow: 0,
              marginRight: "auto", // Aligns to the left
            }}
          >
            Care Connect
          </Typography>

          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem
                  component={Link}
                  href="/healthplans"
                  onClick={handleCloseNavMenu}
                >
                  Health Plans
                </MenuItem>
                <MenuItem
                  component={Link}
                  href="/medicine"
                  onClick={handleCloseNavMenu}
                >
                  Medicine
                </MenuItem>
                {user && (
                  <MenuItem
                    component={Link}
                    href={`/dashboard/${user?.role === "patient" ? "patient/appointments" : user?.role}`}
                    onClick={handleCloseNavMenu}
                  >
                    Dashboard
                  </MenuItem>
                )}
                <AuthButton
                  menuItemProps={menuItemProps}
                  isMenuItem
                  onClick={handleCloseNavMenu}
                />
              </Menu>
            </Box>

            <Box
              sx={{ display: { xs: "none", md: "flex" }, alignItems: "center",  }}
            >
              {user && (
                <Typography
                  component={Link}
                  href={`/dashboard/${user?.role === "patient" ? "patient/appointments" : user?.role}`}
                  sx={{
                    color: "inherit",
                    textDecoration: "none",
                    mx: 2,
                    "&:hover": {
                      borderBottom: "1px solid white",
                    },
                  }}
                >
                  Dashboard
                </Typography>
              )}
              <Typography
                component={Link}
                href="/healthplans"
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                  mx: 2,
                  "&:hover": {
                    borderBottom: "1px solid white",
                  },
                }}
              >
                Health Plans
              </Typography>
              <Typography
                component={Link}
                href="/medicine"
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                  mx: 2,
                  mr:4,
                  "&:hover": {
                    borderBottom: "1px solid white",
                  },
                }}
              >
                Medicine
              </Typography>
              <AuthButton buttonProps={buttonProps} />
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
