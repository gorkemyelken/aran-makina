import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductById } from "../services/productService";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Grid,
  CardMedia,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Breadcrumbs,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import "../styles/ProductPage.css";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const productData = await fetchProductById(productId);
        setProduct(productData);
        if (productData.photos && productData.photos.length > 0) {
          setSelectedPhoto(productData.photos[0].url);
        }
      } catch (error) {
        setError("Ürün bilgileri alınırken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      getProduct();
    }
  }, [productId]);

  const handleWhatsAppClick = () => {
    const message = `Merhaba, ${product.name} hakkında bilgi almak istiyorum.`;
    window.open(
      `https://wa.me/1234567890?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const handlePhotoClick = (url) => {
    setSelectedPhoto(url);
  };

  if (loading) {
    return (
      <Container
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container style={{ marginTop: "20px" }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    product && (
      <Container className="product-container">
        {/* Breadcrumbs Bölümü */}
        <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: "20px" }}>
          <Link to="/" style={{ textDecoration: "none", color: "#014DAD" }}>
            Anasayfa
          </Link>
          <Link
            to="/urunler"
            style={{ textDecoration: "none", color: "#014DAD" }}
          >
            Ürünler
          </Link>
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            {/* Seçilen fotoğrafı büyük olarak göster */}
            <CardMedia
              component="img"
              image={selectedPhoto || "https://via.placeholder.com/400x200"}
              alt="Seçilen Ürün Fotoğrafı"
              style={{
                borderRadius: "8px",
                marginBottom: "10px",
                width: "100%",
                height: "auto",
              }}
            />
            {/* Alt galeri */}
            <Box display="flex" justifyContent="center" flexWrap="wrap">
              {product.photos &&
                product.photos.length > 1 &&
                product.photos.map((photo, index) => (
                  <CardMedia
                    key={index}
                    component="img"
                    image={photo.url}
                    alt={`Galeri Fotoğrafı ${index + 1}`}
                    onClick={() => handlePhotoClick(photo.url)}
                    style={{
                      width: "60px",
                      height: "60px",
                      margin: "5px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      border:
                        selectedPhoto === photo.url
                          ? "2px solid black"
                          : "1px solid #ccc",
                    }}
                  />
                ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {product.description || "Ürün açıklaması mevcut değil."}
            </Typography>

            {/* Model ve kapasiteyi göster */}
            <List>
              {product.features
                .filter(
                  (feature) =>
                    feature.featureName.name === "Model" ||
                    feature.featureName.name === "Kapasite"
                )
                .map((feature) => (
                  <ListItem key={feature.productFeatureId}>
                    <ListItemText
                      primary={`${feature.featureName.name}: ${feature.value}`}
                    />
                  </ListItem>
                ))}
            </List>

            <Button
              variant="contained"
              color="success"
              startIcon={<WhatsAppIcon />}
              onClick={handleWhatsAppClick}
              style={{ marginTop: "20px" }}
            >
              WHATSAPP İLE İLETİŞİME GEÇ
            </Button>
          </Grid>
        </Grid>

        {/* Diğer özellikleri aşağıda ortalanmış bir tablo şeklinde göster */}
        <Box
          sx={{ marginTop: "50px", display: "flex", justifyContent: "center" }}
        >
          <TableContainer
            component={Paper}
            sx={{
              maxWidth: "800px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#014DAD" }}>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: "#ffffff",
                      fontSize: "1rem",
                    }}
                  >
                    Özellik
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: "#ffffff",
                      fontSize: "1rem",
                    }}
                  >
                    Değer
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {product.features
                  .filter(
                    (feature) =>
                      feature.featureName.name !== "Model" &&
                      feature.featureName.name !== "Kapasite"
                  )
                  .map((feature, index) => (
                    <TableRow
                      key={feature.productFeatureId}
                      sx={{
                        backgroundColor:
                          index % 2 === 0 ? "#f9f9f9" : "#e0e0e0",
                      }}
                    >
                      <TableCell sx={{ fontWeight: "bold" }}>
                        {feature.featureName.name}
                      </TableCell>
                      <TableCell>{feature.value}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    )
  );
};

export default ProductPage;
