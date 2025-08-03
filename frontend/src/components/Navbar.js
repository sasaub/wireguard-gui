import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton
} from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  Storage as StorageIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div">
            Powered by MicroElectronic WireGuard GUI Manager
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            color="inherit"
            startIcon={<DashboardIcon />}
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </Button>
          
          <Button
            color="inherit"
            startIcon={<StorageIcon />}
            onClick={() => navigate('/servers')}
          >
            Serveri
          </Button>
          
          <Typography variant="body2" sx={{ mr: 2 }}>
            {user?.username}
          </Typography>
          
          <IconButton
            color="inherit"
            onClick={handleLogout}
            title="Odjavi se"
          >
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 