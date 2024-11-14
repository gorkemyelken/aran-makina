// CategoryBar.js
import React, { useState } from 'react';
import { Box, Typography, InputBase, IconButton, Menu, MenuItem, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const categories = [
  {
    name: "ELEKTRİKLİ ZİNCİRLİ VİNÇ",
    subcategories: ["SABİT ASKILI ZİNCİRLİ VİNÇ", "MANUEL ŞARYOLU ZİNCİRLİ VİNÇ", "MONORAY ZİNCİRLİ VİNÇ"],
  },
  {
    name: "ELEKTRİKLİ HALATLI VİNÇ",
    subcategories: [],
  },
  {
    name: "YEDEK PARÇA",
    subcategories: ["ŞARYO", "MAKARA", "KUMANDA"],
  },      
];

const CategoryBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentSubcategories, setCurrentSubcategories] = useState([]);

  const handleCategoryClick = (event, subcategories) => {
    if (subcategories.length > 0) {
      setAnchorEl(event.currentTarget);
      setCurrentSubcategories(subcategories);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentSubcategories([]);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px 10px',
        backgroundColor: '#014DAD', // Logonun mavi rengi
        borderBottom: '1px solid #ddd',
        height: '32px',
        position: 'fixed', // Barın sürekli en üstte kalması için
        top: '64px', // Navbar'ın hemen altına yerleştirildiğini varsayıyoruz
        width: '100%',
        zIndex: 1100, // Z-index değeri, navbarın üstünde olması için ayarlandı
      }}
    >
      {/* Kategoriler */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        {categories.map((category, index) => (
          <Button
            key={index}
            endIcon={category.subcategories.length > 0 && <ArrowDropDownIcon sx={{ color: '#ffffff' }} />}
            onClick={(e) => handleCategoryClick(e, category.subcategories)}
            sx={{
              fontSize: '0.75rem',
              fontFamily: '"Poppins", sans-serif',
              color: '#ffffff', // Yazı rengi beyaz
              '&:hover': { backgroundColor: '#013f8a' }, // Daha koyu mavi hover efekti
            }}
          >
            {category.name}
          </Button>
        ))}
      </Box>

      {/* Arama Kutusu */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          borderRadius: 1,
          padding: '2px 5px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          minWidth: '120px',
        }}
      >
        <InputBase
          placeholder="Ara..."
          sx={{
            width: '100%',
            fontSize: '0.75rem',
            fontFamily: '"Poppins", sans-serif',
          }}
        />
        <IconButton type="submit" aria-label="search" size="small">
          <SearchIcon fontSize="small" sx={{ color: '#014DAD' }} />
        </IconButton>
      </Box>

      {/* Alt Kategoriler Menüsü */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        {currentSubcategories.map((subcategory, index) => (
          <MenuItem key={index} sx={{ fontSize: '0.75rem', fontFamily: '"Poppins", sans-serif', color: 'black' }}>
            {subcategory}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default CategoryBar;
