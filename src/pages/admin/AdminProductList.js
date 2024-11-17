import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { fetchProducts, deleteProduct } from '../../services/productService';

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

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
              <TableCell><strong>Ürün Adı</strong></TableCell>
              <TableCell><strong>Kategori</strong></TableCell>
              <TableCell><strong>Fiyat</strong></TableCell>
              <TableCell><strong>İşlemler</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.productId}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category ? product.category.name : 'Kategori belirtilmemiş'}</TableCell>
                <TableCell>{product.price ? `${product.price} TL` : 'Fiyat belirtilmemiş'}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    component={Link}
                    to={`/admin/products/${product.productId}`}
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
    </Container>
  );
};

export default AdminProductList;
