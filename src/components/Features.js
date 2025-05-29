import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import {
  Speed,
  Security,
  HighQuality,
  CloudDownload,
  Devices,
  Lock,
} from '@mui/icons-material';

const features = [
  {
    icon: <Speed sx={{ fontSize: 40, color: '#2196f3' }} />,
    title: 'Lightning Fast Downloads',
    description: 'Experience blazing-fast download speeds with our optimized servers',
  },
  {
    icon: <Security sx={{ fontSize: 40, color: '#4caf50' }} />,
    title: '100% Safe & Secure',
    description: 'Your privacy is our top priority. No data collection, no tracking',
  },
  {
    icon: <HighQuality sx={{ fontSize: 40, color: '#f50057' }} />,
    title: 'High Quality Options',
    description: 'Choose from various quality options up to 4K resolution',
  },
  {
    icon: <CloudDownload sx={{ fontSize: 40, color: '#ff9800' }} />,
    title: 'Unlimited Downloads',
    description: 'Download as many videos as you want, completely free',
  },
  {
    icon: <Devices sx={{ fontSize: 40, color: '#9c27b0' }} />,
    title: 'Multi-Platform Support',
    description: 'Works on all devices - desktop, tablet, and mobile',
  },
  {
    icon: <Lock sx={{ fontSize: 40, color: '#f44336' }} />,
    title: 'No Registration Required',
    description: 'Start downloading instantly - no sign-up, no login needed',
  },
];

const Features = () => {
  return (
    <Box sx={{ mt: 8, mb: 4 }}>
      <Typography
        variant="h3"
        component="h2"
        sx={{
          mb: 6,
          textAlign: 'center',
          background: 'linear-gradient(45deg, #2196f3 30%, #f50057 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold',
        }}
      >
        Why Choose Us?
      </Typography>
      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                bgcolor: 'background.paper',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}
            >
              {feature.icon}
              <Typography variant="h6" sx={{ my: 2, color: 'primary.main' }}>
                {feature.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {feature.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Features; 