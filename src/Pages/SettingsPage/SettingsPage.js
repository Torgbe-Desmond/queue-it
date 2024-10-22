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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
  const { companyId } = useParams();
  const { servers, companyInfo } = useSelector((state) => state.main);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCompanyInfo, setEditedCompanyInfo] = useState({
    _id: '',
    name: '',
    address: '',
    phone: '',
  });
  const [socket, setSocket] = useState(null);
  const [matchedServers, setMatchedServers] = useState([]);

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
    const newServer = {
      companyId,
      serverId: uuidv4().slice(0, 8),
    };
    await dispatch(addServer(newServer)); // Dispatch action to add server
  };

  const removeServer = async (serverId) => {
    await dispatch(deleteServer(serverId)); // Dispatch action to delete server
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
    await dispatch(updateCompanyInfo(editedCompanyInfo)); // Update company info
    setIsEditing(false);
  };

  return (
    <div className="app-container">
      <Box sx={{ padding: 4, width: '100%', margin: '0 auto' }}>
        <Typography variant="h4" gutterBottom>
          Company Settings
        </Typography>
        <Grid container spacing={2}>
          {/* Server Management */}
          <Grid item xs={12} md={6}>
            <Card sx={{ padding: 3 }}>
              <Typography variant="h6">Manage Servers</Typography>

              <Button
                variant="contained"
                onClick={generateServer}
                fullWidth
                sx={{ mb: 2 }}
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
                    <ListItemText
                      primary={`Server Id: ${server.serverNumber}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>

          {/* Company Information */}
          <Grid item xs={12} md={6}>
            <Card sx={{ padding: 3 }}>
              <Typography variant="h6">Company Information</Typography>

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
                  <Button
                    variant="contained"
                    onClick={handleSave}
                    sx={{ mr: 2 }}
                  >
                    Save
                  </Button>
                  <Button variant="outlined" onClick={handleEditToggle}>
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong>Name:</strong> {companyInfo.name}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong>Address:</strong> {companyInfo.address}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong>Phone:</strong> {companyInfo.phone}
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={handleEditToggle}
                    sx={{ mt: 2 }}
                  >
                    Edit
                  </Button>
                </>
              )}
            </Card>
          </Grid>
        </Grid>

        {/* Company Metrics */}
        {/* <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Company Metrics</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Card sx={{ padding: 2 }}>
                <Typography variant="body1">Companies Served: {companyDetails.companiesServed}</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ padding: 2 }}>
                <Typography variant="body1">Service Rate: {companyDetails.serviceRate}</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ padding: 2 }}>
                <Typography variant="body1">Arrival Rate: {companyDetails.arrivalRate}</Typography>
              </Card>
            </Grid>
          </Grid>
        </Box> */}
      </Box>
    </div>
  );
};

export default SettingsPage;
