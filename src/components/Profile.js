import React from 'react';
import { Box, Button, List, ListItem, Typography } from '@mui/material';

const Profile = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Profile
      </Typography>
      <List>
        <ListItem>
          <Button fullWidth variant="contained">Personal Data</Button>
        </ListItem>
        <ListItem>
          <Button fullWidth variant="outlined">Logout</Button>
        </ListItem>
        <ListItem>
          <Button fullWidth variant="contained" color="error">Delete Account</Button>
        </ListItem>
      </List>
    </Box>
  );
};

export default Profile;
