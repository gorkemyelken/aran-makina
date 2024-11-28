import React from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Divider,
  IconButton,
} from "@mui/material";
import { Facebook, Instagram, WhatsApp, Email } from "@mui/icons-material";
import "../styles/Contact.css";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <Container className="contact-container">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Typography variant="h5" className="contact-title">
          İletişim
        </Typography>
      </motion.div>
      <Divider className="divider" />

      {/* İletişim Bilgileri */}
      <Grid container spacing={4} className="contact-content">
        <Grid item xs={12} md={6} className="infos">
          <Typography variant="h6" className="contact-info">
            <strong>Email:</strong> bilgi@arancaraskal.com
          </Typography>
          <Typography variant="h6" className="contact-info">
            <strong>Telefon:</strong> 0543 625 64 12
          </Typography>
          <Typography variant="h6" className="contact-info">
            <strong>Adres:</strong> Zafer Sanayi, Yüceaktaş Sk. No 7, 42040
            Selçuklu/Konya
          </Typography>

          {/* Sosyal Medya İkonları */}
          <Box className="social-icons">
            <IconButton
              href="https://facebook.com"
              target="_blank"
              aria-label="Facebook"
              className="social-icon facebook"
            >
              <Facebook />
            </IconButton>
            <IconButton
              href="https://www.instagram.com/aranmakine/"
              target="_blank"
              aria-label="Instagram"
              className="social-icon instagram"
            >
              <Instagram />
            </IconButton>
            <IconButton
              href="https://wa.me/905436256412"
              target="_blank"
              aria-label="WhatsApp"
              className="social-icon whatsapp"
            >
              <WhatsApp />
            </IconButton>
            <IconButton
              href="mailto:bilgi@arancaraskal.com"
              aria-label="Email"
              className="social-icon email"
            >
              <Email />
            </IconButton>
          </Box>
        </Grid>

        {/* Harita */}
        <Grid item xs={12} md={6} className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3146.6278002132553!2d32.5217544!3d37.939124799999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d08f5ca2278183%3A0xab973afb34005799!2sAran%20Makina!5e0!3m2!1str!2str!4v1730893139120!5m2!1str!2str"
            width="100%"
            height="350"
            style={{ border: "0", borderRadius: "15px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Aran Makina Konum"
          ></iframe>
        </Grid>
      </Grid>

      {/* Çalışma Saatleri */}
      <Box className="working-hours" mt={5}>
        <Typography variant="h6" className="working-title">
          Çalışma Saatlerimiz
        </Typography>
        <Box className="working-schedule">
          <Typography variant="body1" className="working-info">
            <strong>Hafta İçi:</strong> 08:30 – 18:00
          </Typography>
          <Typography variant="body1" className="working-info">
            <strong>Cumartesi:</strong> 08:30 – 15:00
          </Typography>
          <Typography variant="body1" className="working-info">
            <strong>Pazar:</strong> Kapalı
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Contact;
