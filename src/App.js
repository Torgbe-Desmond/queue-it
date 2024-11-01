// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Login from './Pages/LoginPage/Login';
import Register from './Pages/RegisterPage/Register';
import HomePage from './Pages/HomePage/HomePage';
import Profile from './components/Profile';
import History from './components/History';
import PrivateRoute from './components/PrivateRoute';
import store from './features/store';
import { Provider } from 'react-redux';
import './App.css';
import SettingsPageLayout from './Layouts/SettingsPageLayout';
import SettingsPage from './Pages/SettingsPage/SettingsPage';

const App = () => {
  return (
    <div className="app-container">
      <Provider store={store}>
        <Router>
          <Container component="main">
            <Routes>
              {/* Other routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<HomePage />} />

              {/* Settings Page with nested routes */}
              <Route
                path="/settings/:companyId/*"
                element={
                  <PrivateRoute>
                    <SettingsPageLayout />
                  </PrivateRoute>
                }
              >
                {/* Default route to display SettingsPage */}
                <Route index element={<SettingsPage />} />  

                {/* Additional nested routes */}
                <Route path="profile" element={<Profile />} />
                <Route path="history" element={<History />} />
              </Route>
            </Routes>
          </Container>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
