import React from 'react';
import { Container, Typography, Box, Link } from '@mui/material';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <Box className="footer-container">
      <Container maxWidth="lg">
        <Typography variant="body1" className="footer-text">
          © 2024 Aran Makina. Tüm Hakları Saklıdır.
        </Typography>
        <Box className="footer-links">
          <Link href="/privacy" color="inherit" className="footer-link">
            Gizlilik Politikası
          </Link>
          <Link href="/terms" color="inherit" className="footer-link">
            Kullanım Şartları
          </Link>
          <Link href="/contact" color="inherit" className="footer-link">
            İletişim
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
