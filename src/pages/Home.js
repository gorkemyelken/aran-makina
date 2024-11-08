import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  IconButton,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import { fetchProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import Footer from "../components/Footer"; // Footer bileşenini ekliyoruz
import { motion } from "framer-motion"; // framer-motion import edildi
import "../styles/Home.css";

const Home = () => {
  const [visibleProducts, setVisibleProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const productsData = await fetchProducts();

      // İlk 6 ürünü al ve state'e ekle
      const initialProducts = productsData.slice(0, 6);
      setVisibleProducts(initialProducts);
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
          {visibleProducts.map((product, index) => (
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
        {visibleProducts.length > 0 && (
          <Box textAlign="center" marginTop="20px">
            <Link to="/urunler" className="see-more-link">
              Tüm Ürünleri Görüntüle
            </Link>
          </Box>
        )}
      </Container>

      <Box className="social-icons">
        <IconButton
          href="https://facebook.com"
          target="_blank"
          aria-label="Facebook"
        >
          <Facebook style={{ color: "#3b5998" }} />
        </IconButton>
        <IconButton
          href="https://twitter.com"
          target="_blank"
          aria-label="Twitter"
        >
          <Twitter style={{ color: "#1DA1F2" }} />
        </IconButton>
        <IconButton
          href="https://instagram.com"
          target="_blank"
          aria-label="Instagram"
        >
          <Instagram style={{ color: "#C13584" }} />
        </IconButton>
        <IconButton
          href="https://linkedin.com"
          target="_blank"
          aria-label="LinkedIn"
        >
          <LinkedIn style={{ color: "#0077B5" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Home;
