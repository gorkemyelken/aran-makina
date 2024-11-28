import React, { useState, useEffect } from "react";
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
import { WhatsApp } from "@mui/icons-material";
import { motion } from "framer-motion";
import "../styles/Home.css";

const Home = () => {
  const [visibleProducts, setVisibleProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const productsData = await fetchProducts();
      const initialProducts = productsData.slice(0, 8); // İlk 8 ürünü al (4x2 görünüm için)
      setVisibleProducts(initialProducts);
    };
    loadProducts();
  }, []);

  return (
    <Box className="home-container">
      {/* Hero Section */}
      <Container className="hero-section">
        <Box className="hero-overlay">
          <motion.div
            className="hero-text-box"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography variant="h3" className="hero-title">
              Güçlü Çözümler, Güvenilir Ekipmanlar
            </Typography>
            <Typography variant="body1" className="hero-description">
              İş süreçlerinizi kolaylaştıracak dayanıklı ve modern ekipmanlarla
              tanışın. Sizin için burada, bir mesaj uzağınızdayız.
            </Typography>
            <Box className="hero-buttons">
              <Link to="/urunler" className="hero-button primary">
                Ürünlerimizi Keşfedin
              </Link>
              <Link to="/hakkimizda" className="hero-button secondary">
                Daha Fazla Bilgi
              </Link>
            </Box>
            <Box className="whatsapp-highlight">
              <Link
                to="https://wa.me/905436256412"
                className="whatsapp-button"
                target="_blank"
              >
                <WhatsApp style={{ marginRight: "10px" }} />
                WhatsApp ile Hemen İletişime Geçin!
              </Link>
            </Box>
          </motion.div>
        </Box>
      </Container>

      {/* Product Section */}
      <Container className="product-section">
        <Typography variant="h5" className="product-title">
          Öne Çıkan Ürünler
        </Typography>
        <Divider className="divider" />
        <Grid container spacing={4}>
          {visibleProducts.map((product, index) => (
            <Grid item key={product.productId} xs={12} sm={6} md={3}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
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
    </Box>
  );
};

export default Home;
