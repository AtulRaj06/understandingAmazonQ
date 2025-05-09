import { Typography, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function NotFoundPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
      }}
    >
      <Typography variant="h1" component="h1" gutterBottom>
        404
      </Typography>
      
      <Typography variant="h4" component="h2" gutterBottom>
        Page Not Found
      </Typography>
      
      <Typography variant="body1" paragraph align="center" sx={{ maxWidth: 500, mb: 4 }}>
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </Typography>
      
      <Button
        variant="contained"
        color="primary"
        component={RouterLink}
        to="/"
      >
        Go to Home Page
      </Button>
    </Box>
  );
}

export default NotFoundPage;