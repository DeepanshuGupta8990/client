import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import MostAffectedPatchesChart from "../panels/MostAffectedPatchesChart"; // Your custom component for the third chart
import { config } from "../config"; // Configuration file that holds API URLs
import XLineChart from "../components/XLineChart";
import XAreaChart from "../components/XAreaChart";

const TrendsPage = () => {
  // First Chart Config (Vulnerability Disclosures)
  const first = {
    apiUrl: config.vfeedApiUrl + "/reports/recent-vuln-disclosures", // API endpoint for recent vuln disclosures
    dataKeys: ["cvss_score"], // Data key to show on the chart (could be any key from the API response)
    xAxisKey: "date_published", // X-axis key
  };

  // Second Chart Config (Exploit Growth)
  const secound = {
    apiUrl: config.vfeedApiUrl + "/reports/exploit-growth", // API endpoint for exploit growth data
    dataKeys: ["cve_count"], // Data key for the count of CVEs
    xAxisKey: "year", // X-axis key (year)
  };

  const thired = {
    apiUrl: config.vfeedApiUrl + "/reports/vuln-trend-historic", // API endpoint for exploit growth data
    dataKeys: ["new_vulnerabilities", "modified_vulnerabilities"],
    xAxisKey: "year",
  };

  return (
    <div>
      <Grid container spacing={3} style={{ padding: 20 }}>
        {/* First Grid Item for Historical Package Vulnerability Trends */}
        <Grid item xs={12} sm={12} md={12}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6" className="typography">
              Historical Package Vulnerability Trends
            </Typography>
            <XLineChart
              apiUrl={first.apiUrl}
              dataKeys={first.dataKeys}
              xAxisKey={first.xAxisKey}
            />
          </Paper>
        </Grid>

        {/* Second Grid Item for Exploit Growth Over Time */}
        <Grid item xs={12} sm={12} md={12}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6" className="typography">
              Exploit Growth Over Time
            </Typography>
            <XLineChart
              apiUrl={secound.apiUrl}
              dataKeys={secound.dataKeys}
              xAxisKey={secound.xAxisKey}
            />
          </Paper>
        </Grid>

        {/* Third Grid Item for Most Affected Patches */}
        <Grid item xs={12} sm={12} md={12}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6" className="typography">
              Historical Vulnerability Trends
            </Typography>
            {/* <XLineChart 
              apiUrl={thired.apiUrl} 
              dataKeys={thired.dataKeys} 
              xAxisKey={thired.xAxisKey} 
            /> */}
            <XAreaChart
              apiUrl={thired.apiUrl}
              dataKeys={thired.dataKeys}
              xAxisKey={thired.xAxisKey}
            />
            {/* <MostAffectedPatchesChart /> Custom chart for most affected patches */}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default TrendsPage;
