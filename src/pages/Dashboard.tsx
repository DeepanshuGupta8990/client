import React from "react";
import { Grid, Paper, Typography } from "@mui/material";

import TopVulnerabilityChart from "../panels/TopVulnerabilityChart";
import MostAffectedPackageChart from "../panels/MostAffectedPackageChart";
import MostAffectedPatchesChart from "../panels/MostAffectedPatchesChart";
import VulnerabilityCpeDistributionChart from "../panels/VulnerabilityCpeDistributionChart";
import TopCweChart from "../panels/TopCweChart";
import TopExploitsChart from "../panels/TopExploitsChart";
import TopTrendingVulnerabilityChart from "../panels/TopTrendingVulnerabilityChart";
import VulnerabilityDisclosureChart from "../panels/VulnerabilityDisclosureChart";
import HistoricGrowthTrendVulnChart from "../panels/HistoricGrowthTrendVulnChart";
import ExploitGrowthTrendChart from "../panels/ExploitGrowthTrendChart";
import ExploitMaturityChart from "../panels/ExploitMaturityChart";
import HistoricGrowthTrendPackageVulnChart from "../panels/HistoricGrowthTrendPackageVulnChart";

const Dashboard: React.FC = () => {
  return (
    <div>
      {/* Panel Row 1 */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper>
            <Typography style={{ padding: 20 }} variant="h6">
              CVE Top Vulnerability
            </Typography>
            <TopVulnerabilityChart />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper>
            <Typography style={{ padding: 20 }} variant="h6">
              Top 10 Exploits
            </Typography>
            <TopExploitsChart />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">Top CWEs</Typography>
            <TopCweChart />
          </Paper>
        </Grid>
      </Grid>

      {/* Panel Row 2 */}
      <Grid container spacing={3} style={{ padding: "20px 0px" }}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">Most Affected Patches Vendors</Typography>
            <MostAffectedPatchesChart />
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
            <Typography variant="h6">Vulnerability CPE Distribution</Typography>
            <VulnerabilityCpeDistributionChart />
          </Paper>
        </Grid>
      </Grid>

      {/* Panel Row 3 */}
      <Grid container spacing={3} style={{ padding: "20px 0px" }}>
      <Grid item xs={12} sm={6} md={4}>
          <Paper >
            <Typography variant="h6" style={{ padding: 20 }}>
              Vulnerabilities with Recent Disclosures
            </Typography>
            <VulnerabilityDisclosureChart />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper >
            <Typography style={{ padding: 20 }} variant="h6">Exploit Maturity Exploits</Typography>
            <ExploitMaturityChart />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper>
            <Typography style={{ padding: 20 }} variant="h6">Top Trending Vulnerabilities</Typography>
            <TopTrendingVulnerabilityChart />
          </Paper>
        </Grid>
      </Grid>

      {/* Panel Row 4 */}
      <Grid container spacing={3} style={{ padding: 20 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">
              Exploit Growth Trend of Vulnerabilities
            </Typography>
            <ExploitGrowthTrendChart />
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">
              Historical Growth Trend of Package Vulnerability
            </Typography>
            <HistoricGrowthTrendPackageVulnChart />
          </Paper>
        </Grid>
      </Grid>

      {/* Panel Row 5 */}
      <Grid container spacing={3} style={{ padding: 20 }}>
        <Grid item xs={12} sm={6} md={12}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">
              Historical Growth Trend of Vulnerabilities Over Time
            </Typography>
            <HistoricGrowthTrendVulnChart />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
