import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, TextField, Box, Divider } from '@mui/material';
import { fetchProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion'; // Framer Motion import edildi
import '../styles/ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const productsData = await fetchProducts();
      setProducts(productsData);
      setFilteredProducts(productsData);
    };
    loadProducts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <Container className="products-container">
      <Typography variant="h5" className="products-title">
        Ürünlerimiz
      </Typography>
      <Divider className="divider" />
      <Box mb={3} textAlign="center">
        <TextField
          variant="outlined"
          placeholder="Ürün ara..."
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{
            marginTop: '20px',
            width: '30%',
            '& .MuiOutlinedInput-root': {
              borderRadius: '15px',
            },
          }}
        />
      </Box>
      <Grid container spacing={4}>
        {filteredProducts.map((product, index) => (
          <Grid item key={product.productId} xs={12} sm={6} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }} // Sırayla gelme animasyonu
            >
              <ProductCard product={product} />
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
