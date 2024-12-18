import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../services/productService";
import { fetchCategories } from "../../services/categoryService";

const AdminProductAdd = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: { id: "", name: "" },
    description: "",
    price: "",
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error("Kategoriler yüklenirken bir hata oluştu:", err);
        setError("Kategoriler yüklenemedi.");
      }
    };

    loadCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = categories.find(
      (category) => category.categoryId === e.target.value
    );
    setFormData({ ...formData, category: selectedCategory });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await addProduct(formData);
      if (response) {
        navigate("/admin/products");
      }
    } catch (err) {
      setError("Ürün eklenirken bir hata oluştu.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: "30px" }}>
      <Typography variant="h4" gutterBottom>
        Ürün Ekle
      </Typography>
      {error && (
        <Typography variant="body1" color="error" sx={{ marginBottom: "15px" }}>
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
            value={formData.category.categoryId}
            onChange={handleCategoryChange}
            required
          >
            {categories.map((category) => (
              <MenuItem key={category.categoryId} value={category.categoryId}>
                {category.name}
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
          sx={{ marginTop: "15px" }}
          disabled={loading}
        >
          {loading ? "Ekleniyor..." : "Ürünü Ekle"}
        </Button>
      </Box>
    </Container>
  );
};

export default AdminProductAdd;
