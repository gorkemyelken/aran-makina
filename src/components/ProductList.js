import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Grid, Box, Chip, Divider } from '@mui/material';
import { fetchProducts } from '../services/productService';
import { fetchCategories } from '../services/categoryService';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import '../styles/ProductList.css';

const ProductList = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    location.state ? location.state.categoryId : null
  );

  useEffect(() => {
    const loadProducts = async () => {
      const productsData = await fetchProducts();
      setProducts(productsData);

      if (selectedCategory !== null) {
        const filtered = productsData.filter(
          (product) => product.category && product.category.id === selectedCategory
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(productsData);
      }
    };

    const loadCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (err) {
        console.error('Kategoriler yüklenirken bir hata oluştu:', err);
      }
    };

    loadProducts();
    loadCategories();
  }, [selectedCategory]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId === null) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category && product.category.id === categoryId
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

      {/* Kategori Çubuğu */}
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          padding: '10px 0',
          marginBottom: '20px',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Chip
          label="Tüm Kategoriler"
          onClick={() => handleCategoryChange(null)}
          sx={{
            margin: '0 5px',
            backgroundColor: selectedCategory === null ? '#014DAD' : '#f0f0f0',
            color: selectedCategory === null ? '#ffffff' : '#000000',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: '#013f8a',
              color: '#ffffff',
            },
          }}
        />
        {categories.map((category) => (
          <Chip
            key={category.id}
            label={category.name}
            onClick={() => handleCategoryChange(category.id)}
            sx={{
              margin: '0 5px',
              backgroundColor: selectedCategory === category.id ? '#014DAD' : '#f0f0f0',
              color: selectedCategory === category.id ? '#ffffff' : '#000000',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#013f8a',
                color: '#ffffff',
              },
            }}
          />
        ))}
      </Box>

      {/* Ürünler Listesi */}
      <Grid container spacing={4}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <Grid item key={product.productId} xs={12} sm={6} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            </Grid>
          ))
        ) : (
          <Typography sx={{ textAlign: 'center', marginTop: '20px', width: '100%' }}>
            Bu kategoride ürün bulunamadı.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default ProductList;
