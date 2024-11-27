import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Box,
  Chip,
  Divider,
  Breadcrumbs,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
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

  useEffect(() => {
    const loadProducts = async () => {
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
      {/* Modern Breadcrumbs Bölümü */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: "20px", fontSize: "1.1rem" }}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#014DAD",
            fontWeight: "500",
            fontSize: "1rem",
            transition: "color 0.3s ease",
          }}
        >
          Anasayfa
        </Link>
        <Typography color="text.primary" style={{ fontWeight: "500" }}>
          Ürünler
        </Typography>
        <Typography color="text.primary" style={{ fontWeight: "500" }}>
          {selectedCategory ? categories.find(cat => cat.id === selectedCategory)?.name : "Tüm Ürünler"}
        </Typography>
      </Breadcrumbs>

      <Typography variant="h5" className="products-title">
        Ürünlerimiz
      </Typography>
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
    </Container>
  );
};

export default ProductList;
