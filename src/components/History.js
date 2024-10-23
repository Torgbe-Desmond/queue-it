import React, { useState } from 'react';
import { Box, TextField, List, ListItem, Typography } from '@mui/material';

const History = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const histories = [
    'History 1',
    'History 2',
    'History 3',
    'History 4',
  ];

  const filteredHistories = histories.filter(history =>
    history.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        History
      </Typography>
      <TextField
        fullWidth
        label="Search History"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <List>
        {filteredHistories.map((history, index) => (
          <ListItem key={index}>
            {history}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default History;
