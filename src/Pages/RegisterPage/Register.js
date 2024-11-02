import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Box, Avatar, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, register } from '../../features/authSlice';
import avatarImage from '../../assests/android-icon-192x192.png';

const Register = () => {
  const [companyDetails, setCompanyDetails] = useState({
    email: '',
    password: '',
  });
  const [errorHandler, setErrorHandler] = useState(''); // Validation and error state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setCompanyDetails({
      ...companyDetails,
      [e.target.name]: e.target.value,
    });
    setErrorHandler(''); // Clear validation error on input change
  };

  // API error handling
  useEffect(() => {
    if (error) {
      setErrorHandler(error);
      const errorTimeout = setTimeout(() => {
        setErrorHandler(null);
        dispatch(clearError());
      }, 3000);
      return () => clearTimeout(errorTimeout); // Cleanup on unmount
    }
  }, [error, dispatch]);

  // Redirect after successful registration
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      navigate(`/settings/${user.id}`);
    }
  }, [isAuthenticated, user, navigate]);

  const handleNavigate = () => {
    setCompanyDetails({
      email: '',
      password: '',
    });
    navigate('/');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if email or password is empty
    if (!companyDetails.email || !companyDetails.password) {
      setErrorHandler('Please fill in both email and password.');
      setTimeout(() => setErrorHandler(null), 3000);
      return;
    }

    dispatch(register(companyDetails));
  };

  return (
    <div className="register-container">
      <Container component="main" maxWidth="xs">
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Clickable Avatar that navigates to homepage */}
          <Box onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
            <Avatar
              alt="Customer Avatar"
              src={avatarImage}
              sx={{ width: 120, height: 120 }}
            />
          </Box>

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
            {errorHandler && (
              <Box mt={4}>
                <Alert severity="error" sx={{ mb: 2 }}>
                  {errorHandler}
                </Alert>
              </Box>
            )}

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Register'}
            </Button>
          </Box>

          {/* Go Home Text */}
          <p
            onClick={handleNavigate}
            style={{ cursor: 'pointer', color: 'blue', marginTop: '1rem' }}
          >
            Go Home
          </p>
        </Box>
      </Container>
    </div>
  );
};

export default Register;
