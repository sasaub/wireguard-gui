import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip
} from '@mui/material';
import {
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Public as PublicIcon,
  Lock as LockIcon,
  CheckCircle as CheckIcon,
  ArrowForward as ArrowIcon,
  Wifi as WifiIcon,
  Business as BusinessIcon,
  Home as HomeIcon,
  School as SchoolIcon
} from '@mui/icons-material';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Bezbedna VPN Konekcija',
      description: 'Koristite WireGuard protokol za najbržu i najsigurniju VPN konekciju'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40, color: 'success.main' }} />,
      title: 'Brza i Stabilna',
      description: 'Uživajte u brzini bliskoj vašoj originalnoj internet konekciji'
    },
    {
      icon: <PublicIcon sx={{ fontSize: 40, color: 'info.main' }} />,
      title: 'Globalni Pristup',
      description: 'Pristupajte sadržaju iz bilo koje lokacije na svetu'
    },
    {
      icon: <LockIcon sx={{ fontSize: 40, color: 'warning.main' }} />,
      title: 'Enkripcija',
      description: 'Vaši podaci su potpuno zaštićeni najnovijom enkripcijom'
    }
  ];

  const useCases = [
    {
      icon: <HomeIcon />,
      title: 'Kućna Upotreba',
      description: 'Bezbedno surfovanje, pristup geo-ograničenom sadržaju, zaštita od praćenja'
    },
    {
      icon: <BusinessIcon />,
      title: 'Poslovna Upotreba',
      description: 'Siguran pristup poslovnim mrežama, zaštita poslovnih podataka'
    },
    {
      icon: <SchoolIcon />,
      title: 'Edukativna Upotreba',
      description: 'Pristup edukativnim resursima, sigurno učenje na daljinu'
    },
    {
      icon: <WifiIcon />,
      title: 'Javne Mreže',
      description: 'Bezbedno korišćenje javnih WiFi mreža u kafićima i hotelima'
    }
  ];

  const benefits = [
    'Jednostavno kreiranje VPN servera',
    'Automatsko upravljanje peer-ovima',
    'Real-time monitoring konekcija',
    'QR kod za brzo povezivanje',
    'Mobilna aplikacija podržana',
    '24/7 tehnička podrška',
    'Bezbedna enkripcija podataka',
    'Brza i stabilna konekcija'
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Sigurna VPN Konekcija
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
            Kreirajte svoj VPN server u nekoliko minuta i uživajte u bezbednoj i brzoj konekciji
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              sx={{ 
                bgcolor: 'white', 
                color: 'primary.main',
                '&:hover': { bgcolor: 'grey.100' }
              }}
            >
              Započnite Besplatno
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/login')}
              sx={{ 
                borderColor: 'white', 
                color: 'white',
                '&:hover': { borderColor: 'grey.300', bgcolor: 'rgba(255,255,255,0.1)' }
              }}
            >
              Prijavite Se
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          Zašto Izabrati Našu Uslugu?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%', textAlign: 'center' }}>
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Use Cases Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
            Gde Možete Koristiti VPN?
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {useCases.map((useCase, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper sx={{ p: 3, height: '100%', textAlign: 'center' }}>
                  <Box sx={{ mb: 2 }}>
                    {useCase.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {useCase.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {useCase.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h2" gutterBottom>
              Prednosti Naše Platforme
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Naša platforma omogućava jednostavno kreiranje i upravljanje VPN serverima
              koristeći najnoviji WireGuard protokol. Bez tehničkog znanja možete
              kreirati svoj VPN server u nekoliko minuta.
            </Typography>
            <List>
              {benefits.map((benefit, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon>
                    <CheckIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary={benefit} />
                </ListItem>
              ))}
            </List>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              endIcon={<ArrowIcon />}
              sx={{ mt: 2 }}
            >
              Započnite Sada
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h4" gutterBottom>
                Kako Funkcioniše?
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Chip label="1" color="primary" />
                  <Typography>Registrujte se i kreirajte nalog</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Chip label="2" color="primary" />
                  <Typography>Kreirajte svoj VPN server</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Chip label="3" color="primary" />
                  <Typography>Dodajte peer-ove za uređaje</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Chip label="4" color="primary" />
                  <Typography>Povežite se i uživajte!</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" gutterBottom>
            Spreman da Započnete?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Kreirajte svoj VPN server u nekoliko minuta i uživajte u bezbednoj konekciji
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/register')}
            sx={{ 
              bgcolor: 'white', 
              color: 'primary.main',
              px: 4,
              py: 1.5,
              fontSize: '1.2rem',
              '&:hover': { bgcolor: 'grey.100' }
            }}
          >
            Započnite Besplatno
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage; 