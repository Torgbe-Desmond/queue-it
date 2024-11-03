import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Box, Avatar, CircularProgress, Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, register } from '../../features/authSlice';
import avatarImage from '../../assests/android-icon-192x192.png';

const Register = () => {
  const [companyDetails, setCompanyDetails] = useState({
    email: '',
    password: '',
  });
  const [errorHandler, setErrorHandler] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');
  const { loading, error, isAuthenticated, user, message } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setCompanyDetails({
      ...companyDetails,
      [e.target.name]: e.target.value,
    });
    setErrorHandler('');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (error) {
      setSnackbarMessage(error);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      dispatch(clearError());
    }
  }, [error, dispatch]);

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

    if (!companyDetails.email || !companyDetails.password) {
      setErrorHandler('Please fill in both email and password.');
      setTimeout(() => setErrorHandler(null), 3000);
      return;
    }

    dispatch(register(companyDetails)).then((action) => {
      if (register.fulfilled.match(action)) {
        setSnackbarMessage(message || 'Registration successful!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        navigate('/login');
      } else if (register.rejected.match(action)) {
        setSnackbarMessage(message || 'Registration failed.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    });
  };

  return (
    <div className="register-container">
      <Container component="main" maxWidth="xs">
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
          >
            <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
              {snackbarMessage}
            </Alert>
          </Snackbar>

          <Button variant="outlined" disabled={loading} onClick={handleNavigate} style={{ cursor: 'pointer', marginTop: '1rem' }}>
            Go Home
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Register;
