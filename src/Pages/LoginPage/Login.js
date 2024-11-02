import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Box, Avatar, CircularProgress, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearError, login } from '../../features/authSlice';

const Login = () => {
  const [companyDetails, setCompanyDetails] = useState({
    email: '',
    password: '',
  });
  const [errorHandler, setErrorHandler] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
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

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      setSuccessMessage('Login was successful');
      const successTimeout = setTimeout(() => {
        setSuccessMessage(null);
        navigate(`/settings/${user.id}`);
      }, 3000);
      return () => clearTimeout(successTimeout); // Cleanup on unmount
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
      setTimeout(() => {
        setErrorHandler(null);
      }, 3000);
      return;
    }

    dispatch(login(companyDetails));
  };

  return (
    <div className="login-container">
      <Container component="main" maxWidth="xs">
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          {/* Clickable Avatar that navigates to homepage */}
          <Box onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
            <Avatar
              alt="Customer Avatar"
              src={require('../../assests/android-icon-192x192.png')}
              sx={{ width: 120, height: 120 }}
            />
          </Box>

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

            {/* Display Validation/Error Message */}
            {errorHandler && (
              <Box mt={4}>
                <Alert severity="error" sx={{ mb: 2 }}>
                  {errorHandler}
                </Alert>
              </Box>
            )}

            {/* Display Success Message */}
            {isAuthenticated && successMessage && (
              <Box mt={4}>
                <Alert severity="success" sx={{ mb: 2 }}>
                  {successMessage}
                </Alert>
              </Box>
            )}

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
          </Box>

          {/* Go Back Text */}
          <p onClick={handleNavigate} style={{ cursor: 'pointer', color: 'blue', marginTop: '1rem' }}>
            Go Home
          </p>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
