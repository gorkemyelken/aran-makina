import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Box,
  Chip,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { fetchProducts } from "../services/productService";
import { fetchCategories } from "../services/categoryService";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";
import "../styles/ProductList.css";

const ProductList = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    location.state ? location.state.categoryId : null
  );
  const [loading, setLoading] = useState(true); // Yükleme durumu

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true); // Yükleme başlıyor
      const productsData = await fetchProducts();
      setProducts(productsData);

      if (selectedCategory !== null) {
        const filtered = productsData.filter(
          (product) =>
            product.category && product.category.categoryId === selectedCategory
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(productsData);
      }

      setLoading(false); // Yükleme tamamlandı
    };

    const loadCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (err) {
        console.error("Kategoriler yüklenirken bir hata oluştu:", err);
      }
    };

    loadProducts();
    loadCategories();
  }, [selectedCategory]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId === null) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category && product.category.categoryId === categoryId
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <Container className="products-container">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Typography variant="h5" className="products-title">
          Ürünlerimiz
        </Typography>
      </motion.div>
      <Divider className="divider" />

      {/* Kategori Çubuğu (Mobilde Dropdown Menüsü) */}
      <Box className="product-category-container">
        <Chip
          label="Tüm Kategoriler"
          onClick={() => handleCategoryChange(null)}
          className={`product-category-chip ${selectedCategory === null ? "selected" : ""}`}
        />
        {categories.map((category) => (
          <Chip
            key={category.categoryId}
            label={category.name}
            onClick={() => handleCategoryChange(category.categoryId)}
            className={`product-category-chip ${selectedCategory === category.categoryId ? "selected" : ""}`}
          />
        ))}
      </Box>

      {/* Mobilde kategori seçimi için açılır menü */}
      <FormControl fullWidth className="mobile-category-select" sx={{ display: { xs: "block", sm: "none" } }}>
        <InputLabel>Kategori Seç</InputLabel>
        <Select
          value={selectedCategory || ""}
          onChange={(e) => handleCategoryChange(e.target.value)}
          label="Kategori Seç"
        >
          {categories.map((category) => (
            <MenuItem key={category.categoryId} value={category.categoryId}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Ürünler Listesi */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
          <CircularProgress /> {/* Yüklenirken spinner */}
        </Box>
      ) : (
        <Grid container spacing={4}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <Grid item key={product.productId} xs={12} sm={6} md={4}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              </Grid>
            ))
          ) : (
            <Typography sx={{ textAlign: "center", marginTop: "20px", width: "100%" }}>
              Bu kategoride ürün bulunamadı.
            </Typography>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default ProductList;
