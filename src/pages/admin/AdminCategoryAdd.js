import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminCategoryAdd = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('https://aran-makina-8fce3ead0cbf.herokuapp.com/api/categories/create', formData);
      if (response.data.success) {
        navigate('/admin/categories'); // Başarılı olursa kategoriler listesine yönlendirme
      }
    } catch (err) {
      setError('Kategori eklenirken bir hata oluştu.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '30px' }}>
      <Typography variant="h4" gutterBottom>
        Kategori Ekle
      </Typography>
      {error && (
        <Typography variant="body1" color="error" sx={{ marginBottom: '15px' }}>
          {error}
        </Typography>
      )}
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Kategori Adı"
          name="name"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Açıklama"
          name="description"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={formData.description}
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: '15px' }}
          disabled={loading}
        >
          {loading ? 'Ekleniyor...' : 'Kategoriyi Ekle'}
        </Button>
      </Box>
    </Container>
  );
};

export default AdminCategoryAdd;
