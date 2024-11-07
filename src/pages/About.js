import React from 'react';
import { Container, Typography, Box, Divider, Grid, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import { motion } from 'framer-motion'; // framer-motion import edildi
import '../styles/About.css';

const About = () => {
  return (
    <Container className="about-container">
      <Typography variant="h5" className="about-title">
        Hakkımızda
      </Typography>
      <Divider className="divider" />
      <Box mb={3}>
        <Typography variant="body1" className="about-text">
          Firmamız 1971 yılından bugüne ceraskal imalatı yapmaktadır. Türkiye geneline ve aracı kuruluşlar vasıtası ile yurt dışına hizmet vermekteyiz. İlk heyecanlar yerini profesyonelliğe bıraktı. Değişmeyen tek şey ilk günlerdeki heyecanımız ve çalışma azmimiz.
          <br /><br />
          Şu anda 1, 2, 3, 5 tonluk mekanik ve motorlu ceraskal imalatı yapan profesyonel bir firma haline geldik ve bulunduğumuz noktayı yılların deneyimi ve yapılan çalışmaların bize kazandırdığı bir ödül olarak görüyoruz.
          <br /><br />
          Hayal edin demiyoruz çünkü biz sizin yerinize hayal ediyor ve gerçekleştiriyoruz. Her geçen gün daha kaliteli çalışmalar ve genişleyen portföyümüzle sizlere hizmet etmekten gurur duyuyoruz.
        </Typography>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Box className="about-image" />
          </motion.div>
        </Grid>
      </Grid>
      <Box className="social-icons" mt={3} textAlign="center">
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
    </Container>
  );
};

export default About;
