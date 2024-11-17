import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Popover, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchCategories } from '../services/categoryService';
import CircleIcon from '@mui/icons-material/Circle';

const CategoryBar = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error('Kategoriler yüklenirken bir hata oluştu:', err);
      }
    };

    loadCategories();
  }, []);

  const handleCategorySearch = (categoryId, categoryName) => {
    navigate('/urunler', { state: { categoryId, categoryName } });
  };

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 60,
        zIndex: 1000,
        display: { xs: 'none', md: 'flex' },
        padding: '10px 20px',
        backgroundColor: '#014DAD',
        color: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        borderBottom: '1px solid #ddd',
      }}
    >
      {categories.map((category, index) => (
        <React.Fragment key={category.id}>
          <Button
            variant="text"
            onClick={() => handleCategorySearch(category.id, category.name)}
            sx={{
              color: '#ffffff',
              fontSize: '0.75rem',
              padding: '5px 15px',
              backgroundColor: '#015bb5',
              borderRadius: 2,
              '&:hover': {
                backgroundColor: '#013f8a',
              },
            }}
          >
            {category.name}
          </Button>
          {index < categories.length - 1 && (
            <CircleIcon
              sx={{ color: '#ffffff', fontSize: '0.5rem', marginLeft: '5px', marginRight: '5px' }}
            />
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default CategoryBar;
