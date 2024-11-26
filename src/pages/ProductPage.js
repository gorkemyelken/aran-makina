import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { fetchProductById } from "../services/productService";
import {
  Container,
  Typography,
  Grid,
  Box,
  CardMedia,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Breadcrumbs,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import "../styles/ProductPage.css";

const ProductPage = () => {
  const { productId } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ID'yi state'ten alıyoruz
  const { productId: productIdFromState } = location.state || {};

  useEffect(() => {
    const getProduct = async () => {
      try {
        const productData = await fetchProductById(productIdFromState || productId);
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

    getProduct();
  }, [productId, productIdFromState]);

  const handleWhatsAppClick = () => {
    const message = `Merhaba, ${product.name} hakkında bilgi almak istiyorum.`;
    window.open(`https://wa.me/905436256412?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handlePhotoClick = (url) => {
    setSelectedPhoto(url);
  };

  if (loading) {
    return (
      <Container style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
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
      <Container className="product-container" sx={{ marginTop: "30px" }}>
        {/* Breadcrumbs */}
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
          <Link
            to="/urunler"
            style={{
              textDecoration: "none",
              color: "#014DAD",
              fontWeight: "500",
              fontSize: "1rem",
              transition: "color 0.3s ease",
            }}
          >
            Ürünler
          </Link>
          <Typography color="text.primary" style={{ fontWeight: "500" }}>
            {product.name}
          </Typography>
        </Breadcrumbs>

        {/* Sayfa Başlığı */}
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          {product.name}
        </Typography>
        {/* Ürün Bilgileri ve Görseller */}
        <Grid container spacing={3}>
          {/* Sol taraf: Ürün görselleri */}
          <Grid item xs={12} md={6}>
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

          {/* Sağ taraf: Tüm özellikler ve WhatsApp butonu */}
          <Grid item xs={12} md={6}>
            <Box sx={{ marginTop: "10px" }}>
              <TableContainer
                component={Paper}
                sx={{
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
                    {product.features.map((feature, index) => (
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

            <Button
              variant="contained"
              color="success"
              startIcon={<WhatsAppIcon />}
              onClick={handleWhatsAppClick}
              style={{ marginTop: "20px", width: "100%" }}
            >
              WHATSAPP İLE İLETİŞİME GEÇ
            </Button>
          </Grid>
        </Grid>
      </Container>
    )
  );
};

export default ProductPage;
