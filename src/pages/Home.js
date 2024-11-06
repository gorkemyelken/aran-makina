import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid, IconButton, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import '../styles/Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const productsData = await fetchProducts();
      setProducts(productsData);
    };
    loadProducts();
  }, []);

  return (
    <Box className="home-container">
      <Container className="hero-section">
        <Typography variant="h2" className="animated-title">
          Aran Makina'ya Hoş Geldiniz!
        </Typography>
        <Typography variant="h5" className="animated-subtitle">
          Güçlü ve güvenilir ekipmanlarımızla işinizi kolaylaştırın.
        </Typography>
      </Container>

      <Container className="product-section">
        <Typography variant="h5" className="product-title">
          Öne Çıkan Ürünler
        </Typography>
        <Divider className="divider" />
        <Grid container spacing={4}>
          {products.slice(0, 3).map((product) => (
            <Grid item key={product.productId} xs={12} sm={6} md={4}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
        <Box textAlign="center" marginTop="20px">
          <Link to="/products" className="see-more-link">
            Tüm Ürünleri Görüntüle
          </Link>
        </Box>
      </Container>

      <Box className="social-icons">
        <IconButton href="https://facebook.com" target="_blank" aria-label="Facebook">
          <Facebook style={{ color: '#3b5998' }} />
        </IconButton>
        <IconButton href="https://twitter.com" target="_blank" aria-label="Twitter">
          <Twitter style={{ color: '#1DA1F2' }} />
        </IconButton>
        <IconButton href="https://instagram.com" target="_blank" aria-label="Instagram">
          <Instagram style={{ color: '#C13584' }} />
        </IconButton>
        <IconButton href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
          <LinkedIn style={{ color: '#0077B5' }} />
        </IconButton>
      </Box>

      <a
        href="https://wa.me/1234567890"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          className="whatsapp-icon"
        />
      </a>
    </Box>
  );
};

export default Home;
