import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';

// Dummy data for servers
const mockServers = [
  {
    id: '1',
    name: 'Server Alpha',
    status: 'Online',
    currentCustomer: 'Customer 101',
    queueNumber: 1,
    serviceDuration: 12, // in minutes
    idleTime: 3,         // in minutes
  },
  {
    id: '2',
    name: 'Server Beta',
    status: 'Busy',
    currentCustomer: 'Customer 202',
    queueNumber: 2,
    serviceDuration: 25,
    idleTime: 0,
  },
  {
    id: '3',
    name: 'Server Gamma',
    status: 'Offline',
    currentCustomer: null,
    queueNumber: null,
    serviceDuration: null,
    idleTime: null,
  },
  {
    id: '4',
    name: 'Server Delta',
    status: 'Busy',
    currentCustomer: 'Customer 303',
    queueNumber: 3,
    serviceDuration: 30,
    idleTime: 1,
  },
  {
    id: '5',
    name: 'Server Epsilon',
    status: 'Online',
    currentCustomer: null,
    queueNumber: 4,
    serviceDuration: 0,
    idleTime: 5,
  },
  {
    id: '6',
    name: 'Server Zeta',
    status: 'Offline',
    currentCustomer: null,
    queueNumber: null,
    serviceDuration: null,
    idleTime: null,
  },
  {
    id: '7',
    name: 'Server Eta',
    status: 'Busy',
    currentCustomer: 'Customer 404',
    queueNumber: 5,
    serviceDuration: 10,
    idleTime: 0,
  },
  {
    id: '8',
    name: 'Server Theta',
    status: 'Online',
    currentCustomer: 'Customer 505',
    queueNumber: 6,
    serviceDuration: 15,
    idleTime: 2,
  },
];

// Server status colors
const statusColors = {
  Online: 'success',
  Busy: 'warning',
  Offline: 'default',
};

const ServersPage = () => {
  return (
    <TableContainer sx={{marginTop:10}} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Server Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Current Customer</TableCell>
            <TableCell>Queue Number</TableCell>
            <TableCell>Service Duration (min)</TableCell>
            <TableCell>Idle Time (min)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockServers.map((server) => (
            <TableRow key={server.id}>
              <TableCell>{server.name}</TableCell>
              <TableCell>
                <Chip
                  label={server.status}
                  color={statusColors[server.status]}
                  variant="outlined"
                />
              </TableCell>
              <TableCell>{server.currentCustomer || 'N/A'}</TableCell>
              <TableCell>{server.queueNumber ?? 'N/A'}</TableCell>
              <TableCell>{server.serviceDuration ?? 'N/A'}</TableCell>
              <TableCell>{server.idleTime ?? 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ServersPage;
