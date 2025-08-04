import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Menu,
  MenuItem,
  ListItemIcon
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  QrCode as QrCodeIcon,
  ContentCopy as CopyIcon,
  ArrowBack as ArrowBackIcon,
  Storage as StorageIcon,
  People as PeopleIcon,
  GetApp as DownloadIcon,
  Edit as EditIcon,
  MoreVert as MoreVertIcon,
  RestoreFromTrash as RestoreIcon,
  DeleteForever as DeleteForeverIcon,
  Block as BlockIcon,
  Refresh as RefreshIcon,
  SignalCellularConnectedNoInternet0Bar as DisconnectedIcon,
  SignalCellular4Bar as ConnectedIcon
} from '@mui/icons-material';
import axios from 'axios';

const ServerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [server, setServer] = useState(null);
  const [peers, setPeers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [qrDialog, setQrDialog] = useState(false);
  const [selectedPeer, setSelectedPeer] = useState(null);
  const [newPeer, setNewPeer] = useState({ 
    name: '', 
    allowed_ips_to_peer: '', 
    allowed_ips_from_peer: '' 
  });
  const [error, setError] = useState('');
  
  // Static routes states
  const [staticRoutes, setStaticRoutes] = useState([]);
  const [staticRouteDialog, setStaticRouteDialog] = useState(false);
  const [newStaticRoute, setNewStaticRoute] = useState({ destination: '', gateway: '' });
  
  // Edit states
  const [editServerDialog, setEditServerDialog] = useState(false);
  const [editPeerDialog, setEditPeerDialog] = useState(false);
  const [editingPeer, setEditingPeer] = useState(null);
  const [editingServer, setEditingServer] = useState({ name: '', address: '' });
  const [editingPeerData, setEditingPeerData] = useState({ 
    name: '', 
    allowed_ips_to_peer: '', 
    allowed_ips_from_peer: '' 
  });
  
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [statusLoading, setStatusLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(null);
  const [serverMenuAnchor, setServerMenuAnchor] = useState(null);

  useEffect(() => {
    fetchServerData();
    fetchConnectionStatus();
    
    // Auto refresh every 15 seconds if enabled
    let interval;
    if (autoRefresh) {
      interval = setInterval(() => {
        fetchConnectionStatus();
      }, 15000); // 15 seconds
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [id, autoRefresh, fetchServerData, fetchConnectionStatus]);

  const fetchServerData = async () => {
    try {
      const [serverResponse, peersResponse, routesResponse] = await Promise.all([
        axios.get(`/api/servers/${id}`),
        axios.get(`/api/servers/${id}/peers`),
        axios.get(`/api/servers/${id}/static-routes`)
      ]);
      
      setServer(serverResponse.data);
      setPeers(peersResponse.data);
      setStaticRoutes(routesResponse.data);
    } catch (error) {
      console.error('Error fetching server data:', error);
      setError('Greška pri učitavanju podataka servera');
    } finally {
      setLoading(false);
    }
  };

  const fetchConnectionStatus = async () => {
    try {
      setStatusLoading(true);
      const response = await axios.get(`/api/servers/${id}/connection-status`);
      setConnectionStatus(response.data);
      setLastRefresh(new Date());
      console.log('Status refreshed:', new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Error fetching connection status:', error);
    } finally {
      setStatusLoading(false);
    }
  };

  const handleCreatePeer = async () => {
    try {
      setError('');
      const response = await axios.post(`/api/servers/${id}/peers`, newPeer);
      
      setPeers([...peers, response.data]);
      setOpenDialog(false);
      setNewPeer({ name: '', allowed_ips_to_peer: '', allowed_ips_from_peer: '' });
      
      alert('Peer uspešno kreiran!');
    } catch (error) {
      setError(error.response?.data?.error || 'Greška pri kreiranju peer-a');
    }
  };

  const handleDeletePeer = async (peerId) => {
    if (window.confirm('Da li ste sigurni da želite da obrišete ovaj peer?')) {
      try {
        await axios.delete(`/api/servers/${id}/peers/${peerId}`);
        setPeers(peers.filter(peer => peer.id !== peerId));
        alert('Peer uspešno obrisan!');
      } catch (error) {
        setError('Greška pri brisanju peer-a');
      }
    }
  };

  const handleEditPeer = (peer) => {
    setEditingPeer(peer);
    setEditingPeerData({
      name: peer.name,
      allowed_ips_to_peer: peer.allowed_ips_to_peer || '',
      allowed_ips_from_peer: peer.allowed_ips_from_peer || ''
    });
    setEditPeerDialog(true);
  };

  const handleUpdatePeer = async () => {
    try {
      setError('');
      await axios.put(`/api/servers/${id}/peers/${editingPeer.id}`, editingPeerData);
      
      setPeers(peers.map(peer => 
        peer.id === editingPeer.id 
          ? { ...peer, name: editingPeerData.name, allowed_ips_to_peer: editingPeerData.allowed_ips_to_peer, allowed_ips_from_peer: editingPeerData.allowed_ips_from_peer }
          : peer
      ));
      
      setEditPeerDialog(false);
      setEditingPeer(null);
      setEditingPeerData({ name: '', allowed_ips_to_peer: '', allowed_ips_from_peer: '' });
      
      alert('Peer uspešno ažuriran!');
    } catch (error) {
      setError(error.response?.data?.error || 'Greška pri ažuriranju peer-a');
    }
  };

  const handleEditServer = () => {
    setEditingServer({
      name: server.name,
      address: server.address
    });
    setEditServerDialog(true);
  };

  const handleUpdateServer = async () => {
    try {
      setError('');
      const response = await axios.put(`/api/servers/${id}`, editingServer);
      
      setServer({
        ...server,
        name: editingServer.name,
        address: editingServer.address,
        interface_name: response.data.interface_name
      });
      
      setEditServerDialog(false);
      setEditingServer({ name: '', address: '' });
      
      alert('Server uspešno ažuriran!');
    } catch (error) {
      setError(error.response?.data?.error || 'Greška pri ažuriranju servera');
    }
  };

  const handleSoftDeleteServer = async () => {
    if (window.confirm('Da li ste sigurni da želite da onemogućite ovaj server? Peer-ovi će takođe biti onemogućeni.')) {
      try {
        await axios.post(`/api/servers/${id}/soft-delete`);
        setServer({ ...server, is_active: false });
        setPeers(peers.map(peer => ({ ...peer, is_active: false })));
        alert('Server uspešno onemogućen!');
      } catch (error) {
        setError('Greška pri onemogućavanju servera');
      }
    }
  };

  const handleRestoreServer = async () => {
    try {
      await axios.post(`/api/servers/${id}/restore`);
      setServer({ ...server, is_active: true });
      setPeers(peers.map(peer => ({ ...peer, is_active: true })));
      alert('Server uspešno obnovljen!');
    } catch (error) {
      setError('Greška pri obnavljanju servera');
    }
  };

  const handlePermanentDeleteServer = async () => {
    if (window.confirm('Da li ste sigurni da želite da trajno obrišete ovaj server? Ova akcija se ne može poništiti.')) {
      try {
        await axios.delete(`/api/servers/${id}/permanent-delete`);
        navigate('/servers');
        alert('Server trajno obrisan!');
      } catch (error) {
        setError('Greška pri trajnom brisanju servera');
      }
    }
  };

  // Static routes functions
  const handleCreateStaticRoute = async () => {
    try {
      setError('');
      const response = await axios.post(`/api/servers/${id}/static-routes`, newStaticRoute);
      
      setStaticRoutes([...staticRoutes, response.data]);
      setStaticRouteDialog(false);
      setNewStaticRoute({ destination: '', gateway: '' });
      
      alert('Statička ruta uspešno kreirana!');
    } catch (error) {
      setError(error.response?.data?.error || 'Greška pri kreiranju statičke rute');
    }
  };

  const handleDeleteStaticRoute = async (routeId) => {
    if (window.confirm('Da li ste sigurni da želite da obrišete ovu statičku rutu?')) {
      try {
        await axios.delete(`/api/servers/${id}/static-routes/${routeId}`);
        setStaticRoutes(staticRoutes.filter(route => route.id !== routeId));
        alert('Statička ruta uspešno obrisana!');
      } catch (error) {
        setError('Greška pri brisanju statičke rute');
      }
    }
  };

  const handleShowQR = (peer) => {
    setSelectedPeer(peer);
    setQrDialog(true);
  };

  const handleGeneratePersonalizedClient = async (peer) => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/generate-personalized-client`, {
        peer_id: peer.id
      });
      
      if (response.data.success) {
        // Preuzmi ZIP fajl
        const link = document.createElement('a');
        link.href = response.data.download_url;
        link.download = `wireguard-client-${response.data.client_id}.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        alert('Personalizovani klijent je uspešno generisan i preuzet!');
      }
    } catch (error) {
      console.error('Greška pri generisanju klijenta:', error);
      alert('Greška pri generisanju klijenta: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  // Funkcija za preuzimanje konfiguracije kao fajl
  const downloadConfig = (config, filename = "peer.conf") => {
    const blob = new Blob([config], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Zamena funkcije za kopiranje konfiguracije sa fallback-om
  const copyToClipboard = (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text)
        .then(() => alert('Konfiguracija kopirana u clipboard!'))
        .catch(() => alert('Kopiranje nije uspelo!'));
    } else {
      // Fallback za starije browsere
      let textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        alert('Konfiguracija kopirana u clipboard!');
      } catch (err) {
        alert('Kopiranje nije uspelo!');
      }
      document.body.removeChild(textArea);
    }
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatLastHandshake = (timestamp) => {
    if (!timestamp) return 'Nikad';
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} dana`;
    if (hours > 0) return `${hours} sati`;
    if (minutes > 0) return `${minutes} minuta`;
    return 'Sada';
  };

  const isRecentlyConnected = (timestamp) => {
    if (!timestamp) return false;
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    return diff < 300000; // 5 minutes
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography>Učitavanje...</Typography>
      </Box>
    );
  }

  if (!server) {
    return (
      <Alert severity="error">
        Server nije pronađen
      </Alert>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate('/servers')} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1">
          {server.name}
        </Typography>
        <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
          <Tooltip title={autoRefresh ? "Automatsko osvežavanje uključeno" : "Automatsko osvežavanje isključeno"}>
            <IconButton 
              onClick={() => setAutoRefresh(!autoRefresh)}
              color={autoRefresh ? "primary" : "default"}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Osveži status">
            <IconButton onClick={fetchConnectionStatus} disabled={statusLoading}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Uredi server">
            <IconButton onClick={handleEditServer}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Više opcija">
            <IconButton onClick={(e) => setServerMenuAnchor(e.currentTarget)}>
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Server Info - Horizontal at top */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {server.name}
                  </Typography>
                  <Chip 
                    label={server.is_active ? 'Aktivan' : 'Neaktivan'} 
                    color={server.is_active ? 'success' : 'default'} 
                    size="small"
                  />
                  {connectionStatus && (
                    <Chip 
                      label={connectionStatus.interface_status?.disabled === 'true' ? 'Onemogućen' : 'Omogućen'} 
                      color={connectionStatus.interface_status?.disabled === 'true' ? 'error' : 'success'} 
                      size="small"
                    />
                  )}
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Interface:</strong> {server.interface_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Port:</strong> {server.listen_port}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Adresa:</strong> {server.address}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PeopleIcon sx={{ fontSize: 16 }} />
                    <Typography variant="body2">
                      {peers.filter(p => p.is_active !== false).length} peer-ova
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Peers Section */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">
                  Peer-ovi
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Button
                    variant="outlined"
                    startIcon={<RefreshIcon />}
                    onClick={fetchConnectionStatus}
                    disabled={statusLoading}
                    size="small"
                  >
                    {statusLoading ? 'Osvežavanje...' : 'Osveži Status'}
                  </Button>
                  {lastRefresh && (
                    <Typography variant="caption" color="text.secondary" sx={{ alignSelf: 'center' }}>
                      Poslednje osvežavanje: {lastRefresh.toLocaleTimeString()}
                    </Typography>
                  )}
                  {server.is_active && (
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => setOpenDialog(true)}
                      size="small"
                    >
                      Dodaj Peer
                    </Button>
                  )}
                </Box>
              </Box>

              {peers.filter(p => p.is_active !== false).length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <PeopleIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    Još nema peer-ova
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Dodaj peer-ove da omogućiš pristup VPN-u
                  </Typography>
                  {server.is_active && (
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => setOpenDialog(true)}
                    >
                      Dodaj Prvi Peer
                    </Button>
                  )}
                </Box>
              ) : (
                <TableContainer component={Paper} variant="outlined" sx={{ overflowX: 'auto' }}>
                  <Table sx={{ minWidth: 1200 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ minWidth: 120 }}>Naziv</TableCell>
                        <TableCell sx={{ minWidth: 100 }}>IP Adresa</TableCell>
                                        <TableCell sx={{ minWidth: 200 }}>Allowed IPs (Server→Peer)</TableCell>
                <TableCell sx={{ minWidth: 200 }}>Allowed IPs (Peer→Server)</TableCell>
                        <TableCell sx={{ minWidth: 120 }}>Status</TableCell>
                        <TableCell sx={{ minWidth: 100 }}>Transfer</TableCell>
                        <TableCell sx={{ minWidth: 150 }}>Akcije</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                                              {peers.filter(p => p.is_active !== false).map((peer) => {
                          const peerStatus = connectionStatus?.peers?.find(p => p.id === peer.id);
                          const isConnected = peerStatus?.is_connected;
                          const isRecentlyConnectedStatus = isRecentlyConnected(peerStatus?.last_handshake);
                        
                        return (
                          <TableRow key={peer.id}>
                            <TableCell>{peer.name}</TableCell>
                            <TableCell>{peer.allowed_ips}</TableCell>
                            <TableCell>
                              <Typography variant="body2" sx={{ fontSize: '0.75rem', wordBreak: 'break-all' }}>
                                {peer.allowed_ips_to_peer || 'N/A'}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" sx={{ fontSize: '0.75rem', wordBreak: 'break-all' }}>
                                {peer.allowed_ips_from_peer || 'N/A'}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {isConnected && isRecentlyConnectedStatus ? (
                                  <ConnectedIcon color="success" sx={{ mr: 1 }} />
                                ) : isConnected ? (
                                  <ConnectedIcon color="warning" sx={{ mr: 1 }} />
                                ) : (
                                  <DisconnectedIcon color="error" sx={{ mr: 1 }} />
                                )}
                                <Chip 
                                  label={
                                    isConnected && isRecentlyConnectedStatus ? 'Povezan' :
                                    isConnected ? 'Povezan (staro)' :
                                    'Nepovezan'
                                  } 
                                  color={
                                    isConnected && isRecentlyConnectedStatus ? 'success' :
                                    isConnected ? 'warning' :
                                    'error'
                                  } 
                                  size="small" 
                                />
                              </Box>
                            </TableCell>
                            <TableCell>
                              {peerStatus ? (
                                <Box>
                                  <Typography variant="caption" display="block">
                                    ↓ {formatBytes(peerStatus.transfer_rx)}
                                  </Typography>
                                  <Typography variant="caption" display="block">
                                    ↑ {formatBytes(peerStatus.transfer_tx)}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {formatLastHandshake(peerStatus.last_handshake)}
                                  </Typography>
                                </Box>
                              ) : (
                                <Typography variant="caption" color="text.secondary">
                                  N/A
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <Tooltip title="Prikaži QR kod">
                                  <IconButton
                                    size="small"
                                    onClick={() => handleShowQR(peer)}
                                  >
                                    <QrCodeIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Kopiraj konfiguraciju">
                                  <IconButton
                                    size="small"
                                    onClick={() => copyToClipboard(peer.config)}
                                  >
                                    <CopyIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Preuzmi konfiguraciju">
                                  <IconButton
                                    size="small"
                                    onClick={() => downloadConfig(peer.config, `${peer.name || 'peer'}.conf`)}
                                  >
                                    <DownloadIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Generiši Personalizovani Klijent">
                                  <IconButton
                                    size="small"
                                    onClick={() => handleGeneratePersonalizedClient(peer)}
                                    color="primary"
                                  >
                                    <DownloadIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Uredi peer">
                                  <IconButton
                                    size="small"
                                    onClick={() => handleEditPeer(peer)}
                                  >
                                    <EditIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Obriši peer">
                                  <IconButton
                                    size="small"
                                    color="error"
                                    onClick={() => handleDeletePeer(peer.id)}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Static Routes - Admin Only - At the end */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">
                  Statičke Rute (Admin)
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setStaticRouteDialog(true)}
                >
                  Dodaj Statičku Rutu
                </Button>
              </Box>

              {staticRoutes.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <StorageIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    Još nema statičkih ruta
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Dodaj statičke rute za ovaj server
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setStaticRouteDialog(true)}
                  >
                    Dodaj Prvu Rutu
                  </Button>
                </Box>
              ) : (
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Destinacija</TableCell>
                        <TableCell>Gateway</TableCell>
                        <TableCell>Kreirano</TableCell>
                        <TableCell>Akcije</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {staticRoutes.map((route) => (
                        <TableRow key={route.id}>
                          <TableCell>{route.destination}</TableCell>
                          <TableCell>{route.gateway}</TableCell>
                          <TableCell>
                            {new Date(route.created_at).toLocaleDateString('sr-RS')}
                          </TableCell>
                          <TableCell>
                            <Tooltip title="Obriši rutu">
                              <IconButton
                                size="small"
                                onClick={() => handleDeleteStaticRoute(route.id)}
                                color="error"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Create Peer Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Dodaj Novi Peer</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Naziv Peer-a"
              value={newPeer.name}
              onChange={(e) => setNewPeer({ ...newPeer, name: e.target.value })}
              margin="normal"
              required
              helperText="Unesite opisni naziv za peer (npr. 'Mobilni telefon', 'Laptop')"
            />
            <TextField
              fullWidth
              label="Allowed IPs od Server-a ka peer-u"
              value={newPeer.allowed_ips_to_peer}
              onChange={(e) => setNewPeer({ ...newPeer, allowed_ips_to_peer: e.target.value })}
              margin="normal"
              helperText="Adrese koje Server može da šalje ka peer-u (npr. '192.168.1.0/24, 10.0.0.0/8'). Ostavite prazno za automatsku dodelu."
            />
            <TextField
              fullWidth
              label="Allowed IPs od peer-a ka Server-u"
              value={newPeer.allowed_ips_from_peer}
              onChange={(e) => setNewPeer({ ...newPeer, allowed_ips_from_peer: e.target.value })}
              margin="normal"
              helperText="Adrese koje peer može da šalje ka Server-u (npr. '0.0.0.0/0' za sve adrese). Ostavite prazno za '0.0.0.0/0'."
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>
            Otkaži
          </Button>
          <Button 
            onClick={handleCreatePeer}
            variant="contained"
            disabled={!newPeer.name}
          >
            Dodaj Peer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Peer Dialog */}
      <Dialog open={editPeerDialog} onClose={() => setEditPeerDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Uredi Peer</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Naziv Peer-a"
              value={editingPeerData.name}
              onChange={(e) => setEditingPeerData({ ...editingPeerData, name: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Allowed IPs od Server-a ka peer-u"
              value={editingPeerData.allowed_ips_to_peer}
              onChange={(e) => setEditingPeerData({ ...editingPeerData, allowed_ips_to_peer: e.target.value })}
              margin="normal"
              helperText="Adrese koje Server može da šalje ka peer-u"
            />
            <TextField
              fullWidth
              label="Allowed IPs od peer-a ka Server-u"
              value={editingPeerData.allowed_ips_from_peer}
              onChange={(e) => setEditingPeerData({ ...editingPeerData, allowed_ips_from_peer: e.target.value })}
              margin="normal"
              helperText="Adrese koje peer može da šalje ka Server-u"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditPeerDialog(false)}>
            Otkaži
          </Button>
          <Button 
            onClick={handleUpdatePeer}
            variant="contained"
            disabled={!editingPeerData.name}
          >
            Sačuvaj
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Static Route Dialog */}
      <Dialog open={staticRouteDialog} onClose={() => setStaticRouteDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Dodaj Statičku Rutu</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Destinacija (npr. 192.168.1.0/24)"
              value={newStaticRoute.destination}
              onChange={(e) => setNewStaticRoute({ ...newStaticRoute, destination: e.target.value })}
              margin="normal"
              required
              helperText="Unesite adresni opseg sa subnetom"
            />
            <TextField
              fullWidth
              label="Gateway (npr. 10.0.0.1)"
              value={newStaticRoute.gateway}
              onChange={(e) => setNewStaticRoute({ ...newStaticRoute, gateway: e.target.value })}
              margin="normal"
              required
              helperText="Unesite gateway preko kojeg će ići ove adrese"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStaticRouteDialog(false)}>
            Otkaži
          </Button>
          <Button 
            onClick={handleCreateStaticRoute}
            variant="contained"
            disabled={!newStaticRoute.destination || !newStaticRoute.gateway}
          >
            Dodaj Rutu
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
        onClose={() => setServerMenuAnchor(null)}
      >
        {server.is_active ? (
          <MenuItem onClick={handleSoftDeleteServer}>
            <ListItemIcon>
              <BlockIcon fontSize="small" />
            </ListItemIcon>
            Onemogući Server
          </MenuItem>
        ) : (
          <MenuItem onClick={handleRestoreServer}>
            <ListItemIcon>
              <RestoreIcon fontSize="small" />
            </ListItemIcon>
            Obnovi Server
          </MenuItem>
        )}
        <MenuItem onClick={handlePermanentDeleteServer} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <DeleteForeverIcon fontSize="small" color="error" />
          </ListItemIcon>
          Trajno Obriši
        </MenuItem>
      </Menu>

      {/* QR Code Dialog */}
      <Dialog open={qrDialog} onClose={() => setQrDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>QR Kod za {selectedPeer?.name}</DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 2 }}>
            {selectedPeer?.qr_code && (
              <img 
                src={`data:image/png;base64,${selectedPeer.qr_code}`} 
                alt="QR Code" 
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setQrDialog(false)}>
            Zatvori
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ServerDetail; 