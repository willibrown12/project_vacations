import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';

import Button from '@mui/material/Button';

import MenuItem from '@mui/material/MenuItem';

import { useEffect, useState } from "react"
import { Outlet, useNavigate } from 'react-router-dom';

import { useAuth, useUserContext } from '../../../context';
import { jwtDecode } from 'jwt-decode';
const pages = ['home', 'vacations', 'about us'];






function ResponsiveAppBar() {

  

  const navigate = useNavigate();
  const { token ,setToken} = useAuth(); 
  const { fullName, role } = useUserContext();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  

  const settings = role?['create-vacation', 'charts', 'Logout']:['Logout']


  useEffect(() => {
    const checkTokenExpiration = () => {
      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      try {
        const decoded: any = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();
        if (isExpired) {
          setToken(null); 
        } else {
          setIsLoggedIn(true); 
        }
      } catch (error) {
       
        setToken(null); 
      }
    };

    checkTokenExpiration();
  }, [token, setToken]);
  





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
   <>
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Box
  component="img"
  src="/images/—Pngtree—summer holiday_3674815.png"
  alt="Logo"
  sx={{ display: { xs: 'none', md: 'flex',  width: 90,height:70}, marginRight: 1 }}
/>
         

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
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
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page}  onClick={() => {
                  handleCloseNavMenu();
                  navigate(`/${page.replace(/ /g,"")}`);
                }}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box 
  component="img"
  src="/images/—Pngtree—summer holiday_3674815.png"
  alt="Logo"
  sx={{ display: {xs: 'flex', md: 'none' ,  width: 90,height:70}, marginRight: 1 }}
/>
         
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 600,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
      
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  handleCloseNavMenu();
                  navigate(`/${page.replace(/ /g,"")}`);
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {isLoggedIn? <Box sx={{ flexGrow: 0, display:"flex", alignItems:"center" , gap:2 , width:"200px"}}>
          <div style={{fontSize:"14px"}}>Hello {fullName} </div>
         
          
            
            <IconButton   size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer" onClick={handleOpenUserMenu}sx={{ mr: 2 }}>
              <MenuIcon/>
             </IconButton>
            
            <Menu
              sx={{ mt: '35px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => {
                  handleCloseUserMenu();
                  navigate(`/${setting}`);
                }}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>:<Box sx={{ flexGrow: 0, display:"flex", alignItems:"center" , gap:2 , width:"200px"}}><Button  onClick={() => navigate('login')} color="inherit">Login</Button><Button  onClick={() => navigate('register')} color="inherit">register</Button></Box>}
        </Toolbar>
      </Container>
    </AppBar>
    <Box >
    <Outlet />
  </Box>
  </>
  );
}
export default ResponsiveAppBar;



