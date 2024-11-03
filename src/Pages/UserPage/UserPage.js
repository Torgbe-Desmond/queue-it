import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import HistoryIcon from '@mui/icons-material/History';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Profile from '../../components/Profile';
import Scan from '../../components/Scan';
import History from '../../components/History';

const UserPage = () => {
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
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/history" element={<History />} />
      </Routes>

      <BottomNavigation
        value={value}
        onChange={handleTabChange}
        showLabels
        sx={{ position: 'fixed', bottom: 0, width: '100%' }}
      >
        <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} />
        <BottomNavigationAction label="Scan" icon={<CameraAltIcon />} />
        <BottomNavigationAction label="History" icon={<HistoryIcon />} />
      </BottomNavigation>
    </Box>
  );
};

export default UserPage;
