import { Typography, Box, Paper, Grid } from '@mui/material';

function AboutPage() {
  return (
    <Box className="about-page">
      <Typography variant="h4" component="h1" gutterBottom>
        About This Application
      </Typography>
      
      <Typography variant="body1" paragraph>
        This is a full-stack application skeleton built with modern web technologies.
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Frontend Technologies
            </Typography>
            <ul className="list-disc pl-5">
              <li>React.js with Vite</li>
              <li>Material UI for components</li>
              <li>Tailwind CSS for utility classes</li>
              <li>React Router for navigation</li>
              <li>React Hook Form for form handling</li>
              <li>Winston for logging</li>
            </ul>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Backend Technologies
            </Typography>
            <ul className="list-disc pl-5">
              <li>Node.js with Express</li>
              <li>PostgreSQL database</li>
              <li>Winston for logging</li>
              <li>Environment-based configuration</li>
              <li>Structured MVC architecture</li>
              <li>RESTful API design</li>
            </ul>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AboutPage;