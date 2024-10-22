import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import { Box, Button, Typography, Accordion, AccordionSummary, AccordionDetails, TextField, CircularProgress } from '@mui/material';
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

  const { customerLoading, serverLoading, qrLoading,error } = useSelector((state) => state.home); // Select errors

  const handleAccordionChange = (accordion) => (event, isExpanded) => {
    setExpandedAccordion(isExpanded ? accordion : false);
  };

  const handlePostCustomer = () => {
    dispatch(fetchCustomer(customerCode)).then((action) => {
      if (fetchCustomer.fulfilled.match(action)) {
        const { _id } = action.payload;
        navigate(`/customer-list/${_id}`);
      }
    });
  };

  const handlePostServer = () => {
    dispatch(loginServer(serverCode)).then((action) => {
      if (loginServer.fulfilled.match(action)) {
        const { _id } = action.payload;
        navigate(`/customer/${_id}`);
      }
    });
  };

  const handlePostQrCode = () => {
    dispatch(scanQrCode(qrCode)).then((action) => {
      if (scanQrCode.fulfilled.match(action)) {
        const { _id } = action.payload;
        navigate(`/qr-scan/${_id}`);
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

        {/* Customer Accordion */}
 {/* /*       <Accordion expanded={expandedAccordion === 'customerAccordion'} onChange={handleAccordionChange('customerAccordion')} sx={{ backgroundColor: '#FFF', mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: '#FFFFFF', color: '#333' }}>
            <Typography sx={{ color: '#333' }}>View customers by number</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ textAlign: 'left', backgroundColor: '#E1F5FE', padding: '16px' }}>
            <Typography sx={{ color: '#333' }}>
              Here there will be a display of customers who are currently connected to the specific company line for service.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <TextField 
                value={customerCode} 
                onChange={(e) => setCustomerCode(e.target.value)} 
                label="Customer Secret Code" 
                variant="outlined" 
                sx={{ width: { xs: '100%', sm: '80%', md: '30%' }, margin: 2 }} 
              />
              {error && <Typography color="error" variant="body2">{error}</Typography>} {/* Show customer error */}
              {/* <Button
                variant="contained"
                onClick={handlePostCustomer}
                disabled={customerLoading}
                sx={{ width: { xs: '100%', sm: '80%', md: '30%' } }}
              >
                {customerLoading ? <CircularProgress size={24} /> : 'Go to Customer List'}
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion> */}

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
              {error && <Typography color="error" variant="body2">{error}</Typography>} {/* Show server error */}
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
                label="QR Code" 
                variant="outlined" 
                sx={{ width: { xs: '100%', sm: '80%', md: '30%' }, margin: 2 }} 
              />
              {error && <Typography color="error" variant="body2">{error}</Typography>} {/* Show QR error */}
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

        {/* Register and Login Buttons */}
        <div className='btn-container'>
        <Button
          variant="contained"
          onClick={() => navigate('/register')}
          sx={{ width: { xs: '100%', sm: '100%', md: '30%' }, marginTop: 2 }}
        >
          Register A Company
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate('/login')}
          sx={{ width: { xs: '100%', sm: '100%', md: '30%' }, marginTop: 2 }}
        >
          Login Account
        </Button>
        </div>
      </Box>
    </div>
  );
};

export default HomePage;
