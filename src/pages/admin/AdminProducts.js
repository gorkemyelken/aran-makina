import React, { useEffect, useState } from "react";
import {
  fetchProducts,
  addProduct,
  deleteProduct,
} from "../../services/productService";
import axios from "axios";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [openProductModal, setOpenProductModal] = useState(false);
  const [openFeatureModal, setOpenFeatureModal] = useState(false);
  const [openNewFeatureNameModal, setOpenNewFeatureNameModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [featureNames, setFeatureNames] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
  });
  const [newFeature, setNewFeature] = useState({
    featureNameId: "",
    value: "",
  });
  const [newFeatureName, setNewFeatureName] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productList = await fetchProducts();
        setProducts(productList);
      } catch (error) {
        console.error("Ürünler alınırken hata oluştu:", error);
      }
    };

    const getFeatureNames = async () => {
      try {
        const response = await axios.get(
          "https://aran-makina-8fce3ead0cbf.herokuapp.com/api/featurenames"
        );
        setFeatureNames(response.data.data);
      } catch (error) {
        console.error("Özellik isimleri alınırken hata oluştu:", error);
      }
    };

    getProducts();
    getFeatureNames();
  }, []);

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.productId !== productId)
      );
      alert("Ürün başarıyla silindi");
    } catch (error) {
      console.error("Ürün silinirken hata oluştu:", error);
      alert("Ürün silinirken hata oluştu");
    }
  };

  const handleOpenProductModal = () => {
    setOpenProductModal(true);
  };

  const handleCloseProductModal = () => {
    setOpenProductModal(false);
    setNewProduct({ name: "", description: "", price: 0 });
  };

  const handleOpenFeatureModal = (product) => {
    setSelectedProduct(product);
    setOpenFeatureModal(true);
  };

  const handleCloseFeatureModal = () => {
    setOpenFeatureModal(false);
    setNewFeature({ featureNameId: "", value: "" });
  };

  const handleOpenNewFeatureNameModal = () => {
    setOpenNewFeatureNameModal(true);
  };

  const handleCloseNewFeatureNameModal = () => {
    setOpenNewFeatureNameModal(false);
    setNewFeatureName("");
  };

  const handleChangeProduct = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleChangeFeature = (e) => {
    const { name, value } = e.target;
    setNewFeature({ ...newFeature, [name]: value });
  };

  const handleAddProduct = async () => {
    try {
      const addedProduct = await addProduct(newProduct);
      setProducts((prev) => [...prev, addedProduct]);
      handleCloseProductModal();
    } catch (error) {
      console.error("Ürün eklenirken hata oluştu:", error);
    }
  };

  const handleAddFeature = async () => {
    if (selectedProduct) {
        try {
            const response = await axios.post(
                'https://aran-makina-8fce3ead0cbf.herokuapp.com/api/productfeatures/add',
                {
                    productId: selectedProduct.productId,
                    featureNameId: parseInt(newFeature.featureNameId),
                    value: newFeature.value,
                }
            );

            if (response.data.success) {
                alert("Özellik başarıyla eklendi.");
                // Ürün listesini güncelle
                const updatedProductList = await fetchProducts();
                setProducts(updatedProductList);
            } else {
                alert("Özellik eklenirken bir hata oluştu.");
            }

            handleCloseFeatureModal();
        } catch (error) {
            console.error("Özellik eklenirken hata oluştu:", error);
            alert("Özellik eklenirken hata oluştu.");
        }
    }
};


  const handleAddNewFeatureName = async () => {
    try {
      await axios.post(
        "https://aran-makina-8fce3ead0cbf.herokuapp.com/api/featurenames/add",
        {
          name: newFeatureName,
        }
      );
      alert("Yeni özellik ismi başarıyla eklendi");
      handleCloseNewFeatureNameModal();
    } catch (error) {
      console.error("Yeni özellik ismi eklenirken hata oluştu:", error);
      alert("Yeni özellik ismi eklenirken hata oluştu");
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Ürünler
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        sx={{ marginBottom: 2, marginRight: 2 }}
        onClick={handleOpenProductModal}
      >
        ÜRÜN EKLE
      </Button>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<AddIcon />}
        onClick={handleOpenNewFeatureNameModal}
        sx={{ marginBottom: 2 }}
      >
        YENİ ÖZELLİK EKLE
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ürün ID</TableCell>
              <TableCell>Ürün Adı</TableCell>
              <TableCell>Açıklama</TableCell>
              <TableCell>Fiyat</TableCell>
              <TableCell>Özellikler</TableCell>
              <TableCell>Aksiyonlar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.productId}>
                <TableCell>{product.productId}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price} TL</TableCell>
                <TableCell>
                  {product.features?.length > 0 ? (
                    <List dense>
                      {product.features.map((feature, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={feature.featureName.name}
                            secondary={feature.value}
                          />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      Özellik yok
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ marginRight: 1 }}
                    onClick={() => alert("Ürün düzenleme modalı açılır")}
                  >
                    DÜZENLE
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ marginRight: 1 }}
                    onClick={() => handleDeleteProduct(product.productId)}
                  >
                    SİL
                  </Button>
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={() => handleOpenFeatureModal(product)}
                  >
                    ÖZELLİK EKLE
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Ürün Ekleme Modalı */}
      <Dialog open={openProductModal} onClose={handleCloseProductModal}>
        <DialogTitle>Yeni Ürün Ekle</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Ürün Adı"
            type="text"
            fullWidth
            value={newProduct.name}
            onChange={handleChangeProduct}
          />
          <TextField
            margin="dense"
            name="description"
            label="Açıklama"
            type="text"
            fullWidth
            value={newProduct.description}
            onChange={handleChangeProduct}
          />
          <TextField
            margin="dense"
            name="price"
            label="Fiyat"
            type="number"
            fullWidth
            value={newProduct.price}
            onChange={handleChangeProduct}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProductModal} color="secondary">
            İptal
          </Button>
          <Button onClick={handleAddProduct} color="primary">
            Ekle
          </Button>
        </DialogActions>
      </Dialog>

      {/* Yeni Özellik İsim Ekleme Modalı */}
      <Dialog
        open={openNewFeatureNameModal}
        onClose={handleCloseNewFeatureNameModal}
      >
        <DialogTitle>Yeni Özellik İsmi Ekle</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Özellik İsmi"
            type="text"
            fullWidth
            value={newFeatureName}
            onChange={(e) => setNewFeatureName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewFeatureNameModal} color="secondary">
            İptal
          </Button>
          <Button onClick={handleAddNewFeatureName} color="primary">
            Ekle
          </Button>
        </DialogActions>
      </Dialog>

      {/* Özellik Ekleme Modalı */}
      <Dialog open={openFeatureModal} onClose={handleCloseFeatureModal}>
        <DialogTitle>Özellik Ekle</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel id="feature-select-label">Özellik İsmi</InputLabel>
            <Select
              labelId="feature-select-label"
              name="featureNameId"
              value={newFeature.featureNameId}
              onChange={handleChangeFeature}
            >
              {featureNames.map((featureName) => (
                <MenuItem
                  key={featureName.featureNameId}
                  value={featureName.featureNameId}
                >
                  {featureName.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="value"
            label="Özellik Değeri"
            type="text"
            fullWidth
            value={newFeature.value}
            onChange={handleChangeFeature}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFeatureModal} color="secondary">
            İptal
          </Button>
          <Button onClick={handleAddFeature} color="primary">
            Ekle
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminProducts;
