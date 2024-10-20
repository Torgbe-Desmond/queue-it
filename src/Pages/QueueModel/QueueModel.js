import React from 'react';
import { Card, Avatar, Typography, Box, Chip, Grid, Stack } from '@mui/material';
import { green, yellow, red } from '@mui/material/colors';
import './QueueModel.css'

const QueueItem = ({ name, imageUrl, status }) => {
  // Determine the color and label based on the status
  const getStatusDetails = (status) => {
    switch (status) {
      case 'active':
        return { color: green[500], label: 'Being Served' };
      case 'about-to-be-served':
        return { color: yellow[500], label: 'About to be Served' };
      case 'waiting':
      default:
        return { color: red[500], label: 'Waiting' };
    }
  };

  const { color, label } = getStatusDetails(status);

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 1.5, // Reduce padding for a more compact look
        mb: 1.5,
        borderRadius: 2,
        backgroundColor: `${color}22`, // Slightly lighter background
        border: `1px solid ${color}`, // Border matching the status color
        height: '100px', // Reduce height of each item
        marginTop:'200px'
      }}
    >
      <Avatar alt={name} src={imageUrl} sx={{ width: 50, height: 50, marginRight: 2 }} /> {/* Smaller avatar */}
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" sx={{ fontSize: '1rem' }}>
          {name}
        </Typography>
        <Chip
          label={label}
          sx={{
            backgroundColor: color,
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '0.8rem',
          }}
        />
      </Box>
    </Card>
  );
};

const QueueModel = () => {
  const queue = [
    { id: 1, name: 'John Doe', imageUrl: 'https://via.placeholder.com/150', status: 'active' },
    { id: 4, name: 'Emily Davis', imageUrl: 'https://via.placeholder.com/150', status: 'active' },
  ];

  return (
    <div className=''>
    <Box sx={{ padding: 4, width: '90%', margin: '100px auto' }}>
      <Typography variant="h4" gutterBottom>
        Current Queue
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack
            sx={{
              maxHeight: '100vh', // Max height for the stack
              overflowY: 'auto', // Enable scrolling
              paddingRight: '10px', // Add padding for better scroll visibility
              contain:'content',
              boxSizing:'border-box'
            }}
          >
            {queue.map((user) => (
              <QueueItem key={user.id} name={user.name} imageUrl={user.imageUrl} status={user.status} />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Box>
    </div>
  );
};

export default QueueModel;
