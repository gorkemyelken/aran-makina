import React from 'react';
import { Container, Typography, Box, Link, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  const navigate = useNavigate();

  const handleSecretAccess = () => {
    const password = prompt('Admin Şifresi:');
    if (password === 'akif2024caraskal') {
      navigate('/admin/dashboard');
    } else {
      alert('Yanlış şifre!');
    }
  };

  return (
    <Box component="footer" className="footer-container">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Şirket Bilgileri */}
          <Grid item xs={12} md={4} className="footer-section">
            <Typography variant="h6" className="footer-heading">
              Aran Makina
            </Typography>
            <Typography variant="body2" className="footer-text">
              Zafer Sanayi, Yüceaktaş Sk. No 7, 42040 Selçuklu/Konya
            </Typography>
            <Typography variant="body2" className="footer-text">
              Telefon: 0543 625 64 12
            </Typography>
          </Grid>

          {/* Hızlı Bağlantılar */}
          <Grid item xs={12} md={4} className="footer-section">
            <Typography variant="h6" className="footer-heading">
              Hızlı Bağlantılar
            </Typography>
            <Box className="footer-links">
              <Link href="/" className="footer-link">
                Anasayfa
              </Link>
              <Link href="/hakkimizda" className="footer-link">
                Hakkımızda
              </Link>
              <Link href="/urunler" className="footer-link">
                Ürünler
              </Link>
              <Link href="/iletisim" className="footer-link">
                İletişim
              </Link>
            </Box>
          </Grid>

          {/* Sosyal Medya */}
          <Grid item xs={12} md={4} className="footer-section">
            <Typography variant="h6" className="footer-heading">
              Bizi Takip Edin
            </Typography>
            <Box className="footer-social">
              <Link href="https://facebook.com" target="_blank" className="footer-social-icon">
                Facebook
              </Link>
              <Link href="https://www.instagram.com/aranmakine/" target="_blank" className="footer-social-icon">
                Instagram
              </Link>
              <Link href="https://wa.me/905436256412" target="_blank" className="footer-social-icon">
                WhatsApp
              </Link>
              <Link href="mailto:bilgi@arancaraskal.com" className="footer-social-icon">
                Mail
              </Link>
            </Box>
          </Grid>
        </Grid>
              {/* Gizli tıklama alanı */}

      </Container>
      <div
        className="secret-access"
        onClick={handleSecretAccess}
        title="Admin Erişimi"
      ></div>
      <Box className="footer-bottom">
        <Typography variant="body2" className="footer-bottom-text">
          © 2024 Aran Makina. Tüm Hakları Saklıdır.
        </Typography>
      </Box>


    </Box>
  );
};

export default Footer;
