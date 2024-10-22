import React, { useState } from 'react';
import { TextField, Button, Container, Box, Avatar, CircularProgress } from '@mui/material'; // Import CircularProgress
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../features/authSlice';

const Login = () => {
  const [companyDetails, setCompanyDetails] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth); // Access loading and error state

  const handleChange = (e) => {
    setCompanyDetails({
      ...companyDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(login(companyDetails));
  };

  if (isAuthenticated) {
    navigate(`/settings/${user?.id}`);
  }

  return (
    <div className="login-container">
      <Container component="main" maxWidth="xs">
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar
            alt="Customer Avatar"
            src={require('../../assests/android-icon-192x192.png')} // Placeholder image URL, replace with actual image
            sx={{ width: 120, height: 120 }}
          />

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={companyDetails.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={companyDetails.password}
              onChange={handleChange}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>} 
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Login'} 
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
