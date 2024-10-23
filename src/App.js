import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Login from './Pages/LoginPage/Login';
import Register from './Pages/RegisterPage/Register';
import HomePage from './Pages/HomePage/HomePage';
import Profile from './components/Profile';
import Scan from './components/Scan';
import History from './components/History';
import UserLayout from './Layouts/UserLayout';
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import SettingsPage from './Pages/SettingsPage/SettingsPage';
import store from './features/store';
import { Provider } from 'react-redux';
import QrCodePage from './Pages/QrCodePage/QrCodePage';
import CardItem from './components/Card';

const App = () => {
  return (
   <div className='app-container'> 
   <Provider store={store}>
   <Router>
      <Container component="main">
        <Routes>
          {/* Other routes like Login, Register, HomePage without bottom tabs */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/customer/:serverId" element={<CardItem />} />
          <Route path="/qr-scan/:serverId" element={<QrCodePage />} />



             {/* Protected Routes */}
             <Route
                path="/settings/:companyId"
                element={
                  // <PrivateRoute>
                    <SettingsPage />
                  // </PrivateRoute>
                }
              />

          {/* User pages with bottom navigation (Profile, Scan, History) */}
          <Route element={<UserLayout />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/scan" element={<Scan />} />
            <Route path="/history" element={<History />} />
          </Route>
        </Routes>
      </Container>
    </Router>
   </Provider>
     
   </div>
  );
};

export default App;

