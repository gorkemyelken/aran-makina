import React from 'react';
import { Container, Typography, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  const navigate = useNavigate();

  const handleSecretAccess = () => {
    const password = prompt('Admin Şifresi:');
    if (password === 'akif2024caraskal') {
      navigate('/admin');
    } else {
      alert('Yanlış şifre!');
    }
  };

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

      {/* Gizli tıklama alanı - en altta ve sola yerleştirildi */}
      <div
        className="secret-access"
        onClick={handleSecretAccess}
      ></div>
    </Box>
  );
};

export default Footer;
