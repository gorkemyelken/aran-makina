import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button, CircularProgress, Box } from '@mui/material';
import { fetchCategories, deleteCategory } from '../../services/categoryService';

const AdminCategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error('Kategoriler yüklenirken bir hata oluştu:', err);
        setError('Kategoriler yüklenemedi.');
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) {
      try {
        await deleteCategory(id);
        setCategories(categories.filter(category => category.id !== id));
        alert('Kategori başarıyla silindi.');
      } catch (err) {
        console.error('Kategori silinirken bir hata oluştu:', err);
        setError('Kategori silinemedi.');
      }
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: '30px' }}>
      <Typography variant="h4" gutterBottom>
        Kategoriler
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : (
        <List>
          {categories.map((category) => (
            <ListItem key={category.id} divider>
              <ListItemText
                primary={category.name}
                secondary={category.description ? category.description : 'Açıklama yok'}
              />
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleDelete(category.id)}
              >
                SİL
              </Button>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default AdminCategoryList;
