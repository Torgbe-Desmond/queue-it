import React, { useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, Box, TextField } from '@mui/material';

// Mock data for directories
const directories = [
    { id: 1, name: 'Folder 1', mimetype: 'Folder', size: 0 },
    { id: 2, name: 'File 1', mimetype: 'File', size: 150 },
    { id: 3, name: 'Folder 2', mimetype: 'Folder', size: 0 },
    { id: 4, name: 'File 2', mimetype: 'File', size: 300 },
];

const Directory = () => {
    const [editId, setEditId] = useState(null);
    const [newName, setNewName] = useState('');

    const handleDelete = (id) => {
        console.log(`Delete directory with id: ${id}`);
        // Add delete logic here
    };

    const handleRename = (id) => {
        console.log(`Rename directory with id: ${id} to ${newName}`);
        // Add rename logic here
        setEditId(null);
    };

    const handleMove = (id) => {
        console.log(`Move directory with id: ${id}`);
        // Add move logic here
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Directories
            </Typography>
            <Grid container spacing={2}>
                {directories.map((directory) => (
                    <Grid item xs={12} sm={6} md={4} key={directory.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{directory.name}</Typography>
                                <Typography color="textSecondary">{directory.mimetype}</Typography>
                                <Typography color="textSecondary">Size: {directory.size} KB</Typography>
                                {editId === directory.id ? (
                                    <TextField
                                        label="New Name"
                                        variant="outlined"
                                        size="small"
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        fullWidth
                                    />
                                ) : null}
                            </CardContent>
                            <CardActions>
                                {editId === directory.id ? (
                                    <>
                                        <Button
                                            size="small"
                                            color="primary"
                                            onClick={() => handleRename(directory.id)}
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            size="small"
                                            color="secondary"
                                            onClick={() => setEditId(null)}
                                        >
                                            Cancel
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            size="small"
                                            color="primary"
                                            onClick={() => setEditId(directory.id)}
                                        >
                                            Rename
                                        </Button>
                                        <Button
                                            size="small"
                                            color="secondary"
                                            onClick={() => handleDelete(directory.id)}
                                        >
                                            Delete
                                        </Button>
                                        <Button
                                            size="small"
                                            color="default"
                                            onClick={() => handleMove(directory.id)}
                                        >
                                            Move
                                        </Button>
                                    </>
                                )}
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Directory;
