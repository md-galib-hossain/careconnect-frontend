"use client";
import React, { useEffect, useState } from "react";
import { AppBar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import Link from "next/link";
import logoutUser from "@/app/services/actions/logoutUser";
import { getUserInfo } from "@/app/services/auth.services";

const Navbar = () => {
  const AuthButton = dynamic(() => import('@/components/UI/AuthButton/AuthButton'), { ssr: false });
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

  const handleLogout = () => {
    logoutUser(router);
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            fontWeight={600}
            component={Link}
            href="/"
            sx={{
              display: { xs: 'flex', md: 'flex' },
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: { xs: 1, md: 0 },
             
            }}
          >
            Care{" "}
            <Box component="span" color="primary.main">
              Connect
            </Box>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end' }}>
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
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem component={Link} href="/healthplans" onClick={handleCloseNavMenu}>
                Health Plans
              </MenuItem>
              <MenuItem component={Link} href="/medicine" onClick={handleCloseNavMenu}>
                Medicine
              </MenuItem>
              {user && (
                <MenuItem component={Link} href="/dashboard" onClick={handleCloseNavMenu}>
                  Dashboard
                </MenuItem>
              )}
              <MenuItem onClick={handleCloseNavMenu}>
                <AuthButton />
              </MenuItem>
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            
          {user && (
              <Typography
                component={Link}
                href="/dashboard"
                sx={{
                  color: 'inherit',
                  textDecoration: 'none',
                  mx: 2,
                  '&:hover': {
                    color: 'primary.main',
                    transform: 'scale(1.1)',
                  },
                  transition: 'color 0.3s, transform 0.3s',
                }}
              >
                Dashboard
              </Typography>
            )}
            <Typography
              component={Link}
              href="/healthplans"
              sx={{
                color: 'inherit',
                textDecoration: 'none',
                mx: 2,
                '&:hover': {
                  color: 'primary.main',
                  transform: 'scale(1.1)',
                },
                transition: 'color 0.3s, transform 0.3s',
              }}
            >
              Health Plans
            </Typography>
            <Typography
              component={Link}
              href="/medicine"
              sx={{
                color: 'inherit',
                textDecoration: 'none',
                mx: 2,
                '&:hover': {
                  color: 'primary.main',
                  transform: 'scale(1.1)',
                },
                transition: 'color 0.3s, transform 0.3s',
              }}
            >
              Medicine
            </Typography>
           
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            <AuthButton />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
