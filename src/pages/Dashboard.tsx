import React from 'react';
import { 
  Grid, 
  Paper, 
  Typography
} from '@mui/material';
import XPieChart from '../components/XPieChart';

import {config} from '../config';
import XHistogramChart from '../components/XHistogramChart';


const Dashboard: React.FC = () => {
  const PATCHES_CVE_API = config.authApiUrl + "/reports/patches/cve"
  const PACKAGES_CVE_API = config.authApiUrl + "/reports/packages/cve"
  const WEB_SECURITY_API = config.authApiUrl + "/reports/wasc/cwe"

  return (
    <div>
      <h2>Dashboard</h2>
      <Grid container spacing={3} style={{ padding: 20 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">Patches</Typography>
            <XPieChart apiUrl={PATCHES_CVE_API}/>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">Packages</Typography>
            <XPieChart apiUrl={PACKAGES_CVE_API}/>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">Web Security</Typography>
            <XPieChart apiUrl={WEB_SECURITY_API}/>
          </Paper>
        </Grid>
        {/* <Grid item xs={12} sm={6} md={3}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">Panel 4</Typography>
            <Typography>Content for Panel 4</Typography>
          </Paper>
        </Grid> */}
      </Grid>
      <Grid container spacing={3} style={{ padding: 20}} >
      <Grid item xs={12} sm={6} md={4}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">TODO</Typography>
            <XHistogramChart />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;