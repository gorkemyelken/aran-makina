import React from 'react';
import { Box, Typography } from '@mui/material';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <Box component="footer" className="footer">
      <Typography variant="body2" className="footerText">
        © 2024 Aran Makina. Tüm hakları saklıdır.
      </Typography>
    </Box>
  );
};

export default Footer;
