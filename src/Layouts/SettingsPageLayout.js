import React, { useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import { logout } from '../features/authSlice';
import { useDispatch } from 'react-redux';

const SettingsPageLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [updatedWidth,setUpdatedWidth] = useState(null)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { companyId } = useParams()

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  window.addEventListener('resize', () => {
    setUpdatedWidth(window.innerWidth);
  });
  

  const handleLogout = () => {
    dispatch(logout())
    navigate(`/login`)
  };

  const handleNavigateProfile = ()=>{
    navigate(`/settings/${companyId}/profile`)
  }

  const handleNavigateSettings = ()=>{
    navigate(`/settings/${companyId}`)
  }

  const drawerContent = (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      sx={{ width: 250 }}
    >
      <Typography variant="h6" sx={{ m: 2 }}>
        Settings Menu
      </Typography>
      <Divider />
      <List>
        <ListItem button onClick={handleNavigateSettings}>
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><LockIcon /></ListItemIcon>
          <ListItemText primary="Privacy" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><GroupsIcon /></ListItemIcon>
          <ListItemText primary="Servers" />
        </ListItem>
      </List>
      <Divider sx={{ mt: 'auto' }} />
      <ListItem button sx={{ mt: 2 }} onClick={handleLogout}>
        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </Box>
  );
  return (
    <>
      {/* Full-width AppBar */}
      <AppBar  color="primary" sx={{ width: '100vw', mb: 4 }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Settings
            </Typography>
            <IconButton color="inherit">
              {/* <SettingsIcon /> */}
            </IconButton>
          </Toolbar>
    </AppBar>


      {/* Drawer for settings sections */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>

      {/* Main content area within a Container */}
      <Container>
        <Box sx={{mt:5}}>
          <Outlet />
        </Box>
      </Container>
    </>
  );
};

export default SettingsPageLayout;
