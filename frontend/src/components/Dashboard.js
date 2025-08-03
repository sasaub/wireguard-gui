import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip
} from '@mui/material';
import {
  Add as AddIcon,
  Storage as StorageIcon,
  People as PeopleIcon,
  Speed as SpeedIcon,
  TrendingUp as TrendingUpIcon,
  Block as BlockIcon
} from '@mui/icons-material';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalServers: 0,
    inactiveServers: 0,
    activeServers: 0,
    recentServers: []
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/servers');
      const servers = response.data;
      
      const activeServers = servers.filter(server => server.is_active).length;
      const inactiveServers = servers.filter(server => !server.is_active).length;
      const recentServers = servers
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5);

      setStats({
        totalServers: servers.length,
        inactiveServers,
        activeServers,
        recentServers
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color, onClick }) => (
    <Card 
      sx={{ 
        height: '100%', 
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease-in-out',
        '&:hover': onClick ? {
          transform: 'translateY(-2px)',
          boxShadow: 3,
          backgroundColor: 'action.hover'
        } : {}
      }}
      onClick={onClick}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              backgroundColor: color,
              borderRadius: '50%',
              width: 48,
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
            }}
          >
            {icon}
          </Box>
          <Typography variant="h4" component="div">
            {value}
          </Typography>
        </Box>
        <Typography variant="h6" color="text.secondary">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography>Učitavanje...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Dashboard
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/servers')}
        >
          Novi Server
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Ukupno Servera"
            value={stats.totalServers}
            icon={<StorageIcon sx={{ color: 'white' }} />}
            color="primary.main"
            onClick={() => navigate('/servers')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Aktivni Serveri"
            value={stats.activeServers}
            icon={<TrendingUpIcon sx={{ color: 'white' }} />}
            color="success.main"
            onClick={() => navigate('/servers?filter=active')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Neaktivni Serveri"
            value={stats.inactiveServers}
            icon={<BlockIcon sx={{ color: 'white' }} />}
            color="error.main"
            onClick={() => navigate('/servers?filter=inactive')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Prosečna Brzina"
            value="~100 Mbps"
            icon={<SpeedIcon sx={{ color: 'white' }} />}
            color="warning.main"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Brze Akcije
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<AddIcon />}
                onClick={() => navigate('/servers')}
              >
                Kreiraj novi WireGuard server
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<PeopleIcon />}
                onClick={() => navigate('/servers')}
              >
                Dodaj peer na postojeći server
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<StorageIcon />}
                onClick={() => navigate('/servers')}
              >
                Pregled svih servera
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Nedavno Kreirani Serveri
            </Typography>
            {stats.recentServers.length > 0 ? (
              <List>
                {stats.recentServers.map((server) => (
                  <ListItem 
                    key={server.id} 
                    divider
                    sx={{ 
                      cursor: 'pointer',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        backgroundColor: 'action.hover',
                        transform: 'translateX(4px)'
                      }
                    }}
                    onClick={() => navigate(`/servers/${server.id}`)}
                  >
                    <ListItemIcon>
                      <StorageIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={server.name}
                      secondary={`${server.peer_count} peer-ova • Port ${server.listen_port}`}
                    />
                    <Chip
                      label={server.is_active ? 'Aktivan' : 'Neaktivan'}
                      color={server.is_active ? 'success' : 'default'}
                      size="small"
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                Još nema kreiranih servera
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 