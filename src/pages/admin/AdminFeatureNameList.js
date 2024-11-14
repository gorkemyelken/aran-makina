import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import { fetchFeatureNames } from '../../services/productService';

const AdminFeatureNameList = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFeatures = async () => {
      try {
        const featureData = await fetchFeatureNames();
        setFeatures(featureData);
      } catch (err) {
        setError('Özellikler yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    getFeatures();
  }, []);

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Özellikler Listesi
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Özellik ID</strong></TableCell>
              <TableCell><strong>Özellik Adı</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {features.map((feature) => (
              <TableRow key={feature.featureNameId}>
                <TableCell>{feature.featureNameId}</TableCell>
                <TableCell>{feature.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminFeatureNameList;
