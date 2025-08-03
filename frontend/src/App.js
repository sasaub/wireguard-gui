import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container } from '@mui/material';

import Login from './components/Login';
import Register from './components/Register';
import LandingPage from './components/LandingPage';
import Verification from './components/Verification';
import Dashboard from './components/Dashboard';
import ServerList from './components/ServerList';
import ServerDetail from './components/ServerDetail';
import Navbar from './components/Navbar';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppContent />
          </Box>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Navbar />}
      <Container component="main" sx={{ mt: isAuthenticated ? 4 : 0, mb: 4, flex: 1, px: isAuthenticated ? 2 : 0 }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify/:token" element={<Verification />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/servers" element={
            <PrivateRoute>
              <ServerList />
            </PrivateRoute>
          } />
          <Route path="/servers/:id" element={
            <PrivateRoute>
              <ServerDetail />
            </PrivateRoute>
          } />
        </Routes>
      </Container>
    </>
  );
}

export default App; 