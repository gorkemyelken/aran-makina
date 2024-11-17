import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { fetchCategories } from '../../services/categoryService';
import { fetchProducts } from '../../services/productService';
import { fetchFeatureNames } from '../../services/featureService'; // Özellik isimleri için gerekli fonksiyon

const AdminDashboard = () => {
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalFeatures, setTotalFeatures] = useState(0);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const categoriesData = await fetchCategories();
        const productsData = await fetchProducts();
        const featuresData = await fetchFeatureNames(); // Özellik isimlerini çeken fonksiyon
        
        setTotalCategories(categoriesData.length);
        setTotalProducts(productsData.length);
        setTotalFeatures(featuresData.length);
      } catch (error) {
        console.error('Veriler yüklenirken hata oluştu:', error);
      }
    };

    loadDashboardData();
  }, []);

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
            <Typography variant="h3">{totalProducts}</Typography>
          </Paper>
        </Grid>

        {/* Toplam Kategori Kartı */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6">Kategori İsimleri</Typography>
            <Typography variant="h3">{totalCategories}</Typography>
          </Paper>
        </Grid>

        {/* Toplam Özellik Kartı */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6">Özellik İsimleri</Typography>
            <Typography variant="h3">{totalFeatures}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
