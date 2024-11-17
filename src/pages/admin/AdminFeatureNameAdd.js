import React, { useState } from "react";
import { Container, TextField, Button, Typography, Alert } from "@mui/material";
import axios from "axios";

const API_BASE_URL = "https://aran-makina-8fce3ead0cbf.herokuapp.com/api";

const addFeatureName = async (featureName) => {
  const response = await axios.post(
    `${API_BASE_URL}/featurenames/add`,
    { name: featureName },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

const AdminFeatureNameAdd = () => {
  const [featureName, setFeatureName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await addFeatureName(featureName);
      setSuccessMessage(response.message);
      setFeatureName("");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Özellik ismi eklenirken bir hata oluştu.");
      setSuccessMessage("");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Yeni Özellik İsmi Ekle
      </Typography>
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <TextField
        label="Özellik İsmi"
        variant="outlined"
        fullWidth
        value={featureName}
        onChange={(e) => setFeatureName(e.target.value)}
        sx={{ marginBottom: "20px" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!featureName.trim()}
      >
        Özellik İsmi Ekle
      </Button>
    </Container>
  );
};

export default AdminFeatureNameAdd;
