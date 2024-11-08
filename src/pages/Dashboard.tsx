import React from 'react';
import { 
  Grid, 
  Paper, 
  Typography
} from '@mui/material';
import XPieChart from '../components/XPieChart';

import {config} from '../config';
import XHistogramChart from '../components/XHistogramChart';
import TopCweChart from '../panels/TopCweChart';
import TopExploitsChart from '../panels/TopExploitsChart';
import MostAffectedPackageChart from '../panels/MostAffectedPackageChart';
import VulnerabilityCpeDistributionChart from '../panels/VulnerabilityCpeDistributionChart';

const Dashboard: React.FC = () => {
  const CVE_VULN_API = config.vfeedApiUrl + "/reports/cve/vulnerabilities"

  return (
    <div>
      <h2>Dashboard</h2>
      <Grid container spacing={3} style={{ padding: 20 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">CVE Top Vulnerability</Typography>
            <XHistogramChart apiUrl={CVE_VULN_API}/>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">Most Affected Package Vendors</Typography>
            <MostAffectedPackageChart />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">Most Affected Patches Vendors</Typography>
            <MostAffectedPackageChart />
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3} style={{ padding: 20}} >
        <Grid item xs={12} sm={6} md={4}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">Vulnerability CPE Distribution</Typography>
            <VulnerabilityCpeDistributionChart />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">Top 10 CWE</Typography>
            <TopCweChart />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">Top 10 Exploits</Typography>
            <TopExploitsChart />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;