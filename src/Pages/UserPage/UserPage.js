import React from 'react';
import { Grid, Card, CardMedia, CardContent, Button, Typography } from '@mui/material';

const users = [
  { id: 1, name: 'John Doe', image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Jane Smith', image: 'https://via.placeholder.com/150' },
  // Add more users as needed
];

const UsersPage = () => {
  return (
    <Grid container spacing={2}>
      {users.map((user) => (
        <Grid item xs={12} sm={6} md={4} key={user.id}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={user.image}
              alt={user.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {user.name}
              </Typography>
              <Button variant="contained" fullWidth>
                {user.name}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default UsersPage;
