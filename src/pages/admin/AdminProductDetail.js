import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Select,
  MenuItem,
  Grid,
  IconButton,
} from "@mui/material";
import {
  fetchProductById,
  addProductFeature,
  fetchFeatureNames,
  updateProduct,
} from "../../services/productService";
import { fetchCategories } from "../../services/categoryService";
import CloseIcon from "@mui/icons-material/Close"; // Çarpı işareti için ikon

const AdminProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [featureNames, setFeatureNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [newFeature, setNewFeature] = useState({
    featureNameId: "",
    value: "",
  });
  const [file, setFile] = useState(null); // State for photo file
  const [updatedProduct, setUpdatedProduct] = useState({
    name: "",
    category: { name: "" },
    description: "",
    price: "",
  });
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const productData = await fetchProductById(productId);
        setProduct(productData);
      } catch (err) {
        setError("Ürün bilgileri alınırken bir hata oluştu.");
      } finally {
        setIsLoading(false);
      }
    };

    const getFeatureNames = async () => {
      try {
        const names = await fetchFeatureNames();
        setFeatureNames(names);
      } catch (err) {
        console.error("Özellik isimleri alınırken hata oluştu:", err);
      }
    };

    getProduct();
    getFeatureNames();
  }, [productId]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Kategoriler yüklenirken bir hata oluştu:", error);
      }
    };

    loadCategories();
  }, []);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleFeatureChange = (e) => {
    const { name, value } = e.target;
    setNewFeature({ ...newFeature, [name]: value });
  };

  const handleAddFeature = async () => {
    try {
      const featureData = {
        productId: productId,
        featureNameId: newFeature.featureNameId,
        value: newFeature.value,
      };
      await addProductFeature(featureData);
      alert("Özellik başarıyla eklendi.");
      setIsDialogOpen(false);
      const updatedProduct = await fetchProductById(productId);
      setProduct(updatedProduct);
    } catch (err) {
      alert("Özellik eklenirken bir hata oluştu.");
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadPhoto = async () => {
    if (!file) {
      alert("Lütfen bir fotoğraf seçin.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("productId", productId);

    try {
      const response = await fetch(
        "https://aran-makina-8fce3ead0cbf.herokuapp.com/api/files/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert("Fotoğraf başarıyla yüklendi.");
        const updatedProduct = await fetchProductById(productId);
        setProduct(updatedProduct);
      } else {
        alert("Fotoğraf yüklenirken bir hata oluştu.");
      }
    } catch (err) {
      alert("Fotoğraf yüklenirken bir hata oluştu.");
    }
  };

  const handleDeletePhoto = async (photoUrl) => {
    try {
      const response = await fetch(
        `https://aran-makina-8fce3ead0cbf.herokuapp.com/api/files/delete?photoUrl=${encodeURIComponent(
          photoUrl
        )}&productId=${productId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        alert("Fotoğraf başarıyla silindi.");
        const updatedProduct = await fetchProductById(productId);
        setProduct(updatedProduct);
      } else {
        alert("Fotoğraf silinirken bir hata oluştu.");
      }
    } catch (err) {
      alert("Fotoğraf silinirken bir hata oluştu.");
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const payload = {
        ...updatedProduct,
        price: parseFloat(updatedProduct.price), // String yerine sayıya çevrilir
        category: {
          id: updatedProduct.category.id,
          name: updatedProduct.category.name,
        },
      };

      await updateProduct(productId, payload);
      alert("Ürün başarıyla güncellendi.");
      const refreshedProduct = await fetchProductById(productId);
      setProduct(refreshedProduct);
      setIsEditDialogOpen(false);
    } catch (err) {
      alert("Ürün güncellenirken bir hata oluştu.");
    }
  };

  const handleEditDialogOpen = () => {
    setUpdatedProduct({
      name: product.name,
      category: { id: product.category.id, name: product.category.name }, // id eklendi
      description: product.description || "",
      price: product.price || "",
    });
    setIsEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setIsEditDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "category.name") {
      setUpdatedProduct((prev) => ({
        ...prev,
        category: { ...prev.category, name: value },
      }));
    } else {
      setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  if (isLoading) {
    return <Typography>Yükleniyor...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    product && (
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Ürün Detayları
        </Typography>
        <Typography variant="h6">Adı: {product.name}</Typography>
        <Typography>Kategori: {product.category.name}</Typography>
        <Typography>
          Fiyat: {product.price ? `${product.price} TL` : "Belirtilmemiş"}
        </Typography>
        <Typography>
          Açıklama: {product.description || "Açıklama mevcut değil."}
        </Typography>

        {/* Fotoğraf Yükleme Butonu */}
        <div>
          <input type="file" onChange={handleFileChange} />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUploadPhoto}
            sx={{ marginTop: "20px" }}
          >
            Fotoğraf Yükle
          </Button>
        </div>

        {/* Ürün Fotoğrafları */}
        <Typography variant="h5" sx={{ marginTop: "30px" }}>
          Ürün Fotoğrafları
        </Typography>
        <Grid container spacing={2} sx={{ marginTop: "20px" }}>
          {product.photos.map((photo, index) => (
            <Grid item key={index} xs={4} style={{ position: "relative" }}>
              <img
                src={photo.url}
                alt={`Ürün Fotoğrafı ${index + 1}`}
                style={{ width: "100%", height: "auto" }}
              />
              <IconButton
                onClick={() => handleDeletePhoto(photo.url)}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  color: "red",
                }}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          ))}
        </Grid>

        <Button
          variant="contained"
          color="primary"
          onClick={handleDialogOpen}
          sx={{ marginTop: "20px" }}
        >
          Yeni Özellik Ekle
        </Button>

        <Dialog open={isDialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Yeni Özellik Ekle</DialogTitle>
          <DialogContent>
            <Select
              fullWidth
              name="featureNameId"
              value={newFeature.featureNameId}
              onChange={handleFeatureChange}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Özellik Seçin
              </MenuItem>
              {featureNames.map((feature) => (
                <MenuItem
                  key={feature.featureNameId}
                  value={feature.featureNameId}
                >
                  {feature.name}
                </MenuItem>
              ))}
            </Select>
            <TextField
              fullWidth
              margin="normal"
              name="value"
              label="Değer"
              value={newFeature.value}
              onChange={handleFeatureChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="secondary">
              İptal
            </Button>
            <Button onClick={handleAddFeature} color="primary">
              Ekle
            </Button>
          </DialogActions>
        </Dialog>

        <Button
          variant="contained"
          color="primary"
          onClick={handleEditDialogOpen}
          sx={{
            marginTop: "20px",
            marginLeft: "20px",
            backgroundColor: "purple",
          }}
        >
          Ürünü Güncelle
        </Button>

        <Dialog open={isEditDialogOpen} onClose={handleEditDialogClose}>
          <DialogTitle>Ürün Güncelle</DialogTitle>
          <DialogContent>
            {/* Ürün Adı (Zorunlu Alan) */}
            <TextField
              fullWidth
              margin="dense" // "normal" yerine "dense" kullanıldı
              label="Ürün Adı"
              name="name"
              value={updatedProduct.name}
              onChange={handleInputChange}
              error={!updatedProduct.name} // Hata durumu
              helperText={!updatedProduct.name ? "Bu alan zorunludur." : ""} // Hata mesajı
            />

            {/* Kategori Dropdown (Zorunlu Alan) */}
            <Select
              fullWidth
              value={updatedProduct.category.id || ""} // `id` değeri seçili
              name="category.id"
              onChange={(e) => {
                const selectedCategory = categories.find(
                  (cat) => cat.id === parseInt(e.target.value, 10)
                );
                setUpdatedProduct((prev) => ({
                  ...prev,
                  category: {
                    id: selectedCategory.id,
                    name: selectedCategory.name,
                  },
                }));
              }}
              displayEmpty
              sx={{ marginTop: "16px", marginBottom: "8px" }}
            >
              <MenuItem value="" disabled>
                Kategori Seçin
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
            {!updatedProduct.category.name && (
              <Typography color="error" variant="body2">
                Bu alan zorunludur.
              </Typography>
            )}

            {/* Açıklama */}
            <TextField
              fullWidth
              margin="dense"
              label="Açıklama"
              name="description"
              value={updatedProduct.description}
              onChange={handleInputChange}
            />

            {/* Fiyat */}
            <TextField
              fullWidth
              margin="dense"
              label="Fiyat"
              name="price"
              type="number"
              value={updatedProduct.price}
              onChange={handleInputChange}
            />

        
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditDialogClose} color="secondary">
              İptal
            </Button>
            <Button
              onClick={handleUpdateProduct}
              color="primary"
              disabled={
                !updatedProduct.name ||
                !updatedProduct.category.name 
              }
            >
              Güncelle
            </Button>
          </DialogActions>
        </Dialog>

        <Typography variant="h5" sx={{ marginTop: "30px" }}>
          Ürün Özellikleri
        </Typography>
        <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ fontWeight: "bold", backgroundColor: "#f0f0f0" }}
                >
                  Özellik
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", backgroundColor: "#f0f0f0" }}
                >
                  Değer
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {product.features.map((feature) => (
                <TableRow key={feature.productFeatureId}>
                  <TableCell>{feature.featureName.name}</TableCell>
                  <TableCell>{feature.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    )
  );
};

export default AdminProductDetail;
