import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
} from "@mui/material";
import {
  Dashboard,
  ExpandLess,
  ExpandMore,
  Person,
  Store,
  AddCircle,
  List as ListIcon,
  Build,
  Category,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const AdminPanelSidebar = () => {
  const [openProducts, setOpenProducts] = useState(false);
  const [openFeatures, setOpenFeatures] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);

  const handleProductsClick = () => {
    setOpenProducts(!openProducts);
  };

  const handleFeaturesClick = () => {
    setOpenFeatures(!openFeatures);
  };

  const handleCategoriesClick = () => {
    setOpenCategories(!openCategories);
  };

  return (
    <Box
      sx={{
        width: "250px",
        backgroundColor: "#014DAD",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <List>
        {/* Dashboard */}
        <ListItem button component={Link} to="/admin/dashboard">
          <ListItemIcon>
            <Dashboard sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" sx={{ color: "white" }} />
        </ListItem>

        {/* Ürünler Dropdown */}
        <ListItem button onClick={handleProductsClick}>
          <ListItemIcon>
            <Store sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Ürünler" sx={{ color: "white" }} />
          {openProducts ? (
            <ExpandLess sx={{ color: "white" }} />
          ) : (
            <ExpandMore sx={{ color: "white" }} />
          )}
        </ListItem>
        <Collapse in={openProducts} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {/* Ürün Ekle */}
            <ListItem button component={Link} to="/admin/products/add">
              <ListItemIcon>
                <AddCircle sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText
                primary="Ürün Ekle"
                sx={{ pl: 2, color: "white" }}
              />
            </ListItem>

            {/* Ürünleri Listele */}
            <ListItem button component={Link} to="/admin/products">
              <ListItemIcon>
                <ListIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText
                primary="Ürünleri Listele"
                sx={{ pl: 2, color: "white" }}
              />
            </ListItem>
          </List>
        </Collapse>

        {/* Özellikler Dropdown */}
        <ListItem button onClick={handleFeaturesClick}>
          <ListItemIcon>
            <Build sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Özellikler" sx={{ color: "white" }} />
          {openFeatures ? (
            <ExpandLess sx={{ color: "white" }} />
          ) : (
            <ExpandMore sx={{ color: "white" }} />
          )}
        </ListItem>
        <Collapse in={openFeatures} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {/* Yeni Özellik Ekle */}
            <ListItem button component={Link} to="/admin/features/add">
              <ListItemIcon>
                <AddCircle sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText
                primary="Yeni Özellik İsmi Ekle"
                sx={{ pl: 2, color: "white" }}
              />
            </ListItem>

            {/* Özellikleri Listele */}
            <ListItem button component={Link} to="/admin/features">
              <ListItemIcon>
                <ListIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText
                primary="Özellik İsimlerini Listele"
                sx={{ pl: 2, color: "white" }}
              />
            </ListItem>
          </List>
        </Collapse>

        {/* Kategoriler Dropdown */}
        <ListItem button onClick={handleCategoriesClick}>
          <ListItemIcon>
            <Category sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Kategoriler" sx={{ color: "white" }} />
          {openCategories ? (
            <ExpandLess sx={{ color: "white" }} />
          ) : (
            <ExpandMore sx={{ color: "white" }} />
          )}
        </ListItem>
        <Collapse in={openCategories} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {/* Kategori Ekle */}
            <ListItem button component={Link} to="/admin/categories/add">
              <ListItemIcon>
                <AddCircle sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText
                primary="Kategori Ekle"
                sx={{ pl: 2, color: "white" }}
              />
            </ListItem>

            {/* Kategorileri Listele */}
            <ListItem button component={Link} to="/admin/categories">
              <ListItemIcon>
                <ListIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText
                primary="Kategorileri Listele"
                sx={{ pl: 2, color: "white" }}
              />
            </ListItem>
          </List>
        </Collapse>

        {/* Kullanıcılar */}
        <ListItem button component={Link} to="/admin/users">
          <ListItemIcon>
            <Person sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Kullanıcılar" sx={{ color: "white" }} />
        </ListItem>
      </List>
    </Box>
  );
};

export default AdminPanelSidebar;
