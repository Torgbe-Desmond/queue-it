import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Box, Avatar, CircularProgress, Alert, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearError, login } from '../../features/authSlice';
import avatarImage from '../../assests/android-icon-192x192.png';

const Login = () => {
  const [companyDetails, setCompanyDetails] = useState({
    email: '',
    password: '',
  });
  const [errorHandler, setErrorHandler] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, user, message } = useSelector((state) => state.auth);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e) => {
    setCompanyDetails({
      ...companyDetails,
      [e.target.name]: e.target.value,
    });
    setErrorHandler(''); // Clear validation error on input change
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (error) {
      setErrorHandler(error);
      setSnackbarMessage(error);
      setSnackbarOpen(true);
      const errorTimeout = setTimeout(() => {
        setErrorHandler(null);
        dispatch(clearError());
      }, 3000);
      return () => clearTimeout(errorTimeout); // Cleanup on unmount
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      setSnackbarMessage('Login was successful');
      setSnackbarOpen(true);
      const successTimeout = setTimeout(() => {
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
      setSnackbarMessage('Please fill in both email and password.');
      setSnackbarOpen(true);
      setTimeout(() => setErrorHandler(null), 3000);
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
              src={avatarImage}
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
              disabled={loading}
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
              disabled={loading}
            />

            {/* Display Validation/Error Message */}
            {errorHandler && (
              <Box mt={4}>
                <Alert severity="error" sx={{ mb: 2 }}>
                  {errorHandler}
                </Alert>
              </Box>
            )}

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
          </Box>

          {/* Snackbar for Error or Success Messages */}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
          >
            <Alert onClose={handleSnackbarClose} severity={isAuthenticated ? "success" : "error"}>
              {snackbarMessage}
            </Alert>
          </Snackbar>

          {/* Go Back Text */}
          <Button variant="outlined" disabled={loading} onClick={handleNavigate} style={{ cursor: 'pointer', marginTop: '1rem' }}>
            Go Home
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
