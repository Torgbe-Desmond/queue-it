import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Box, Avatar, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../features/authSlice';
import avatarImage from '../../assests/android-icon-192x192.png'; // Using ES6 import

const Register = () => {
  const [companyDetails, setCompanyDetails] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setCompanyDetails({
      ...companyDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(register(companyDetails));
  };

  // Redirect after successful registration
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      navigate(`/settings/${user.id}`);
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="register-container">
      <Container component="main" maxWidth="xs">
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Avatar */}
          <Avatar alt="Customer Avatar" src={avatarImage} sx={{ width: 120, height: 120 }} />

          {/* Registration Form */}
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
            {/* Display error message */}
            {error && <p style={{ color: 'red' }}>{error}</p>} 
            {/* Register Button */}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Register'} 
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Register;
