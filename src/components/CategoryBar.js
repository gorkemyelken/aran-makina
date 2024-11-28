import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchCategories } from '../services/categoryService';
import CircleIcon from '@mui/icons-material/Circle';
import '../styles/CategoryBar.css';

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
    <Box className="category-bar">
      {categories.map((category, index) => (
        <React.Fragment key={category.categoryId}>
          <button
            className="category-button"
            onClick={() => handleCategorySearch(category.categoryId, category.name)}
          >
            {category.name}
            <div className="category-photo">
              <img src={category.categoryPhotoUrl} alt={category.name} />
            </div>
          </button>
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
