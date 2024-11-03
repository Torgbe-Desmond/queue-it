import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import { Box, Button, Typography, Accordion, AccordionSummary, AccordionDetails, TextField, CircularProgress, Snackbar, Alert } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomer, loginServer, scanQrCode } from '../../features/homeSlice'; // Adjust the import path as necessary

const HomePage = () => {
  const [expandedAccordion, setExpandedAccordion] = useState(false);
  const [customerCode, setCustomerCode] = useState('');
  const [serverCode, setServerCode] = useState('');
  const [qrCode, setQrCode] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const { customerLoading, serverLoading, qrLoading, error } = useSelector((state) => state.home);

  const handleAccordionChange = (accordion) => (event, isExpanded) => {
    if(isExpanded === false){
      setServerCode('')
      setQrCode('')
    }
    setExpandedAccordion(isExpanded ? accordion : false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handlePostCustomer = () => {
    if (!customerCode) {
      setSnackbarMessage('Customer code is required.');
      setSnackbarOpen(true);
      return;
    }
    dispatch(fetchCustomer(customerCode)).then((action) => {
      if (fetchCustomer.fulfilled.match(action)) {
        const { _id } = action.payload;
        navigate(`/customer-list/${_id}`);
      }
    });
  };

  const handlePostServer = () => {
    if (!serverCode) {
      setSnackbarMessage('Server code is required.');
      setSnackbarOpen(true);
      return;
    }
    dispatch(loginServer(serverCode)).then((action) => {
      if (loginServer.fulfilled.match(action)) {
        const { _id } = action.payload;
        navigate(`/server/${_id}`);
      } else if (loginServer.rejected.match(action)) {
        setSnackbarMessage('Failed to log into server. Please check your code and try again.');
        setSnackbarOpen(true);
      }
    });
  };

  const handlePostQrCode = () => {
    if (!qrCode) {
      setSnackbarMessage('QR code is required.');
      setSnackbarOpen(true);
      return;
    }
    dispatch(scanQrCode(qrCode)).then((action) => {
      if (scanQrCode.fulfilled.match(action)) {
        const { _id } = action.payload;
        navigate(`/qr-scan/${_id}`);
      } else if (scanQrCode.rejected.match(action)) {
        setSnackbarMessage('Failed to scan QR code. Please try again.');
        setSnackbarOpen(true);
      }
    });
  };
  return (
    <div className='home-container'>
      <Box sx={{ textAlign: 'center', mt: 4, px: { xs: 2, md: 4 } }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#7B8D93', fontSize: { xs: '1.5rem', md: '2rem' } }}>
          Congrats on the new Queue model
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ color: '#7B8D93', fontSize: { xs: '0.9rem', md: '1.2rem' } }}>
          Choose any of the steps to start
        </Typography>

        {/* Server Accordion */}
        <Accordion expanded={expandedAccordion === 'serverAccordion'} onChange={handleAccordionChange('serverAccordion')} sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: '#FFFFFF', color: '#333' }}>
            <Typography sx={{ color: '#333' }}>Log onto server Channel</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ textAlign: 'left', backgroundColor: '#E1F5FE', padding: '16px' }}>
            <Typography sx={{ color: '#333' }}>
              Here a server belonging to a company can join their particular company channels and start to serve customers.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <TextField
                value={serverCode}
                onChange={(e) => setServerCode(e.target.value)}
                label="Server Secret Code"
                variant="outlined"
                sx={{ width: { xs: '100%', sm: '80%', md: '30%' }, margin: 2 }}
              />
              <Button
                variant="contained"
                onClick={handlePostServer}
                disabled={serverLoading}
                sx={{ width: { xs: '100%', sm: '80%', md: '30%' } }}
              >
                {serverLoading ? <CircularProgress size={24} /> : 'Log onto Server'}
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* QR Code Scanner Accordion */}
        <Accordion expanded={expandedAccordion === 'qrAccordion'} onChange={handleAccordionChange('qrAccordion')} sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: '#FFFFFF', color: '#333' }}>
            <Typography sx={{ color: '#333' }}>QR Code Scanner</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ textAlign: 'left', backgroundColor: '#E1F5FE', padding: '16px' }}>
            <Typography sx={{ color: '#333' }}>
              Here a customer can use their code to connect to the server by scanning the QR Code.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <TextField
                value={qrCode}
                onChange={(e) => setQrCode(e.target.value)}
                label="QR Secret Code"
                variant="outlined"
                sx={{ width: { xs: '100%', sm: '80%', md: '30%' }, margin: 2 }}
              />
              <Button
                variant="contained"
                onClick={handlePostQrCode}
                disabled={qrLoading}
                sx={{ width: { xs: '100%', sm: '80%', md: '30%' } }}
              >
                {qrLoading ? <CircularProgress size={24} /> : 'Scan QR Code'}
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Snackbar for error messages */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="error">
            {snackbarMessage || error}
          </Alert>
        </Snackbar>

        {/* Register and Login Buttons */}
        <div className='btn-container'>
          <Button
            variant="contained"
            onClick={() => navigate('/login')}
            sx={{ width: { xs: '100%', sm: '100%', md: '30%' }, marginTop: 2 }}
          >
            Login Account
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate('/register')}
            sx={{ width: { xs: '100%', sm: '100%', md: '30%' }, marginTop: 2 }}
          >
            Register A Company
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default HomePage;
