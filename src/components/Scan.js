import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const Scan = () => {
  const handleScanClick = () => {
    // Add QR scanning logic here
    alert('QR Code Scanning feature');
  };

  return (
    <Box sx={{ padding: 2, textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        Scan QR Code
      </Typography>
      <Button variant="contained" color="primary" onClick={handleScanClick}>
        Take a Picture
      </Button>
    </Box>
  );
};

export default Scan;
