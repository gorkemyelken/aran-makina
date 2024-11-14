import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Select, MenuItem } from '@mui/material';
import { fetchProductById, deleteProduct, addProductFeature, fetchFeatureNames } from '../../services/productService';

const ProductDetailsAdmin = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [featureNames, setFeatureNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newFeature, setNewFeature] = useState({ featureNameId: '', value: '' });

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

  const handleDelete = async () => {
    if (window.confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      try {
        await deleteProduct(productId);
        alert('Ürün başarıyla silindi.');
        // Silme işleminden sonra admin ürün listesine yönlendirme yapılabilir.
      } catch (err) {
        alert('Ürün silinirken bir hata oluştu.');
      }
    }
  };

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
      // Yeni özellik eklendikten sonra ürün verilerini yeniden yükleyin.
      const updatedProduct = await fetchProductById(productId);
      setProduct(updatedProduct);
    } catch (err) {
      alert('Özellik eklenirken bir hata oluştu.');
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
        <Typography>Kategori: {product.category}</Typography>
        <Typography>Fiyat: {product.price ? `${product.price} TL` : 'Belirtilmemiş'}</Typography>
        <Typography>Açıklama: {product.description || 'Açıklama mevcut değil.'}</Typography>

        <Button
          variant="contained"
          color="secondary"
          onClick={handleDelete}
          sx={{ marginTop: '20px' }}
        >
          Ürünü Sil
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDialogOpen}
          sx={{ marginTop: '20px', marginLeft: '10px' }}
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

export default ProductDetailsAdmin;
