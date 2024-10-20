// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Login from './Pages/LoginPage/Login';
import Register from './Pages/RegisterPage/Register';
import QrCodePage from './Pages/QrCodePage/QrCodePage';
import HomePage from './Pages/HomePage/HomePage';
import QueueModel from './Pages/QueueModel/QueueModel';
import SettingsPage from './Pages/SettingsPage/SettingsPage';
import Card from './components/Card';
import PrivateRoute from './components/PrivateRoute';
import { Provider } from 'react-redux';
import store from './features/store';
import './App.css';
// import ServerPrivateRoute from './components/ServerPrivateRoute';

const App = () => {
  return (
    <Provider store={store}>
    <div className='app-container'>
      <Router>
        <Container component="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route
              path="/settings/:companyId"
              element={
                <PrivateRoute>
                  <SettingsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/qr-scan/:serverId"
              element={
                  <QrCodePage />
              }
            />
            <Route
              path="/customer/:serverId"
              element={
                  <Card />
              }
            />
            <Route path="/queue-list" element={<QueueModel />} />
          </Routes>
        </Container>
      </Router>
    </div>
    </Provider>
  );
};

export default App;
