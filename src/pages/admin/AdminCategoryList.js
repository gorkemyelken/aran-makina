import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  CircularProgress,
  Box,
  IconButton,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { fetchCategories, deleteCategory, reorderCategories, uploadCategoryPhoto } from '../../services/categoryService';

const AdminCategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

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

  const handleDelete = async (categoryId) => {
    if (window.confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) {
      try {
        await deleteCategory(categoryId);
        setCategories(categories.filter((category) => category.categoryId !== categoryId));
        alert('Kategori başarıyla silindi.');
      } catch (err) {
        console.error('Kategori silinirken bir hata oluştu:', err);
        setError('Kategori silinemedi.');
      }
    }
  };

  const moveCategory = (index, direction) => {
    const newCategories = [...categories];
    const targetIndex = index + direction;

    if (targetIndex >= 0 && targetIndex < newCategories.length) {
      [newCategories[index], newCategories[targetIndex]] = [newCategories[targetIndex], newCategories[index]];
      setCategories(newCategories);
      setHasChanges(true);
    }
  };

  const handleSaveOrder = async () => {
    const orderedCategoryIds = categories.map((category) => category.categoryId);
    try {
      await reorderCategories(orderedCategoryIds);
      alert('Sıralama başarıyla kaydedildi.');
      setHasChanges(false);
    } catch (error) {
      console.error('Sıralama kaydedilirken hata oluştu:', error);
      setError('Sıralama kaydedilemedi.');
    }
  };

  const handleOpenUploadModal = (category) => {
    setSelectedCategory(category);
    setUploadModalOpen(true);
  };

  const handleUploadPhoto = async () => {
    if (!selectedFile || !selectedCategory) {
      alert('Lütfen bir dosya seçin ve kategori belirleyin.');
      return;
    }
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('categoryId', selectedCategory.categoryId);

    try {
      await uploadCategoryPhoto(formData);
      alert('Fotoğraf başarıyla yüklendi.');
      setUploadModalOpen(false);
      setSelectedFile(null);
      setSelectedCategory(null);
    } catch (error) {
      console.error('Fotoğraf yüklenirken hata oluştu:', error);
      setError('Fotoğraf yüklenemedi.');
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
        <>
          <List>
            {categories.map((category, index) => (
              <ListItem key={category.categoryId} divider>
                <Box display="flex" alignItems="center" width="100%">
                  {/* Sıralama Butonları */}
                  <Box>
                    <IconButton
                      onClick={() => moveCategory(index, -1)}
                      disabled={index === 0}
                      color="primary"
                    >
                      <ArrowUpward />
                    </IconButton>
                    <IconButton
                      onClick={() => moveCategory(index, 1)}
                      disabled={index === categories.length - 1}
                      color="primary"
                    >
                      <ArrowDownward />
                    </IconButton>
                  </Box>

                  {/* Kategori Görseli */}
                  <Avatar
                    src={category.categoryPhotoUrl}
                    alt={category.name}
                    sx={{ width: 56, height: 56, marginLeft: '16px' }}
                  />

                  {/* Kategori Bilgileri */}
                  <Box flexGrow={1} ml={2}>
                    <ListItemText
                      primary={category.name}
                      secondary={category.description ? category.description : 'Açıklama yok'}
                    />
                  </Box>

                  {/* Sil Butonu */}
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(category.categoryId)}
                  >
                    SİL
                  </Button>

                  {/* Fotoğraf Yükleme Butonu */}
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleOpenUploadModal(category)}
                    sx={{ marginLeft: '10px' }}
                  >
                    Fotoğraf Yükle
                  </Button>
                </Box>
              </ListItem>
            ))}
          </List>

          {hasChanges && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveOrder}
              sx={{ marginTop: '20px' }}
            >
              Sıralamayı Kaydet
            </Button>
          )}
        </>
      )}

      {/* Fotoğraf Yükleme Modalı */}
      <Dialog open={uploadModalOpen} onClose={() => setUploadModalOpen(false)}>
        <DialogTitle>Fotoğraf Yükle</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            {selectedCategory ? `Kategori: ${selectedCategory.name}` : ''}
          </Typography>
          <TextField
            type="file"
            inputProps={{ accept: 'image/*' }}
            fullWidth
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadModalOpen(false)} color="secondary">
            İptal
          </Button>
          <Button onClick={handleUploadPhoto} color="primary">
            Yükle
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminCategoryList;
