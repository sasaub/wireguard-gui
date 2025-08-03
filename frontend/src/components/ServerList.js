import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Chip,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  Tabs,
  Tab,
  Snackbar
} from '@mui/material';
import {
  Add as AddIcon,
  Storage as StorageIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  MoreVert as MoreVertIcon,
  RestoreFromTrash as RestoreIcon,
  DeleteForever as DeleteForeverIcon,
  Block as BlockIcon,
  Sync as SyncIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import axios from 'axios';

const ServerList = () => {
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [newServer, setNewServer] = useState({ name: '', address: '' });
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [serverMenuAnchor, setServerMenuAnchor] = useState(null);
  const [selectedServerForMenu, setSelectedServerForMenu] = useState(null);
  const [editServerDialog, setEditServerDialog] = useState(false);
  const [editingServer, setEditingServer] = useState({ name: '', address: '' });
  const [editingServerId, setEditingServerId] = useState(null);
  const [syncLoading, setSyncLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  // Get filter from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const filter = urlParams.get('filter');

  useEffect(() => {
    fetchServers();
    
    // Set active tab based on filter
    if (filter === 'inactive') {
      setActiveTab(1);
    } else if (filter === 'active') {
      setActiveTab(0);
    }
  }, [filter]);

  const fetchServers = async () => {
    try {
      const response = await axios.get('/api/servers');
      setServers(response.data);
    } catch (error) {
      console.error('Error fetching servers:', error);
      setError('Greška pri učitavanju servera');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateServer = async () => {
    try {
      setError('');
      const response = await axios.post('/api/servers', newServer);
      
      setServers([...servers, response.data]);
      setOpenDialog(false);
      setNewServer({ name: '', address: '' });
      
      // Show success message
      alert('Server uspešno kreiran!');
    } catch (error) {
      setError(error.response?.data?.error || 'Greška pri kreiranju servera');
    }
  };

  const handleInputChange = (field, value) => {
    setNewServer(prev => ({ ...prev, [field]: value }));
  };

  const handleEditServer = (server) => {
    setEditingServer({
      name: server.name,
      address: server.address
    });
    setEditingServerId(server.id);
    setEditServerDialog(true);
  };

  const handleUpdateServer = async () => {
    try {
      setError('');
      const response = await axios.put(`/api/servers/${editingServerId}`, editingServer);
      
      setServers(servers.map(server => 
        server.id === editingServerId 
          ? { 
              ...server, 
              name: editingServer.name, 
              address: editingServer.address,
              interface_name: response.data.interface_name
            }
          : server
      ));
      
      setEditServerDialog(false);
      setEditingServer({ name: '', address: '' });
      setEditingServerId(null);
      
      alert('Server uspešno ažuriran!');
    } catch (error) {
      setError(error.response?.data?.error || 'Greška pri ažuriranju servera');
    }
  };

  const handleSoftDeleteServer = async (serverId) => {
    if (window.confirm('Da li ste sigurni da želite da onemogućite ovaj server? Peer-ovi će takođe biti onemogućeni.')) {
      try {
        await axios.post(`/api/servers/${serverId}/soft-delete`);
        setServers(servers.map(server => 
          server.id === serverId 
            ? { ...server, is_active: false }
            : server
        ));
        alert('Server uspešno onemogućen!');
      } catch (error) {
        setError('Greška pri onemogućavanju servera');
      }
    }
  };

  const handleRestoreServer = async (serverId) => {
    try {
      await axios.post(`/api/servers/${serverId}/restore`);
      setServers(servers.map(server => 
        server.id === serverId 
          ? { ...server, is_active: true }
          : server
      ));
      alert('Server uspešno obnovljen!');
    } catch (error) {
      setError('Greška pri obnavljanju servera');
    }
  };

  const handlePermanentDeleteServer = async (serverId) => {
    if (window.confirm('Da li ste sigurni da želite da trajno obrišete ovaj server? Ova akcija se ne može poništiti.')) {
      try {
        await axios.delete(`/api/servers/${serverId}/permanent-delete`);
        setServers(servers.filter(server => server.id !== serverId));
        alert('Server trajno obrisan!');
      } catch (error) {
        setError('Greška pri trajnom brisanju servera');
      }
    }
  };

  const handleServerMenuOpen = (event, server) => {
    setServerMenuAnchor(event.currentTarget);
    setSelectedServerForMenu(server);
  };

  const handleServerMenuClose = () => {
    setServerMenuAnchor(null);
    setSelectedServerForMenu(null);
  };

  const handleSyncMikrotik = async () => {
    if (window.confirm('Da li ste sigurni da želite da uvezete postojeće servere sa Server-a?')) {
      try {
        setSyncLoading(true);
        const response = await axios.post('/api/sync-mikrotik');
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: 'success'
        });
        // Refresh servers list
        fetchServers();
      } catch (error) {
        setSnackbar({
          open: true,
          message: error.response?.data?.error || 'Greška pri sinhronizaciji',
          severity: 'error'
        });
      } finally {
        setSyncLoading(false);
      }
    }
  };

  const activeServers = servers.filter(server => server.is_active);
  const inactiveServers = servers.filter(server => !server.is_active);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography>Učitavanje...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          WireGuard Serveri
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<SyncIcon />}
            onClick={handleSyncMikrotik}
            disabled={syncLoading}
          >
                          {syncLoading ? 'Sinhronizacija...' : 'Uvezi sa Server-a'}
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            Dodaj Server
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
        <Tab label={`Aktivni (${activeServers.length})`} />
        <Tab label={`Neaktivni (${inactiveServers.length})`} />
      </Tabs>

      {activeTab === 0 && (
        <Grid container spacing={3}>
          {activeServers.map((server) => (
            <Grid item xs={12} sm={6} md={4} key={server.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                    backgroundColor: 'action.hover'
                  }
                }}
                onClick={() => navigate(`/servers/${server.id}`)}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <StorageIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h6" component="div">
                      {server.name}
                    </Typography>
                    <Box sx={{ ml: 'auto' }}>
                      <Tooltip title="Više opcija">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleServerMenuOpen(e, server);
                          }}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Interface: {server.interface_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Port: {server.listen_port}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Adresa: {server.address}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PeopleIcon sx={{ mr: 1, fontSize: 16 }} />
                    <Typography variant="body2">
                      {server.peer_count} peer-ova
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip
                      label="Aktivan"
                      color="success"
                      size="small"
                    />
                    
                    <Box>
                      <Tooltip title="Uredi server">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditServer(server);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {activeTab === 1 && (
        <Grid container spacing={3}>
          {inactiveServers.map((server) => (
            <Grid item xs={12} sm={6} md={4} key={server.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  opacity: 0.7,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                    backgroundColor: 'action.hover',
                    opacity: 0.9
                  }
                }}
                onClick={() => navigate(`/servers/${server.id}`)}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <StorageIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="h6" component="div">
                      {server.name}
                    </Typography>
                    <Box sx={{ ml: 'auto' }}>
                      <Tooltip title="Više opcija">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleServerMenuOpen(e, server);
                          }}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Interface: {server.interface_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Port: {server.listen_port}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Adresa: {server.address}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PeopleIcon sx={{ mr: 1, fontSize: 16 }} />
                    <Typography variant="body2">
                      {server.peer_count} peer-ova
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip
                      label="Neaktivan"
                      color="default"
                      size="small"
                    />
                    
                    <Box>
                      <Tooltip title="Uredi server">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditServer(server);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Create Server Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Kreiraj Novi WireGuard Server</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Naziv Servera"
              value={newServer.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              margin="normal"
              required
              helperText="Unesite opisni naziv za server (npr. 'Glavni VPN Server')"
            />
            <TextField
              fullWidth
              label="Adresa Servera"
              value={newServer.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              margin="normal"
              required
              helperText="Unesite IP adresu servera (npr. '10.0.0.1/24')"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>
            Otkaži
          </Button>
          <Button 
            onClick={handleCreateServer}
            variant="contained"
            disabled={!newServer.name || !newServer.address}
          >
            Kreiraj Server
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Server Dialog */}
      <Dialog open={editServerDialog} onClose={() => setEditServerDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Uredi Server</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Naziv Servera"
              value={editingServer.name}
              onChange={(e) => setEditingServer({ ...editingServer, name: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Adresa Servera"
              value={editingServer.address}
              onChange={(e) => setEditingServer({ ...editingServer, address: e.target.value })}
              margin="normal"
              required
              helperText="Unesite IP adresu servera (npr. '10.0.0.1/24')"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditServerDialog(false)}>
            Otkaži
          </Button>
          <Button 
            onClick={handleUpdateServer}
            variant="contained"
            disabled={!editingServer.name || !editingServer.address}
          >
            Sačuvaj
          </Button>
        </DialogActions>
      </Dialog>

      {/* Server Menu */}
      <Menu
        anchorEl={serverMenuAnchor}
        open={Boolean(serverMenuAnchor)}
        onClose={handleServerMenuClose}
      >
        {selectedServerForMenu?.is_active ? (
          <MenuItem onClick={() => {
            handleSoftDeleteServer(selectedServerForMenu.id);
            handleServerMenuClose();
          }}>
            <ListItemIcon>
              <BlockIcon fontSize="small" />
            </ListItemIcon>
            Onemogući Server
          </MenuItem>
        ) : (
          <MenuItem onClick={() => {
            handleRestoreServer(selectedServerForMenu.id);
            handleServerMenuClose();
          }}>
            <ListItemIcon>
              <RestoreIcon fontSize="small" />
            </ListItemIcon>
            Obnovi Server
          </MenuItem>
        )}
        <MenuItem onClick={() => {
          handlePermanentDeleteServer(selectedServerForMenu.id);
          handleServerMenuClose();
        }} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <DeleteForeverIcon fontSize="small" color="error" />
          </ListItemIcon>
          Trajno Obriši
        </MenuItem>
      </Menu>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ServerList; 