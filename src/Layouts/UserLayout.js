import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import HistoryIcon from '@mui/icons-material/History';

const UserLayout = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      navigate('/profile');
    } else if (newValue === 1) {
      navigate('/scan');
    } else if (newValue === 2) {
      navigate('/history');
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* The pages content (Profile, Scan, History) will be rendered here */}
      <Outlet />

      {/* Bottom Navigation Tabs */}
      <BottomNavigation
        value={value}
        onChange={handleTabChange}
        showLabels
        sx={{ position: 'fixed', bottom: 0, width: '100vw', left: 0 }}
      >
        <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} />
        <BottomNavigationAction label="Scan" icon={<CameraAltIcon />} />
        <BottomNavigationAction label="History" icon={<HistoryIcon />} />
      </BottomNavigation>
    </Box>
  );
};

export default UserLayout;
