import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../../services/productService';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Ürünler yüklenirken hata oluştu:', error);
      }
    };

    loadProducts();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ marginTop: '30px' }}>
      <Typography variant="h4" gutterBottom>
        Ürünler
      </Typography>
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
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price ? `${product.price} TL` : 'Fiyat belirtilmemiş'}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    component={Link}
                    to={`/admin/products/${product.productId}`}
                  >
                    Görüntüle
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

export default AdminProducts;
