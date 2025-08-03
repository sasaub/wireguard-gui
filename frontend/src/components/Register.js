import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  CheckCircle as CheckIcon
} from '@mui/icons-material';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  const steps = ['Registracija', 'Email Verifikacija', 'Aktivacija'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(''); // Clear error when user types
  };

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Sva polja su obavezna');
      return false;
    }

    if (formData.username.length < 3) {
      setError('Korisničko ime mora imati najmanje 3 karaktera');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Lozinka mora imati najmanje 6 karaktera');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Lozinke se ne poklapaju');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Unesite validnu email adresu');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      setSuccess('Registracija uspešna! Proverite vaš email za verifikaciju.');
      setActiveStep(1);
      
      // Clear form
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });

    } catch (error) {
      setError(error.response?.data?.error || 'Greška pri registraciji');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Registracija
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Kreirajte svoj nalog i započnite sa korišćenjem VPN usluge
            </Typography>
          </Box>

          {/* Stepper */}
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          )}

          {activeStep === 0 && (
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Korisničko ime"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                margin="normal"
                required
                InputProps={{
                  startAdornment: <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />

              <TextField
                fullWidth
                label="Email adresa"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                margin="normal"
                required
                InputProps={{
                  startAdornment: <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />

              <TextField
                fullWidth
                label="Lozinka"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                margin="normal"
                required
                InputProps={{
                  startAdornment: <LockIcon sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />

              <TextField
                fullWidth
                label="Potvrdite lozinku"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                margin="normal"
                required
                InputProps={{
                  startAdornment: <LockIcon sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Registrujte se'
                )}
              </Button>

              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Već imate nalog?{' '}
                  <Link to="/login" style={{ textDecoration: 'none', color: 'primary.main' }}>
                    Prijavite se
                  </Link>
                </Typography>
              </Box>
            </Box>
          )}

          {activeStep === 1 && (
            <Card sx={{ textAlign: 'center' }}>
              <CardContent>
                <CheckIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Registracija Uspešna!
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Poslali smo verifikacioni email na vašu adresu. Molimo proverite vaš inbox
                  i kliknite na link za verifikaciju.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Nakon verifikacije možete se prijaviti i početi sa korišćenjem usluge.
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => navigate('/login')}
                  sx={{ mt: 2 }}
                >
                  Idite na Prijavu
                </Button>
              </CardContent>
            </Card>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default Register; 