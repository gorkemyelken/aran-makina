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
import { Instagram, WhatsApp, Email, Facebook } from "@mui/icons-material";
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
              Gücünüzü Katlayacak Çözümler
            </Typography>
            <Typography variant="body1" className="hero-description">
              Dayanıklı, güvenilir ve modern ekipmanlarla iş süreçlerinizi
              optimize edin. Endüstri lideri çözümlerimizle bir adım önde olun.
            </Typography>
            <Box className="hero-buttons">
              <Link to="/urunler" className="hero-button primary">
                Ürünlerimizi Keşfedin
              </Link>
              <Link to="/hakkimizda" className="hero-button secondary">
                Daha Fazla Bilgi
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

        <Box className="social-icons">
          <IconButton
            href="https://facebook.com"
            target="_blank"
            aria-label="Facebook"
          >
            <Facebook style={{ color: "#3b5998" }} />
          </IconButton>
          <IconButton
            href="https://www.instagram.com/aranmakine/"
            target="_blank"
            aria-label="Instagram"
          >
            <Instagram style={{ color: "#C13584" }} />
          </IconButton>
          <IconButton
            href="https://wa.me/905436256412"
            target="_blank"
            aria-label="WhatsApp"
          >
            <WhatsApp style={{ color: "#25D366" }} />
          </IconButton>
          <IconButton href="mailto:bilgi@arancaraskal.com" aria-label="Email">
            <Email style={{ color: "#014DAD" }} />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
