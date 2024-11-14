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

const Contact = () => {
  return (
    <Container className="contact-container">
      <Typography variant="h5" className="contact-title">
        İletişim
      </Typography>
      <Divider className="divider" />

      <Grid item xs={12} md={6} className="infos">
        <Typography variant="h6" className="contact-info">
          <strong>Email:</strong> bilgi@arancaraskal.com
        </Typography>
        <Typography variant="h6" className="contact-info">
          <strong>Telefon:</strong> 0543 625 64 12
        </Typography>
        <Typography variant="h6" className="contact-info">
          <strong>Adres:</strong> Zafer sanayi, Yüceaktaş Sk. no 7, 42040
          Selçuklu/Konya
        </Typography>
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
      </Grid>

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
    </Container>
  );
};

export default Contact;
