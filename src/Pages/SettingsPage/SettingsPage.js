import React, { useState, useEffect } from 'react'; 
import {
  Box,
  Button,
  Card,
  Grid,
  TextField,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Drawer,
  AppBar,
  Toolbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuIcon from '@mui/icons-material/Menu';
import { v4 as uuidv4 } from 'uuid';
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { CircleNotifications } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchServers,
  addServer,
  deleteServer,
  fetchCompanyInfo,
  updateCompanyInfo,
} from '../../features/settingsSlice'; // Adjust the import path as necessary

const SettingsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { companyId } = useParams();
  const { servers, companyInfo, isAuthenticated, deleteServerStatus } = useSelector((state) => state.main);
  
  const [timer, setTimer] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCompanyInfo, setEditedCompanyInfo] = useState({
    _id: '',
    name: '',
    address: '',
    phone: '',
  });
  const [socket, setSocket] = useState(null);
  const [matchedServers, setMatchedServers] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New loading state

  useEffect(() => {
    if (deleteServerStatus === 'succeeded') {
      setTimer(true);
      const timerId = setTimeout(() => {
        setTimer(false);
      }, 3000);
      return () => clearTimeout(timerId); // Cleanup timeout on unmount
    }
  }, [deleteServerStatus]);

  useEffect(() => {
    const newSocket = io('https://queue-model-server.onrender.com', {
      query: {
        adminData: JSON.stringify({
          companyId: companyId,
        }),
      },
    });

    setSocket(newSocket);

    newSocket.on('online', (data) => {
      const activeIds = servers.map((item) => item._id);
      const activeServers = activeIds.filter((serverId) =>
        data.active.includes(serverId)
      );
      setMatchedServers(activeServers);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [companyId, servers]);

  const generateServer = async () => {
    setIsLoading(true); // Start loading
    try {
      const newServer = {
        companyId,
        serverId: uuidv4().slice(0, 8),
      };
      await dispatch(addServer(newServer)); // Dispatch action to add server
    } catch (error) {
      console.error('Error adding server:', error);
    } finally {
      setIsLoading(false); // End loading after success or failure
    }
  };

  const removeServer = async (serverId) => {
    dispatch(deleteServer(serverId)); // Dispatch action to delete server
  };

  const handleEditToggle = () => {
    if (!isEditing) {
      // Populate editedCompanyInfo with current companyInfo when starting edit
      setEditedCompanyInfo(companyInfo);
    }
    setIsEditing(!isEditing);
  };

  const fetchCompanyInfoData = async () => {
    await dispatch(fetchCompanyInfo(companyId)); // Fetch company info using Redux
  };

  useEffect(() => {
    dispatch(fetchServers(companyId)); // Fetch servers on component mount
    fetchCompanyInfoData();
  }, [dispatch, companyId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCompanyInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const payload = {
      ...editedCompanyInfo,
      _id: editedCompanyInfo._id, // Ensure _id is explicitly included
    };
    try {
      await dispatch(updateCompanyInfo(payload));
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating company info:', error);
    }
  };

  // Handle logout
  const handleLogout = () => {
    navigate('/login'); // Redirect to the login page
  };

  // Drawer Toggle
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button onClick={handleLogout}>
          <ListItemText primary="Logout" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Customers Being Served" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div className="app-container">
      <AppBar position="static" sx={{ width: '100%' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawer}
      </Drawer>

      <Box sx={{ padding: 4, width: '100%', margin: '0 auto' }}>
        <Grid container spacing={2}>
          {/* Server Management */}
          <Grid item xs={12} md={6}>
            <Card sx={{ padding: 3 }}>
              <Button
                variant="contained"
                onClick={generateServer}
                fullWidth
                sx={{ mb: 2 }}
                disabled={isLoading} 
              >
                Add Server
              </Button>
              <List>
                {servers.map((server) => (
                  <ListItem
                    key={server._id} // Use server ID as the key
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => removeServer(server._id)} // Pass server ID
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemIcon>
                      <CircleNotifications
                        sx={{
                          color: matchedServers.includes(server._id) ? 'green' : 'red',
                          fontSize: '16px',
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={`Server Id: ${server.serverNumber}`} />
                  </ListItem>
                ))}
              </List>
              
              {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                  <CircularProgress />
                </Box>
              )}

              {timer && (
                <Box mt={4}>
                  <Alert severity="success">Deletion was successful</Alert>
                </Box>
              )}
            </Card>
          </Grid>

          {/* Company Information */}
          <Grid item xs={12} md={6}>
            <Card sx={{ padding: 3, width: '100%' }}>
              {isEditing ? (
                <>
                  <TextField
                    label="Company ID"
                    value={editedCompanyInfo._id}
                    onChange={handleInputChange}
                    name="_id"
                    fullWidth
                    sx={{ mb: 2 }}
                    disabled
                  />
                  <TextField
                    label="Name"
                    value={editedCompanyInfo.name}
                    onChange={handleInputChange}
                    name="name"
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Address"
                    value={editedCompanyInfo.address}
                    onChange={handleInputChange}
                    name="address"
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Phone"
                    value={editedCompanyInfo.phone}
                    onChange={handleInputChange}
                    name="phone"
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <Grid container spacing={2} direction={{ xs: 'column', sm: 'row' }} justifyContent="center">
                    <Grid item>
                      <Button variant="contained" onClick={handleSave}>
                        Save
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="outlined" onClick={handleEditToggle}>
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <>
                  <Typography variant="h6">Name: {companyInfo.name}</Typography>
                  <Typography variant="h6">Address: {companyInfo.address}</Typography>
                  <Typography variant="h6">Phone: {companyInfo.phone}</Typography>
                  <Button variant="contained" onClick={handleEditToggle} sx={{ mt: 2 }}>
                    Edit
                  </Button>
                </>
              )}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default SettingsPage;
