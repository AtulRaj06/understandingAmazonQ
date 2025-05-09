import { useState, useEffect } from 'react';
import { Typography, Box, Paper, CircularProgress } from '@mui/material';
import { logger } from '../utils/logger';
import SampleForm from '../components/SampleForm';
import { apiService } from '../services/apiService';

function HomePage() {
  const [healthStatus, setHealthStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        setLoading(true);
        const response = await apiService.getHealth();
        setHealthStatus(response.status);
        logger.info('API health check successful', { status: response.status });
      } catch (err) {
        setError('Failed to connect to API');
        logger.error('API health check failed', { error: err.message });
      } finally {
        setLoading(false);
      }
    };

    checkApiHealth();
  }, []);

  const handleFormSubmit = (data) => {
    logger.info('Form submitted', { data });
    // Here you would typically send the data to your API
    console.log('Form data:', data);
  };

  return (
    <Box className="home-page">
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Full-Stack App
      </Typography>
      
      <Typography variant="body1" paragraph>
        This is a production-ready, full-stack application skeleton built with React.js, 
        Node.js + Express, and PostgreSQL.
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Backend API Status
        </Typography>
        
        {loading ? (
          <Box display="flex" alignItems="center">
            <CircularProgress size={20} sx={{ mr: 2 }} />
            <Typography>Checking API status...</Typography>
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Typography color="success.main">
            API is {healthStatus}
          </Typography>
        )}
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Sample Form
        </Typography>
        <SampleForm onSubmit={handleFormSubmit} />
      </Paper>
    </Box>
  );
}

export default HomePage;