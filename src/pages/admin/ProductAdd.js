import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../../services/productService';

const categories = [
  "Sabit Askılı Zincirli Vinç",
  "Manuel Şaryolu Zincirli Vinç",
  "Monoray Zincirli Vinç",
  "Mekanik Caraskal",
  "Yedek Parça",
  "Şaryo",
  "Makara",
  "Kumanda"
];

const ProductAdd = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: ''
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
      const response = await addProduct(formData);
      if (response) {
        navigate('/admin/products');
      }
    } catch (err) {
      setError('Ürün eklenirken bir hata oluştu.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '30px' }}>
      <Typography variant="h4" gutterBottom>
        Ürün Ekle
      </Typography>
      {error && (
        <Typography variant="body1" color="error" sx={{ marginBottom: '15px' }}>
          {error}
        </Typography>
      )}
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Ürün Adı"
          name="name"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Kategori</InputLabel>
          <Select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            {categories.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
        <TextField
          label="Fiyat"
          name="price"
          type="number"
          fullWidth
          margin="normal"
          value={formData.price}
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
          {loading ? 'Ekleniyor...' : 'Ürünü Ekle'}
        </Button>
      </Box>
    </Container>
  );
};

export default ProductAdd;
