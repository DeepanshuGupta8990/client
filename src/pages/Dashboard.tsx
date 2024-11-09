import React from 'react';
import { 
  Grid, 
  Paper, 
  Typography
} from '@mui/material';

import TopCweChart from '../panels/TopCweChart';
import TopExploitsChart from '../panels/TopExploitsChart';
import MostAffectedPackageChart from '../panels/MostAffectedPackageChart';
import VulnerabilityCpeDistributionChart from '../panels/VulnerabilityCpeDistributionChart';
import TopVulnerabilityChart from '../panels/TopVulnerabilityChart';
import TopTrendingVulnerabilityChart from '../panels/TopTrendingVulnerabilityChart';
import VulnerabilityDisclosureChart from '../panels/VulnerabilityDisclosureChart';

const Dashboard: React.FC = () => {

  return (
    <div>
      <h2>Dashboard</h2>
      <Grid container spacing={3} style={{ padding: 20 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">CVE Top Vulnerability</Typography>
            <TopVulnerabilityChart />
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

      <Grid container spacing={3} style={{ padding: 20}} >
        <Grid item xs={12} sm={6} md={8}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">Top Trending Vulnerabilities</Typography>
            <TopTrendingVulnerabilityChart />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">Vulnerabilities with Recent Disclosures</Typography>
            <VulnerabilityDisclosureChart />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;