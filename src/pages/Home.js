import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <Box className="home-container">
      {/* Hero Section */}
      <Container className="hero-section">
        <div className="hero-content">
          <Typography variant="h2" className="animated-title">
            Aran Makina'ya Hoş Geldiniz!
          </Typography>
          <Typography variant="h5" className="animated-subtitle">
            Güçlü ve güvenilir ekipmanlarımızla işinizi kolaylaştırın.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className="hero-button"
            component={Link}
            to="/urunler"
          >
            Ürünlerimizi Keşfedin
          </Button>
        </div>
      </Container>

      {/* Diğer içerikler */}
      {/* Ürünler, sosyal medya vs. */}
    </Box>
  );
};

export default Home;
