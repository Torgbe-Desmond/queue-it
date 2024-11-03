import React from 'react';
import { Grid, Card, CardContent, Typography, Avatar, Divider } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TimerIcon from '@mui/icons-material/Timer';

// Dummy data for company and queue stats
const companyInfo = {
  name: "QueueMaster Inc.",
  location: "1234 Queue St, Queue City, QZ",
  contactEmail: "support@queuemaster.com",
  contactPhone: "+1 (555) 012-3456"
};

const queueStats = {
  totalServers: 8,
  activeServers: 5,
  waitingCustomers: 12,
  completedServicesToday: 34,
  averageWaitTime: "15 mins"
};

const DashboardPage = () => {
  return (
    <Grid container spacing={3} padding={3}>
      {/* Company Information */}
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Company Details</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="h5">{companyInfo.name}</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <BusinessIcon fontSize="small" sx={{ mr: 1 }} /> {companyInfo.location}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <EmailIcon fontSize="small" sx={{ mr: 1 }} /> {companyInfo.contactEmail}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <PhoneIcon fontSize="small" sx={{ mr: 1 }} /> {companyInfo.contactPhone}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Queue Statistics */}
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Queue Overview</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <PeopleIcon fontSize="small" sx={{ mr: 1 }} /> Active Servers: {queueStats.activeServers} / {queueStats.totalServers}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <TimerIcon fontSize="small" sx={{ mr: 1 }} /> Waiting Customers: {queueStats.waitingCustomers}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <CheckCircleOutlineIcon fontSize="small" sx={{ mr: 1 }} /> Completed Today: {queueStats.completedServicesToday}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <TimerIcon fontSize="small" sx={{ mr: 1 }} /> Avg Wait Time: {queueStats.averageWaitTime}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Quick Actions */}
      <Grid item xs={12} sm={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Recent Activities</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              - Customer #102 completed service on Server Alpha
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              - Server Beta set to maintenance mode
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              - Customer #203 started session on Server Delta
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              - Server Epsilon added to the queue
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DashboardPage;
