import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Select, MenuItem, Grid } from '@mui/material';
import { fetchProductById, addProductFeature, fetchFeatureNames } from '../../services/productService';

const AdminProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [featureNames, setFeatureNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newFeature, setNewFeature] = useState({ featureNameId: '', value: '' });
  const [file, setFile] = useState(null); // State for photo file

  useEffect(() => {
    const getProduct = async () => {
      try {
        const productData = await fetchProductById(productId);
        setProduct(productData);
      } catch (err) {
        setError('Ürün bilgileri alınırken bir hata oluştu.');
      } finally {
        setIsLoading(false);
      }
    };

    const getFeatureNames = async () => {
      try {
        const names = await fetchFeatureNames();
        setFeatureNames(names);
      } catch (err) {
        console.error('Özellik isimleri alınırken hata oluştu:', err);
      }
    };

    getProduct();
    getFeatureNames();
  }, [productId]);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleFeatureChange = (e) => {
    const { name, value } = e.target;
    setNewFeature({ ...newFeature, [name]: value });
  };

  const handleAddFeature = async () => {
    try {
      const featureData = {
        productId: productId,
        featureNameId: newFeature.featureNameId,
        value: newFeature.value,
      };
      await addProductFeature(featureData);
      alert('Özellik başarıyla eklendi.');
      setIsDialogOpen(false);
      const updatedProduct = await fetchProductById(productId);
      setProduct(updatedProduct);
    } catch (err) {
      alert('Özellik eklenirken bir hata oluştu.');
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadPhoto = async () => {
    if (!file) {
      alert('Lütfen bir fotoğraf seçin.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('productId', productId);

    try {
      const response = await fetch('https://aran-makina-8fce3ead0cbf.herokuapp.com/api/files/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        alert('Fotoğraf başarıyla yüklendi.');
        const updatedProduct = await fetchProductById(productId);
        setProduct(updatedProduct);
      } else {
        alert('Fotoğraf yüklenirken bir hata oluştu.');
      }
    } catch (err) {
      alert('Fotoğraf yüklenirken bir hata oluştu.');
    }
  };

  if (isLoading) {
    return <Typography>Yükleniyor...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    product && (
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Ürün Detayları
        </Typography>
        <Typography variant="h6">Adı: {product.name}</Typography>
        <Typography>Kategori: {product.category.name}</Typography>
        <Typography>Fiyat: {product.price ? `${product.price} TL` : 'Belirtilmemiş'}</Typography>
        <Typography>Açıklama: {product.description || 'Açıklama mevcut değil.'}</Typography>
        <Typography>Öncelik: {product.priority || 'Açıklama mevcut değil.'}</Typography>

        {/* Fotoğraf Yükleme Butonu */}
        <div>
          <input type="file" onChange={handleFileChange} />
          <Button variant="contained" color="primary" onClick={handleUploadPhoto} sx={{ marginTop: '20px' }}>
            Fotoğraf Yükle
          </Button>
        </div>

        {/* Ürün Fotoğrafları */}
        <Typography variant="h5" sx={{ marginTop: '30px' }}>
          Ürün Fotoğrafları
        </Typography>
        <Grid container spacing={2} sx={{ marginTop: '20px' }}>
          {product.photos.map((photo, index) => (
            <Grid item key={index} xs={4}>
              <img src={photo.url} alt={`Ürün Fotoğrafı ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
            </Grid>
          ))}
        </Grid>

        <Button
          variant="contained"
          color="primary"
          onClick={handleDialogOpen}
          sx={{ marginTop: '20px' }}
        >
          Yeni Özellik Ekle
        </Button>

        <Dialog open={isDialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Yeni Özellik Ekle</DialogTitle>
          <DialogContent>
            <Select
              fullWidth
              name="featureNameId"
              value={newFeature.featureNameId}
              onChange={handleFeatureChange}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Özellik Seçin
              </MenuItem>
              {featureNames.map((feature) => (
                <MenuItem key={feature.featureNameId} value={feature.featureNameId}>
                  {feature.name}
                </MenuItem>
              ))}
            </Select>
            <TextField
              fullWidth
              margin="normal"
              name="value"
              label="Değer"
              value={newFeature.value}
              onChange={handleFeatureChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="secondary">
              İptal
            </Button>
            <Button onClick={handleAddFeature} color="primary">
              Ekle
            </Button>
          </DialogActions>
        </Dialog>

        <Typography variant="h5" sx={{ marginTop: '30px' }}>
          Ürün Özellikleri
        </Typography>
        <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>Özellik</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>Değer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {product.features.map((feature) => (
                <TableRow key={feature.productFeatureId}>
                  <TableCell>{feature.featureName.name}</TableCell>
                  <TableCell>{feature.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    )
  );
};

export default AdminProductDetail;
