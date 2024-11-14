import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Yönetim Paneli
      </Typography>
      <Grid container spacing={3}>
        {/* Toplam Ürün Kartı */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6">Toplam Ürün</Typography>
            <Typography variant="h3">13</Typography>
          </Paper>
        </Grid>
      </Grid>
    
    </Container>
  );
};

export default AdminDashboard;
