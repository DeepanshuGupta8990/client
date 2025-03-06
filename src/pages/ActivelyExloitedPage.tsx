import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import { config } from '../config';

export default function ActivelyExploitedPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = window.localStorage.getItem('token');
  const ACTIVELY_EXPLOITED_API = config.vfeedApiUrl + "/vuln/active-exploits"

  useEffect(() => {
    setLoading(true);
    axios
      .get(ACTIVELY_EXPLOITED_API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        setData(res.data || []);
      })
      .catch((err) => {
        setLoading(false);
        setError('Failed to fetch data');
        console.error(err);
      });
  }, [token]);

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Actively Exploited Vulnerabilities
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : data.length === 0 ? (
        <Typography color="textSecondary">No active exploits found.</Typography>
      ) : (
        <List>
          {/* {data.map((item, index) => (
            <ListItem key={index} divider>
              <ListItemText primary={item.name || 'Unknown Vulnerability'} secondary={item.description || 'No details available'} />
            </ListItem>
          ))} */}
        </List>
      )}
    </Box>
  );
}
