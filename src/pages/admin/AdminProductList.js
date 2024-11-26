import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
} from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { fetchProducts, deleteProduct, reorderProducts } from '../../services/productService';

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Ürünler yüklenirken hata oluştu:', error);
        setError('Ürünler yüklenemedi.');
      }
    };

    loadProducts();
  }, []);

  const handleDelete = async (productId) => {
    if (window.confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
      try {
        await deleteProduct(productId);
        setProducts(products.filter((product) => product.productId !== productId));
        alert('Ürün başarıyla silindi.');
      } catch (error) {
        console.error('Ürün silinirken hata oluştu:', error);
        setError('Ürün silinemedi.');
      }
    }
  };

  const moveProduct = (index, direction) => {
    const newProducts = [...products];
    const targetIndex = index + direction;

    if (targetIndex >= 0 && targetIndex < newProducts.length) {
      [newProducts[index], newProducts[targetIndex]] = [newProducts[targetIndex], newProducts[index]];
      setProducts(newProducts);
      setHasChanges(true);
    }
  };

  const handleSaveOrder = async () => {
    const orderedProductIds = products.map((product) => product.productId);
    try {
      await reorderProducts(orderedProductIds);
      alert('Sıralama başarıyla kaydedildi.');
      setHasChanges(false);
    } catch (error) {
      console.error('Sıralama kaydedilirken hata oluştu:', error);
      setError('Sıralama kaydedilemedi.');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: '30px' }}>
      <Typography variant="h4" gutterBottom>
        Ürünler
      </Typography>
      {error && (
        <Typography variant="body1" color="error" sx={{ marginBottom: '15px' }}>
          {error}
        </Typography>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>İşlem</strong></TableCell>
              <TableCell><strong>Ürün Adı</strong></TableCell>
              <TableCell><strong>Kategori</strong></TableCell>
              <TableCell><strong>Fiyat</strong></TableCell>
              <TableCell><strong>İşlemler</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={product.productId}>
                <TableCell>
                  <IconButton
                    onClick={() => moveProduct(index, -1)}
                    disabled={index === 0}
                    color="primary"
                  >
                    <ArrowUpward />
                  </IconButton>
                  <IconButton
                    onClick={() => moveProduct(index, 1)}
                    disabled={index === products.length - 1}
                    color="primary"
                  >
                    <ArrowDownward />
                  </IconButton>
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category ? product.category.name : 'Kategori belirtilmemiş'}</TableCell>
                <TableCell>{product.price ? `${product.price} TL` : 'Fiyat belirtilmemiş'}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ marginRight: '10px' }}
                  >
                    Görüntüle
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(product.productId)}
                  >
                    SİL
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {hasChanges && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveOrder}
          sx={{ marginTop: '20px' }}
        >
          Sıralamayı Kaydet
        </Button>
      )}
    </Container>
  );
};

export default AdminProductList;
