import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Container,
  Alert,
  Button,
  CircularProgress
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  Error as ErrorIcon
} from '@mui/icons-material';
import axios from 'axios';

const Verification = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`/api/verify/${token}`);
        setStatus('success');
        setMessage(response.data.message);
      } catch (error) {
        setStatus('error');
        setMessage(error.response?.data?.error || 'Greška pri verifikaciji');
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token]);

  const getStatusContent = () => {
    switch (status) {
      case 'verifying':
        return (
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress size={60} sx={{ mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Verifikacija u toku...
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Molimo sačekajte dok verifikujemo vaš email.
            </Typography>
          </Box>
        );

      case 'success':
        return (
          <Box sx={{ textAlign: 'center' }}>
            <CheckIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Verifikacija Uspešna!
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {message}
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/login')}
              sx={{ mt: 2 }}
            >
              Idite na Prijavu
            </Button>
          </Box>
        );

      case 'error':
        return (
          <Box sx={{ textAlign: 'center' }}>
            <ErrorIcon sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Greška pri Verifikaciji
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {message}
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/login')}
              sx={{ mt: 2 }}
            >
              Idite na Prijavu
            </Button>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 4 }}>
          {getStatusContent()}
        </Paper>
      </Box>
    </Container>
  );
};

export default Verification; 