import React, { useEffect } from 'react';
import { Card, Avatar, Typography, Box, Button, Alert, LinearProgress, Grid } from '@mui/material';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  startLoading,
  stopLoading,
  connectServer,
  disconnectServer,
  receiveCustomer,
  serverIdle,
  doneServing,
  getServerDetails
} from '../features/serverSlice'; // Adjust the path to where cardSlice.js is located
import './component.css';

const CardItem = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    hasReceivedCustomer,
    serverMessage,
    messageType,
    isOnline,
    customerData,
    serverDetails,
  } = useSelector((state) => state.card);

  const { serverId } = useParams();

  const socketRef = React.useRef(null); // Using ref to persist socket connection

  useEffect(() => {
    dispatch(getServerDetails({ serverId }));
  }, [serverId]);

  const handleConnect = () => {
    dispatch(startLoading());
    dispatch(connectServer());
    if (serverDetails) {
      socketRef.current = io('https://queue-model-server.onrender.com', {
        query: {
          serverData: JSON.stringify({
            serverId: serverDetails.serverId,
            companyId: serverDetails.companyId,
          }),
        },
      });
    }

    socketRef.current.on('Channel', (data) => {
      dispatch(receiveCustomer(data.customerInfo));
    });

    socketRef.current.on('serverIdle', (data) => {
      dispatch(serverIdle(data));
    });
  };

  const handleDisconnect = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
    dispatch(disconnectServer());
  };

  const handleDoneServing = () => {
    dispatch(doneServing());
    if (socketRef.current) {
      socketRef.current.emit('endService', { companyId: serverDetails.companyId, serverId });
    }
  };

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect(); // Clean up on unmount
      }
    };
  }, []);

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Card sx={{ textAlign: 'center', paddingBottom: 2 }}>
          {isLoading && isOnline ? (
            <Box sx={{ width: '100%' }}>
              <LinearProgress />
              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Waiting for a customer...
              </Typography>
            </Box>
          ) : hasReceivedCustomer ? (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                 <img
                   alt="Customer Avatar"
                   src={`${customerData?.image?.url}`} // Placeholder image URL, replace with actual image
                   style={{
                     width: '100%', // Take full width of the card
                     height: 'auto', // Maintain aspect ratio
                    //  maxWidth: '300px', // Optional: limit the max width if needed
                   }}
                 />
               </Box>

              <Typography variant="h6">{customerData?.username}</Typography>
              <Typography variant="subtitle2" color="textSecondary">
                Customer Details
              </Typography>
              <Button variant="contained" color="primary" onClick={handleDoneServing} sx={{ marginTop: 2 }}>
                Done Serving
              </Button>
            </>
          ) : (
            <Typography variant="body2">Connect to start serving</Typography>
          )}

          {serverMessage && (
            <Box mt={4}>
              <Alert severity={messageType} sx={{ mb: 2, margin:2 }}>
                {serverMessage}
              </Alert>
            </Box>
          )}

          <Box sx={{ marginTop: 3, textAlign: 'center' }}>
            {isOnline ? (
              <Button variant="outlined" color="secondary" onClick={handleDisconnect}>
                Disconnect
              </Button>
            ) : (
              <Button variant="outlined" color="primary" onClick={handleConnect}>
                Connect
              </Button>
            )}
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CardItem;
